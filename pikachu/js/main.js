import code from './css.js'
$(function () {
  let duration = 50
  let id = 0
  let n = 0
  $('.actions').on('click', 'button', function (e) {
    let $button = $(e.currentTarget)
    let speed = $button.attr('data-speed')
    $button.addClass('active').siblings('.active').removeClass('active')
    switch (speed) {
      case 'pause':
        clearTimeout(id)
        break
      case 'play':
        writeCode('', code)
        break
      case 'slow':
        duration = 100
        break
      case 'normal':
        duration = 50
        break
      case 'fast':
        duration = 10
        break
    }
  })
  const lower = document.querySelector('.lowerLip')
  lower.addEventListener('click', function () {
    const audio = document.querySelector('audio')
    audio.play()
  })
  function writeCode(prefix, code, fn) {
    let container = document.querySelector('#code')
    let styleTag = document.querySelector('#styleTag')
    id = setTimeout(function run() {
      n += 1
      container.innerHTML = code.substring(0, n)
      styleTag.innerHTML = code.substring(0, n)
      container.scrollTop = container.scrollHeight
      if (n < code.length) {
        id = setTimeout(run, duration)
      } else {
        fn && fn.call()
      }
    }, duration)
  }
  writeCode('', code)
})
