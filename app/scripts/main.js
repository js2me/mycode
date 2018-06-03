/* globals axios, _, addDynamicEventListener */
;(function() {
  axios.get('/project-tree').then(function(response) {
    console.log(response)
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
  treeEl.setAttribute('data', JSON.stringify(data))
  treeEl.innerHTML =
    '<label>' + data[1] + '</label>' + '<div class="sub-tree"></div>'
  tree.appendChild(treeEl)
}

function handleTreeElementClick(e) {
  console.log()
  e.preventDefault()
  var treeElement = e.target
  if (!treeElement.classList.contains('opened')) {
    treeElement.classList.add('opened')
    axios
      .post('/sub-tree', JSON.parse(e.target.getAttribute('data')))
      .then(function(response) {
        response.data.forEach(function(element) {
          createTreeElement(element, treeElement.children[1])
        })
      })
  } else {
    treeElement.classList.remove('opened')
  }
}
