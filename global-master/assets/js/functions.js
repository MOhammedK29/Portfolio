// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 4,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  $('.exp').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 3,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function s() {
    $(".slider--prev, .slider--next").click(function() {
        var t = $(this),
            e = $(".slider").find(".slider--item-left"),
            i = $(".slider").children().index(e),
            n = $(".slider").find(".slider--item-center"),
            s = $(".slider").children().index(n),
            r = $(".slider").find(".slider--item-right"),
            o = $(".slider").children().index(r),
            a = $(".slider").children().length,
            l = $(".slider--item-left"),
            c = $(".slider--item-center"),
            h = $(".slider--item-right"),
            u = $(".slider--item");

        console.log('Click event triggered');
        console.log('Current indices - Left:', i, 'Center:', s, 'Right:', o);
        console.log('Total items:', a);

        $(".slider").animate({ opacity: 0 }, 300, function() {
            setTimeout(function() {
                if (t.hasClass("slider--next")) {
                    console.log('Next button clicked');
                    if (a - 1 > i && a - 1 > s && a - 1 > o) {
                        l.removeClass("slider--item-left").next().addClass("slider--item-left");
                        c.removeClass("slider--item-center").next().addClass("slider--item-center");
                        h.removeClass("slider--item-right").next().addClass("slider--item-right");
                    } else if (i === a - 1) {
                        u.removeClass("slider--item-left").first().addClass("slider--item-left");
                        c.removeClass("slider--item-center").next().addClass("slider--item-center");
                        h.removeClass("slider--item-right").next().addClass("slider--item-right");
                    } else if (s === a - 1) {
                        l.removeClass("slider--item-left").next().addClass("slider--item-left");
                        u.removeClass("slider--item-center").first().addClass("slider--item-center");
                        h.removeClass("slider--item-right").next().addClass("slider--item-right");
                    } else {
                        l.removeClass("slider--item-left").next().addClass("slider--item-left");
                        c.removeClass("slider--item-center").next().addClass("slider--item-center");
                        u.removeClass("slider--item-right").first().addClass("slider--item-right");
                    }
                } else {
                    console.log('Prev button clicked');
                    if (i !== 0 && s !== 0 && o !== 0) {
                        l.removeClass("slider--item-left").prev().addClass("slider--item-left");
                        c.removeClass("slider--item-center").prev().addClass("slider--item-center");
                        h.removeClass("slider--item-right").prev().addClass("slider--item-right");
                    } else if (i === 0) {
                        u.removeClass("slider--item-left").last().addClass("slider--item-left");
                        c.removeClass("slider--item-center").prev().addClass("slider--item-center");
                        h.removeClass("slider--item-right").prev().addClass("slider--item-right");
                    } else if (s === 0) {
                        l.removeClass("slider--item-left").prev().addClass("slider--item-left");
                        u.removeClass("slider--item-center").last().addClass("slider--item-center");
                        h.removeClass("slider--item-right").prev().addClass("slider--item-right");
                    } else {
                        l.removeClass("slider--item-left").prev().addClass("slider--item-left");
                        c.removeClass("slider--item-center").prev().addClass("slider--item-center");
                        u.removeClass("slider--item-right").last().addClass("slider--item-right");
                    }
                }
                $(".slider").animate({ opacity: 1 }, 200);
            }, 200);
        });
    });
}


function p() {
  $(".project--prev, .project--next").click(function() {
      var t = $(this),
          e = $(".project").find(".project--item-left"),
          i = $(".project").children().index(e),
          n = $(".project").find(".project--item-center"),
          s = $(".project").children().index(n),
          r = $(".project").find(".project--item-right"),
          o = $(".project").children().index(r),
          a = $(".project").children().length,
          l = $(".project--item-left"),
          c = $(".project--item-center"),
          h = $(".project--item-right"),
          u = $(".project--item");

      console.log('Click event triggered');
      console.log('Current indices - Left:', i, 'Center:', s, 'Right:', o);
      console.log('Total items:', a);

      $(".project").animate({ opacity: 0 }, 300, function() {
          setTimeout(function() {
              if (t.hasClass("project--next")) {
                  console.log('Next button clicked');
                  if (a - 1 > i && a - 1 > s && a - 1 > o) {
                      l.removeClass("project--item-left").next().addClass("project--item-left");
                      c.removeClass("project--item-center").next().addClass("project--item-center");
                      h.removeClass("project--item-right").next().addClass("project--item-right");
                  } else if (i === a - 1) {
                      u.removeClass("project--item-left").first().addClass("project--item-left");
                      c.removeClass("project--item-center").next().addClass("project--item-center");
                      h.removeClass("project--item-right").next().addClass("project--item-right");
                  } else if (s === a - 1) {
                      l.removeClass("project--item-left").next().addClass("project--item-left");
                      u.removeClass("project--item-center").first().addClass("project--item-center");
                      h.removeClass("project--item-right").next().addClass("project--item-right");
                  } else {
                      l.removeClass("project--item-left").next().addClass("project--item-left");
                      c.removeClass("project--item-center").next().addClass("project--item-center");
                      u.removeClass("project--item-right").first().addClass("project--item-right");
                  }
              } else {
                  console.log('Prev button clicked');
                  if (i !== 0 && s !== 0 && o !== 0) {
                      l.removeClass("project--item-left").prev().addClass("project--item-left");
                      c.removeClass("project--item-center").prev().addClass("project--item-center");
                      h.removeClass("project--item-right").prev().addClass("project--item-right");
                  } else if (i === 0) {
                      u.removeClass("project--item-left").last().addClass("project--item-left");
                      c.removeClass("project--item-center").prev().addClass("project--item-center");
                      h.removeClass("project--item-right").prev().addClass("project--item-right");
                  } else if (s === 0) {
                      l.removeClass("project--item-left").prev().addClass("project--item-left");
                      u.removeClass("project--item-center").last().addClass("project--item-center");
                      h.removeClass("project--item-right").prev().addClass("project--item-right");
                  } else {
                      l.removeClass("project--item-left").prev().addClass("project--item-left");
                      c.removeClass("project--item-center").prev().addClass("project--item-center");
                      u.removeClass("project--item-right").last().addClass("project--item-right");
                  }
              }
              $(".project").animate({ opacity: 1 }, 200);
          }, 200);
      });
  });
}

$(document).ready(function() {
    console.log('Document ready');
    s();
    p();
});


  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }
  outerNav();
  transitionLabels();
});
