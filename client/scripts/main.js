/* globals axios, _, ace, addDynamicEventListener */
var editor
;(function() {
  axios.get('/project-tree').then(function(response) {
    console.log(response)
    editor = ace.edit('editor')
    editor.setTheme('ace/theme/vscode')
    // setTimeout(function() {
    //   editor.container.classList.remove('ace-tomorrow-night')
    // }, 0)
    // editor.container.classList.add('ace_dark', 'vs_code')
    var tree = document.querySelector('.tree')
    setTimeout(function() {
      var theme = document.querySelector(
        '[src="http://localhost:7070/libs/ace_codeeditor/theme-vscode.js"]'
      )
      var lol = document.getElementById('vs_code')
      if (theme) {
        theme.parentElement.removeChild(theme)
      }
      if (lol) {
        lol.parentElement.removeChild(lol)
      }
    }, 200)
    addDynamicEventListener(
      document.body,
      'click',
      '.tree-element',
      handleTreeElementClick
    )
    sortPathsData(response.data).forEach(function(element) {
      createTreeElement(element, tree)
    })
  })
})()

function sortPathsData(pathsData) {
  return _.sortBy(pathsData, function(element) {
    return !element.isDir
  })
}

function createTreeElement(data, tree) {
  var treeEl = document.createElement('div')
  treeEl.className = 'tree-element'
  treeEl.setAttribute(
    'data',
    JSON.stringify({ file: data.file, paths: data.paths, isDir: data.isDir })
  )
  treeEl.innerHTML =
    '<label>' + data.file + '</label>' + '<div class="sub-tree"></div>'
  tree.appendChild(treeEl)
}

const fileFormats = {
  html: 'html',
  js: 'javascript',
  json: 'json',
  jsx: 'javascript',
  md: 'markdown',
  ts: 'typescript',
  yml: 'yaml',
}

function handleTreeElementClick(e) {
  console.log()
  e.preventDefault()
  var treeElement = e.target
  if (!treeElement.classList.contains('opened')) {
    if (!treeElement.children[1].children.length) {
      var data = JSON.parse(e.target.getAttribute('data'))
      axios.post('/sub-tree', data).then(function(response) {
        var file = response.data
        if (file.data instanceof Array) {
          treeElement.classList.add('opened')
          sortPathsData(file.data).forEach(function(element) {
            createTreeElement(element, treeElement.children[1])
          })
        } else {
          var format = _.last(data.file.split('.'))
          var Mode = ace.require('ace/mode/' + (fileFormats[format] || 'text'))
            .Mode
          editor.session.setMode(new Mode())
          editor.setValue(file.data, -1)
        }
      })
    }
  } else {
    treeElement.classList.remove('opened')
  }
}
