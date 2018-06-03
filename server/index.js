const _ = require('lodash')
const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const os = require('os')
const http = require('http')
const opn = require('opn')
const path = require('path')

const projectFolder = process.cwd()
let projectTree = []

const buildPath = (fileName, paths) =>
  path.resolve(
    projectFolder,
    _.reduce(
      paths,
      (obj, pathId, nest) => {
        let tree = nest ? obj.tree[3][pathId] : obj.tree[pathId]
        obj.result.push(tree[1])
        obj.tree = tree
        return obj
      },
      {
        tree: projectTree,
        result: [],
      }
    ).result.join('/')
  )

function openPath([id, file, paths, childPaths]) { //eslint-disable-line
  console.log(file, paths, buildPath(file, paths))
  return new Promise((resolve, reject) => {
    fs.readdir(buildPath(file, paths), (err, files) => {
      if (err) resolve([])
      files.forEach((file, id) => {
        childPaths.push([id, file, [...paths, id], []])
      })
      resolve(childPaths)
    })
  })
}

function launchServer(port) {
  const app = express()
  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '../app')))
  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../app/index.html'))
  )
  app.get('/project-tree', (req, res) => res.send(projectTree))
  app.post('/sub-tree', (req, res) =>
    openPath(req.body).then(data => res.send(data))
  )
  const server = http.createServer(app)
  server.listen(port, '0.0.0.0', () => {
    console.log('Server started on port ' + port)
    try {
      opn('http://localhost:' + port, {
        app: os.platform() === 'win32' ? 'chrome' : 'google-chrome',
      })
    } catch (e) {
      console.error('Cannot open Google Chrome browser')
    }
  })
}

function setup(args) {
  fs.readdir(projectFolder, (err, files) => {
    if (err) throw new Error(err)
    files.forEach((file, id) => projectTree.push([id, file, [id], []]))
    const port = 7070
    launchServer(port)
  })
}
module.exports = setup
