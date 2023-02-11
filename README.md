## battleship
This is a take on the post 2002 version of the classic game Battleship, created for the odin project's battleship project, adhering to their [Specification](https://www.theodinproject.com/lessons/node-path-javascript-battleship)

### Table of Contents
<ul>
 <li> Features</li>
 <li> Tech Stack</li>
 <li> Run Locally</li>
<ul>

### Features
 <ul>
 <li>A semi-intelligent Al opponent to play against</li>
 <li>Unit testing for gameboard, ship</li>
 <li>Responsive Design</li>
</ul>

### Tech Stack
HTML, CSS, Webpack, JavaScript, Jest

### Run Locally 
Clone Project from Git 
(https://github.com/Striker1101/battleship)

```
var copy = function(target) {
    var textArea = document.createElement('textarea')
    textArea.setAttribute('style','width:1px;border:0;opacity:0;')
    document.body.appendChild(textArea)
    textArea.value = target.innerHTML
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

var pres = document.querySelectorAll(".comment-body > pre")
pres.forEach(function(pre){
  var button = document.createElement("button")
  button.className = "btn btn-sm"
  button.innerHTML = "copy"
  pre.parentNode.insertBefore(button, pre)
  button.addEventListener('click', function(e){
    e.preventDefault()
    copy(pre.childNodes[0])
  })
})
```
