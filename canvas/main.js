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
var undo = document.getElementById('undo')
var redo = document.getElementById('redo')

var lineWidth = 5
var eraserEnabled = false
var points = []
let canvasHistory = []
let step = -1
// context.lineJoin = 'round'
// context.lineCap = 'round'
// context.lineWidth = 10
// context.shadowBlur = 10
// context.shadowColor = 'rgb(0, 0, 0)'

autoSetCanvasSize(board)
listenToUser(board)

// context.fillStyle = '#fff'
// context.fillRect(0, 0, board.width, board.height)

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

undo.onclick = function () {
  console.log(step)
  if (step > 0) {
    step--
    let canvasPic = new Image()
    canvasPic.src = canvasHistory[step]
    canvasPic.addEventListener('load', () => {
      context.clearRect(0, 0, board.width, board.height)
      context.drawImage(canvasPic, 0, 0)
    })
  } else {
    alert('不能再继续撤销了')
  }
}

redo.onclick = function () {
  if (step < canvasHistory.length - 1) {
    step++
    let canvasPic = new Image()
    canvasPic.src = canvasHistory[step]
    canvasPic.addEventListener('load', () => {
      context.clearRect(0, 0, board.width, board.height)
      context.drawImage(canvasPic, 0, 0)
    })
  } else {
    alert('已经是最新的记录了')
  }
}

del.onclick = function () {
  step = 0
  canvasHistory = []
  context.clearRect(0, 0, board.width, board.height)
}

save.onclick = function () {
  // var url = board.toDataURL('image/png')
  // toWhite()
  // var url = board.toDataURL('image/jpeg', 1.0)
  // var a = document.createElement('a')
  // document.body.appendChild(a)
  // a.href = url
  // a.download = '我的图画'
  // a.target = '_blank'
  // a.click()
  downloadBigImage()
}

// 下载较大图片，因为 canvas.toDataURL('image/png')这方法生成的 base64 的字符太大, 导致无法解析
function downloadBigImage() {
  board.toBlob(
    function (blob) {
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.href = URL.createObjectURL(blob)
      a.download = '我的图画'
      a.target = '_blank'
      a.click()
    },
    'image/png',
    1
  )
}

function toWhite() {
  // 当该像素是透明的，则设置成白色
  var imageData = context.getImageData(0, 0, board.width, board.height)
  for (let i = 0; i < imageData.data.length; i += 4) {
    // 当该像素是透明的，则设置成白色
    if (imageData.data[i + 3] === 0) {
      imageData.data[i] = 255
      imageData.data[i + 1] = 255
      imageData.data[i + 2] = 255
      imageData.data[i + 3] = 255
    }
  }
  context.putImageData(imageData, 0, 0)
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
  // context.quadraticCurveTo(controlPoint.x, controlPoint.y, x2, y2)
  context.stroke()
  context.closePath()
}

function drawNewLine(p1, p2) {
  context.beginPath()
  context.moveTo(p1.x, p1.y)
  context.lineWidth = lineWidth
  context.lineJoin = 'round'
  context.lineCap = 'round'
  for (var i = 1; i < points.length; i++) {
    var midPoint = getMid(p1, p2)
    context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
    p1 = points[i]
    p2 = points[i + 1]
  }
  // context.lineTo(p1.x, p1.y)
  context.stroke()
}

function record() {
  step++
  if (step < canvasHistory.length) {
    canvasHistory.length = step // 截断数组
  }
  // 执行绘制的相关操作（如绘制图片、线条等）
  // ...
  // ...
  canvasHistory.push(board.toDataURL()) // 添加新的绘制到历史记录
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
      points.push({ x, y })
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
      points.push({ x, y })
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var p1 = points[0]
        var p2 = points[1]
        drawNewLine(p1, p2)
        // var newPoint = {
        //   x: x,
        //   y: y,
        // }
        // drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        // lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (e) {
      if (!using) {
        return
      }
      record()
      lastPoint = null
      using = false
      points.length = 0
    }
  } else {
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      points.push({ x, y })
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x,
          y,
        }
      }
    }
    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY
      if (!using) {
        return
      }
      points.push({ x, y })
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var p1 = points[0]
        var p2 = points[1]
        drawNewLine(p1, p2)
        // var newPoint = {
        //   x,
        //   y,
        // }
        // drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        // lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (e) {
      if (!using) {
        return
      }
      record()
      lastPoint = null
      using = false
      points.length = 0
    }
  }
}

function getMid(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  }
}
