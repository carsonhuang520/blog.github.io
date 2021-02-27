const code = `/* 首先，准备背景 */
body {
  background: #93b8ca;
}
/* 接下来，画哆啦A梦外面的蓝脸 */
.face_01 {
  margin: 50px auto;
  position: relative;
  width: 420px;
  height: 400px;
  background-color: #1e90ff;
  border: 2px solid #000;
  border-radius: 47% 47% 45% 45%;
}
/* 接下来，画哆啦A梦外面的白脸 */
.face_02 {
  position: absolute;
  bottom: 0;
  left: 30px;
  width: 360px;
  height: 300px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 50% 50% 45% 45%;
}
/* 画眼睛 */
.eye_box {
  position: absolute;
  top: -45px;
  right: 90px;
  width: 180px;
  height: auto;
}

.big_eye_left,
.big_eye_right {
  width: 90px;
  height: 110px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 46%;
}
/* 将左眼放到左边（废话） */
.big_eye_left {
  float: left;
}
/* 将右眼放到右边（废话） */
.big_eye_right {
  float: right;
}
/* 接下来，画眼睛里的眼珠 */
.small_eye_left,
.small_eye_right {
  position: absolute;
  top: 60px;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
}
/* 将眼珠定位到正确位置 */
.small_eye_left {
  left: 60px;
}

.small_eye_right {
  right: 60px;
}
/* 接下去，就是画鼻子了 */
.nose_01 {
  position: absolute;
  top: 47px;
  left: 151px;
  width: 50px;
  height: 50px;
  background-color: #ff0000;
  border: 2px solid #000;
  border-radius: 50%;
}

.nose_01_shadow {
  position: absolute;
  top: 10px;
  left: 25px;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.4);
}
/* 画鼻子的第二部分 */
.nose_02 {
  height: 130px;
  width: 2px;
  position: absolute;
  top: 95px;
  left: 176px;
  border-left: 2px solid #000;
}
/* 接下来，就是换哆啦A梦的嘴巴了 */
.mouth {
  position: absolute;
  top: 25px;
  left: 60px;
  height: 200px;
  width: 240px;
  border-bottom: 2px solid #000;
  border-radius: 0 0 45% 45%;
}
/* 然后，就是胡须啦~ */
.whisker_left,
.whisker_right {
  position: absolute;
  top: 60px;
  width: 180px;
  height: 180px;
}

.whisker_left {
  left: 0;
}

.whisker_right {
  right: 0;
}
/* 接下去对每根胡须做特定的旋转 */
.whisker_left span:nth-child(1),
.whisker_right span:nth-child(1) {
  position: absolute;
  top: 30px;
  height: 60px;
  width: 100px;
  border-top: 2px solid #000;
}

.whisker_left span:nth-child(1) {
  left: 30px;
  -webkit-transform: rotate(20deg);
  transform: rotate(20deg);
}

.whisker_right span:nth-child(1) {
  right: 30px;
  -webkit-transform: rotate(-20deg);
  transform: rotate(-20deg);
}

.whisker_left span:nth-child(2),
.whisker_right span:nth-child(2) {
  position: absolute;
  top: 60px;
  height: 60px;
  width: 100px;
  border-top: 2px solid #000;
}

.whisker_left span:nth-child(2) {
  left: 35px;
}

.whisker_right span:nth-child(2) {
  right: 35px;
}

.whisker_left span:nth-child(3),
.whisker_right span:nth-child(3) {
  position: absolute;
  top: 90px;
  height: 60px;
  width: 100px;
  border-top: 2px solid #000;
}

.whisker_left span:nth-child(3) {
  left: 50px;
  -webkit-transform: rotate(-20deg);
  transform: rotate(-20deg);
}

.whisker_right span:nth-child(3) {
  right: 50px;
  -webkit-transform: rotate(20deg);
  transform: rotate(20deg);
}
/* 最后，就是哆啦A梦的围巾部分了 */
.collar {
  position: absolute;
  top: 350px;
  left: 50px;
  width: 320px;
  height: 50px;
  background-color: #ff0000;
  border: 2px solid #000;
  border-radius: 30px;
}
/* 这里，对哆啦A梦的铃铛做处理 */
.bell_01 {
  position: absolute;
  top: 15px;
  left: 130px;
  width: 60px;
  height: 60px;
  background-color: #ffff00;
  border: 2px solid #000;
  border-radius: 50%;
}

.bell_02 {
  position: absolute;
  top: 17px;
  left: 1px;
  width: 53px;
  height: 18px;
  border-top: 2px solid #000;
}

.bell_03 {
  position: absolute;
  top: 22px;
  left: 0;
  width: 57px;
  height: 23px;
  border-top: 2px solid #000;
}

.bell_04 {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 15px;
  height: 10px;
  background-color: #000;
  border-radius: 50%;
}

.bell_05 {
  position: absolute;
  top: 37px;
  left: 27px;
  width: 30px;
  height: 20px;
  border-left: 2px solid #000;
}
/* 好了，这只哆啦A梦送给你 */`

export default code
