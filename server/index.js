const _ = require('lodash')
const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const os = require('os')
const http = require('http')
const opn = require('opn')
const pathResolve = require('path').resolve

const projectFolder = process.cwd()
let projectTree = []

const buildPath = (fileName, paths) =>
  pathResolve(
    projectFolder,
    paths.length === 1
      ? fileName
      : _.reduce(
          paths,
          (obj, pathId, depth) => {
            let { file, content } = obj.tree[pathId]
            return {
              tree: content,
              result: [...obj.result, file],
            }
          },
          {
            tree: projectTree,
            result: [],
          }
        ).result.join('/')
  )

function getElementRef(paths) {
  return projectTree.length
    ? _.reduce(
        paths,
        (element, pathId, depth) =>
          depth ? element.content[pathId] : element[pathId],
        projectTree
      )
    : {}
}

const openPath = ({ file, paths }) =>
  new Promise((resolve, reject) => {
    const pathName = file
    console.log(paths)
    const ref = getElementRef(paths)
    if (ref.isDir ? ref.content.length : ref.content) {
      return resolve(ref.content)
    }
    const pathToElement = buildPath(pathName, paths)
    fs.lstat(pathToElement, (err, stats) => {
      if (err) {
        console.error(err)
        return resolve([])
      }
      console.log(stats.isDirectory())
      const isDirectory = (ref.isDir = stats.isDirectory())
      if (isDirectory) {
        fs.readdir(pathToElement, (err, content) => {
          if (err) return resolve([])
          resolve(
            (ref.content = content.map((file, id) => {
              const isDir = fs
                .lstatSync(pathResolve(buildPath(pathName, paths), file))
                .isDirectory()
              return {
                file,
                paths: [...paths, id],
                content: isDir ? [] : null,
                isDir,
              }
            }))
          )
        })
      } else {
        fs.readFile(pathToElement, 'utf8', (err, fileData) => {
          if (err) {
            console.error(err)
            return resolve('')
          }
          resolve((ref.content = fileData))
        })
      }
    })
  })
function launchServer(port) {
  const app = express()
  const clientPath = pathResolve(__dirname, '../client')
  app.use(bodyParser.json())
  app.use(express.static(clientPath))
  app.get('/', (_q, r) => r.sendFile(pathResolve(clientPath, '/index.html')))
  app.get('/project-tree', (req, res) => res.send(projectTree))
  app.post('/sub-tree', (req, res) =>
    openPath(req.body).then(data =>
      res.send({
        data,
      })
    )
  )
  const server = http.createServer(app)
  server.listen(port, '0.0.0.0', () => {
    console.log('Server started on port ' + port)
  })
}

module.exports = args =>
  openPath({ file: '.', paths: [] }).then(tree => {
    projectTree = [...tree]
    const port = 7070
    launchServer(port)
  })
