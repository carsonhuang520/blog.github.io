$(function () {
  let duration = 50
  $(".actions").on("click", "button", function (e) {
    let $button = $(e.currentTarget)
    let speed = $button.attr("data-speed")
    $button.addClass("active").siblings(".active").removeClass("active")
    switch (speed) {
      case "slow":
        duration = 100
        break
      case "normal":
        duration = 50
        break
      case "fast":
        duration = 10
        break
    }
  })
  const lower = document.querySelector(".lowerLip")
  lower.addEventListener("click", function() {
    const audio = document.querySelector("audio")
    audio.play()
  })
  function writeCode(prefix, code, fn) {
    let container = document.querySelector("#code")
    let styleTag = document.querySelector("#styleTag")
    let n = 0
    let id
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
  let code = `/* 首先，需要准备皮卡丘的皮 */
  .preview {
      background: #fee433;
  }
  /* 接下来，画皮卡丘的鼻子 */
  .nose {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 12px;
      border-color: #000000 transparent transparent;
      border-radius: 11px;
      position: absolute;
      left: 50%;
      top: 28px;
      margin-left: -12px;
  }
  @keyframes wave{
    0%{
      transform: rotate(0deg);    
    }
    33%{
      transform: rotate(5deg);    
    }
    66%{
      transform: rotate(-5deg);    
    }
    100%{
      transform: rotate(0deg);    
    }
  }
  .nose:hover{
    transform-origin: center bottom;
    animation: wave 300ms infinite linear;
  }
  /* 将鼠标放到我鼻子上试试吧 */
  /* 接下来，画皮卡丘的眼睛 */
  .eye {
      width: 49px;
      height: 49px;
      background: #2e2e2e;
      border-radius: 50%;
      position: absolute;
      border: 2px solid #000000;
  }
  /* 眼睛里面的珠子 */
  .eye::before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background: #ffffff;
      border-radius: 50%;
      position: absolute;
      top: -1px;
      left: 6px;
      border: 2px solid #000000;
  }
  /* 左眼在左边 */
  .eye.left {
      right: 50%;
      margin-right: 90px;
  }
  /* 右眼在右边 */
  .eye.right {
      left: 50%;
      margin-left: 90px;
  }
  /* 然后，画皮卡丘的脸 */
  .face {
      width: 68px;
      height: 68px;
      background: #FC0D1C;
      border: 2px solid #000000;
      border-radius: 50%;
      position: absolute;
      top: 85px;
  }
  /* 将脸放到正确的位置 */
  .face.left {
      right: 50%;
      margin-right: 116px;
  }
  .face.right {
      left: 50%;
      margin-left: 116px;
  }
  .face > .img {
    width: 161px;
    height: 83px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: url("../images/flash.gif");
  }
  .face.left > .img {
    transform: rotateY(180deg);
    transform-origin: 0 0;
  }
  /* 上嘴唇 */
  .upperLip {
      height: 25px;
      width: 80px;
      border: 2px solid #000000;
      background: #FDE348;
      position: absolute;
      top: 50px;
  }
  /* 下嘴唇 */
  .upperLip.left {
      right: 50%;
      border-bottom-left-radius: 40px 25px;
      border-top: none;
      border-right: none;
      transform: rotate(-20deg);
  }
  .upperLip.right {
      left: 50%;
      border-bottom-right-radius: 40px 25px;
      border-top: none;
      border-left: none;
      transform: rotate(20deg);
  }
  .lowerLip-wrapper {
      height: 110px;
      width: 300px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -150px;
      overflow: hidden;
  }
  .lowerLip {
      height: 3500px;
      width: 300px;
      background: #990513;
      border: 2px solid #000000;
      border-radius: 200px / 2000px;
      position: absolute;
      bottom: 0;
      overflow: hidden;
  }
  /* 小舌头 */
  .lowerLip::before {
      content: '';
      width: 100px;
      height: 100px;
      background: #FC4A62;
      position: absolute;
      bottom: -20px;
      left: 50%;
      margin-left: -50px;
      border-radius: 50px;
  }
  /* 点击我的舌头有惊喜哈哈哈~ */
  /* 好了，这只皮卡丘送给你 */`
  writeCode("", code)
})
