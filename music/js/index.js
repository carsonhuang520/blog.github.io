$(function () {
  // 初始化滚动条
  $(".content-list").mCustomScrollbar()
  var $audio = $("audio")
  var player = new Player($audio)
  var progress
  var voiceProgress
  var lyric

  handleLoadMusic()
  initProgress()
  initEvents()

  function initMusicInfo(music) {
    // 获取对应的元素
    var $musicImage = $(".song-info-pic img")
    var $musicName = $(".song-info-name a")
    var $musicSinger = $(".song-info-singer a")
    var $musicAblum = $(".song-info-album a")
    var $musicProgressName = $(".music-progress-name")
    var $musicProgressTime = $(".music-progress-time")
    var $musicBg = $(".mask-bg")

    // 给获取到的元素赋值
    $musicImage.attr("src", music.cover)
    $musicName.text(music.name)
    $musicSinger.text(music.singer)
    $musicAblum.text(music.album)
    $musicProgressName.text(music.name + " / " + music.singer)
    $musicProgressTime.text("00:00 / " + music.time)
    $musicBg.css("background", "url('" + music.cover + "')")
  }
  function initLyric(music) {
    lyric = new Lyric(music.link_lrc)
    var $lryicContainer = $(".song-lyric")
    $lryicContainer.html("")
    lyric.loadLyric(function () {
      $.each(lyric.lyrics, function (index, ele) {
        var $item = $("<li>" + ele + "</li>")
        $lryicContainer.append($item)
      })
    })
  }
  function initProgress() {
    var $progressBar = $(".music-progress-bar")
    var $progressLine = $(".music-progress-line")
    var $progressDot = $(".music-progress-dot")
    progress = new Progress($progressBar, $progressLine, $progressDot)
    progress.progressClick(function (value) {
      player.musicSeekTo(value)
    })
    progress.progressMove(function (value) {
      player.musicSeekTo(value)
    })

    var $voiceBar = $(".music-voice-bar")
    var $voiceLine = $(".music-voice-line")
    var $voiceDot = $(".music-voice-dot")
    voiceProgress = new Progress($voiceBar, $voiceLine, $voiceDot)
    voiceProgress.progressClick(function (value) {
      player.musicVoiceSeekTo(value)
    })
    voiceProgress.progressMove(function (value) {
      player.musicVoiceSeekTo(value)
    })
  }
  // 初始化事件
  function initEvents() {
    $(".del-many").on("click", function () {
      // alert("all")
      if ($(".list-title .list-check").hasClass("list-checked")) {
        $.each($(".list-music"), function (index, ele) {
          ele.remove()
        })
        $(".list-title .list-check").removeClass("list-checked")
      } else if ($(".list-music .list-check").hasClass("list-checked")) {
        $.each($(".list-music"), function (index, ele) {
          if ($(ele).children(".list-check").hasClass("list-checked")) {
            ele.remove()
          }
          $(".list-music").each(function (index, ele) {
            ele.index = index
            $(ele)
              .find(".list-number")
              .text(index + 1)
          })
          // ele.remove()
        })
      } else {
        alert("你未选中歌曲！！！")
      }
    })
    $(".clear-all").on("click", function () {
      $.each($(".list-music"), function (index, ele) {
        ele.remove()
      })
    })
    // 监听歌单移入移出事件
    $(".content-list").delegate(".list-music", "mouseenter", function () {
      $(this).find(".list-menu").stop().fadeIn(100)
      $(this).find(".list-time a").stop().fadeIn(100)
      $(this).find(".list-time span").stop().fadeOut(100)
    })
    $(".content-list").delegate(".list-music", "mouseleave", function () {
      $(this).find(".list-menu").stop().fadeOut(100)
      $(this).find(".list-time a").stop().fadeOut(100)
      $(this).find(".list-time span").stop().fadeIn(100)
    })
    $(".list-title .list-check").click(function () {
      $(this).toggleClass("list-checked")
      $(this)
        .parents(".list-title")
        .siblings(".list-music")
        .toggleClass("list-checked")
    })
    // 监听复选框点击事件
    $(".content-list").delegate(
      ".list-music .list-check",
      "click",
      function () {
        $(this).toggleClass("list-checked")
      }
    )
    var $musicPlay = $(".music-play")
    // 监听播放按钮点击事件
    $(".content-list").delegate(".list-menu-play", "click", function () {
      var $item = $(this).parents(".list-music")
      $(this).toggleClass("list-menu-play2")
      $item.siblings().find(".list-menu-play").removeClass("list-menu-play2")
      if ($(this).hasClass("list-menu-play2")) {
        $musicPlay.addClass("music-play2")
        $item.find("div").css("color", "#fff")
        $item.siblings().find("div").css("color", "rgba(255, 255, 255, 0.5)")
      } else {
        $musicPlay.removeClass("music-play2")
        $item.find("div").css("color", "rgba(255, 255, 255, 0.5)")
      }
      $item.find(".list-number").toggleClass("list-number2")
      $item.siblings().find(".list-number").removeClass("list-number2")
      // 播放音乐
      player.playMusic($item.get(0).index, $item.get(0).music)

      initMusicInfo($item.get(0).music)
      initLyric($item.get(0).music)
    })

    $musicPlay.click(function () {
      if (player.currentIndex === -1) {
        $(".list-music").eq(0).find(".list-menu-play").trigger("click")
      } else {
        $(".list-music")
          .eq(player.currentIndex)
          .find(".list-menu-play")
          .trigger("click")
      }
    })

    $(".music-pre").click(function () {
      $(".list-music")
        .eq(player.preIndex())
        .find(".list-menu-play")
        .trigger("click")
    })

    $(".music-next").click(function () {
      $(".list-music")
        .eq(player.nextIndex())
        .find(".list-menu-play")
        .trigger("click")
    })

    $(".content-list").delegate(".list-menu-del", "click", function () {
      var $item = $(this).parents(".list-music")
      if ($item.get(0).index === player.currentIndex) {
        $(".music-next").trigger("click")
      }
      $item.remove()
      player.changeMusic($item.get(0).index)
      $(".list-music").each(function (index, ele) {
        ele.index = index
        $(ele)
          .find(".list-number")
          .text(index + 1)
      })
    })

    player.musicTimeUpdate(function (currentTime, duration, timeStr) {
      if (currentTime >= duration) {
        $(".list-music")
          .eq(player.nextIndex())
          .find(".list-menu-play")
          .trigger("click")
      }
      $(".music-progress-time").text(timeStr)
      var value = (currentTime / duration) * 100
      progress.setProgress(value)

      var index = lyric.currentIndex(currentTime)
      var $item = $(".song-lyric li").eq(index)
      $item.addClass("cur")
      $item.siblings().removeClass("cur")
      if (index <= 2) return
      $(".song-lyric").css({
        marginTop: (-index + 2) * 30,
      })
    })

    $(".music-mode").click(function () {
      if ($(this).hasClass("music-mode2")) {
        $(this).addClass("music-mode3")
        $(this).removeClass("music-mode2")
        // $(this).addClass("music-mode2")
      } else if ($(this).hasClass("music-mode3")) {
        $(this).addClass("music-mode4")
        $(this).removeClass("music-mode3")
      } else if ($(this).hasClass("music-mode4")) {
        $(this).removeClass("music-mode4")
      } else {
        $(this).addClass("music-mode2")
      }
    })

    $(".music-fav").click(function () {
      $(this).toggleClass("music-fav2")
    })

    $(".music-only").click(function () {
      $(this).toggleClass("music-only2")
    })

    $(".music-voice-icon").click(function () {
      $(this).toggleClass("music-voice-icon2")
      if ($(this).hasClass("music-voice-icon2")) {
        player.musicVoiceSeekTo(0)
      } else {
        player.musicVoiceSeekTo(1)
      }
    })
  }

  // 动态加载歌曲
  function handleLoadMusic() {
    $.ajax({
      url: "./source/musiclist.json",
      dataType: "json",
      success: function (data) {
        player.musicList = data
        var $musicList = $(".content-list ul")
        $.each(data, function (index, ele) {
          var $item = createEle(index, ele)
          $musicList.append($item)
        })
        initMusicInfo(data[0])
        initLyric(data[0])
      },
      error: function (error) {
        console.log(error)
      },
    })
  }

  // 创建歌曲列表
  function createEle(index, music) {
    var $item = $(
      "" +
        '<li class="list-music">\n' +
        '<div class="list-check"><i></i></div>\n' +
        '<div class="list-number">' +
        (index + 1) +
        "</div>\n" +
        '<div class="list-name">' +
        music.name +
        "" +
        '     <div class="list-menu">\n' +
        '          <a href="javascript:;" title="播放" class=\'list-menu-play\'></a>\n' +
        '          <a href="javascript:;" title="添加"></a>\n' +
        '          <a href="javascript:;" title="下载"></a>\n' +
        '          <a href="javascript:;" title="分享"></a>\n' +
        "     </div>\n" +
        "</div>\n" +
        '<div class="list-singer">' +
        music.singer +
        "</div>\n" +
        '<div class="list-time">\n' +
        "     <span>" +
        music.time +
        "</span>\n" +
        '     <a href="javascript:;" title="删除" class=\'list-menu-del\'></a>\n' +
        "</div>\n" +
        "</li>"
    )
    $item.get(0).index = index
    $item.get(0).music = music
    return $item
  }
})
