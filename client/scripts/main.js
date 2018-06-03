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
    addDynamicEventListener(
      document.body,
      'click',
      '.tree-element',
      handleTreeElementClick
    )
    response.data.forEach(function(element) {
      createTreeElement(element, tree)
    })
  })
})()

function createTreeElement(data, tree) {
  var treeEl = document.createElement('div')
  treeEl.className = 'tree-element'
  treeEl.setAttribute('data', JSON.stringify([data[0], data[1], data[2]]))
  treeEl.innerHTML =
    '<label>' + data[1] + '</label>' + '<div class="sub-tree"></div>'
  tree.appendChild(treeEl)
}

const fileFormats = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  md: 'markdown',
  yml: 'yaml',
}

function handleTreeElementClick(e) {
  console.log()
  e.preventDefault()
  var treeElement = e.target
  if (!treeElement.classList.contains('opened')) {
    treeElement.classList.add('opened')
    if (!treeElement.children[1].children.length) {
      var data = JSON.parse(e.target.getAttribute('data'))
      axios.post('/sub-tree', data).then(function(response) {
        var file = response.data
        if (file.data instanceof Array) {
          file.data.forEach(function(element) {
            createTreeElement(element, treeElement.children[1])
          })
        } else {
          var format = _.last(file.name.split('.'))
          if (fileFormats[format]) {
            var Mode = ace.require('ace/mode/' + fileFormats[format]).Mode
            editor.session.setMode(new Mode())
          }
          editor.setValue(file.data, -1)
        }
      })
    }
  } else {
    treeElement.classList.remove('opened')
  }
}
