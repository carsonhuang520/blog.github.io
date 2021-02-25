var board = document.getElementById('board')
var context = board.getContext('2d')
var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var del = document.getElementById('delete')
var save = document.getElementById('save')
var black = document.getElementById('black')
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var yellow = document.getElementById('yellow')
var thin = document.getElementById('thin')
var thick = document.getElementById('thick')

var lineWidth = 5
var eraserEnabled = false

autoSetCanvasSize(board)
listenToUser(board)

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function () {
  eraserEnabled = true
  pen.classList.remove('active')
  eraser.classList.add('active')
}

del.onclick = function () {
  context.clearRect(0, 0, board.width, board.height)
}

save.onclick = function () {
  var url = board.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的图画'
  a.target = '_blank'
  a.click()
}

black.onclick = function () {
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}

red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}

green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  black.classList.remove('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}

blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  yellow.classList.remove('active')
}

yellow.onclick = function () {
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  yellow.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}

thin.onclick = function () {
  lineWidth = 5
  thin.classList.add('active')
  thick.classList.remove('active')
}

thick.onclick = function () {
  lineWidth = 10
  thick.classList.add('active')
  thin.classList.remove('active')
}

function autoSetCanvasSize(canvas) {
  setSize()

  window.onresize = function () {
    setSize()
  }

  function setSize() {
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight

    canvas.width = width
    canvas.height = height
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined,
  }

  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y,
        }
      }
    }
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          x: x,
          y: y,
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (e) {
      using = false
    }
  } else {
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y,
        }
      }
    }
    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          x: x,
          y: y,
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (e) {
      using = false
    }
  }
}
