//main.js file
var ui = {
  /**
   * comment  : 공통변수
   * param    : 
   * @author  : 
   * @date    : 
   */
  window: {
    $this: $(window),
    height: null,
    scrollTop: null
  },
  document: {
    $this: $(document),
    height: null,
  },
  $html: $('html'),
  $body: null,
  $wrap: null,

  /**
   * comment  : 초기화
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxInit: function () {
    // Detectizr.detect({
    //   detectScreen: false
    // });
    ui.fxEventWindow();
    ui.fxUserAgent();
    ui.fxCheckScroll();
    ui.fxTab();
  },
  /**
   * comment  : 윈도우 이벤트
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxEventWindow: function () {
    $(function () {
      ui.$body = $('body');
      ui.$wrap = $('body > .content-wrap');
      ui.fxSticky();
      ui.fxGnb();
    });
    ui.window.$this.on({
      'load': function () {
        ui.window.scrollTop = ui.window.$this.scrollTop();
        ui.window.height = ui.window.$this.height();
        ui.document.height = ui.document.$this.height();
      },
      'scroll': function () {
        ui.window.scrollTop = ui.window.$this.scrollTop();
        ui.document.height = ui.document.$this.height();
      },
      'resize': function () {
        ui.window.height = ui.window.$this.height();
      }
    })
  },
  /**
   * comment  : 브라우저 정보 확인 
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxUserAgent: function () {
    /* mobile */
    if (navigator.userAgent.match(/Android/i) !== null) {
      $('html').addClass('android');
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) {
      $('html').addClass('ios');
    } else if (navigator.userAgent.match(/IEMobile/i) !== null) {
      $('html').addClass('iemobile');
    } else if (navigator.userAgent.match(/BlackBerry/i) !== null) {
      $('html').addClass('blackberry');
    } else if (navigator.userAgent.match(/Opera Mini/i) !== null) {
      $('html').addClass('operamini');
    }
    /* pc */
    if (navigator.userAgent.match(/MSIE/i) !== null || !!navigator.userAgent.match(/Trident.*rv:11./)) {
      /* ie ~ 10 까지 || window8 edge */
      $('html').addClass('msie');
    } else if (navigator.userAgent.match(/Edge\//i) !== null) {
      $('html').addClass('edge');
    } else if (navigator.userAgent.match(/Edg\//i) !== null) {
      $('html').addClass('chromiumedge');
    } else if (navigator.userAgent.match(/Chrome/i) !== null) {
      $('html').addClass('chrome');
    } else if (navigator.userAgent.match(/Safari/i) !== null) {
      $('html').addClass('safari');
    } else if (navigator.userAgent.match(/Firefox/i)) {
      $('html').addClass('firefox');
    }
  },
  /**
   * comment  : 현재 스크롤 방향 & top,bottom 여부를 html태그에 나타냄 top, bottom & up, down
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxCheckScroll: function () {
    var beforePositon = 0;
    ui.window.$this.on({
      'load': function () {
        (ui.window.scrollTop <= 0) ? ui.$html.removeClass('ps-header--white').addClass('top'): ui.$html.removeClass('top');
        (ui.window.scrollTop > 0) ? $('#psHeader').addClass('ps-header--white'): $('#psHeader').removeClass('ps-header--white');
        (ui.window.scrollTop <= 0) ? $('#psHeader').removeClass('ps-header--white').addClass('top'): $('#psHeader').removeClass('top');
        (ui.window.height + ui.window.scrollTop >= ui.document.height) ? ui.$html.addClass('bottom'): ui.$html.removeClass('bottom');
        (ui.window.height + ui.window.scrollTop >= ui.document.height) ? $('#psHeader').addClass('bottom'): $('#psHeader').removeClass('bottom');
        beforePositon = ui.window.scrollTop;
      },
      'scroll': function () {
        if (beforePositon > ui.window.scrollTop) {
          ui.$html.removeClass('down').addClass('up');
          $('#psHeader').removeClass('down').addClass('up');
        } else if (beforePositon < ui.window.scrollTop) {
          ui.$html.removeClass('up').addClass('down');
          $('#psHeader').removeClass('up').addClass('down');
        }
        (ui.window.scrollTop <= 0) ? ui.$html.removeClass('ps-header--white').addClass('top'): ui.$html.removeClass('top');
        (ui.window.scrollTop > 0) ? $('#psHeader').addClass('ps-header--white'): $('#psHeader').removeClass('ps-header--white');
        (ui.window.scrollTop <= 0) ? $('#psHeader').removeClass('ps-header--white').addClass('top'): $('#psHeader').removeClass('top');
        (ui.window.height + ui.window.scrollTop >= ui.document.height) ? ui.$html.addClass('bottom'): ui.$html.removeClass('bottom');
        (ui.window.height + ui.window.scrollTop >= ui.document.height) ? $('#psHeader').addClass('bottom'): $('#psHeader').removeClass('bottom');
        beforePositon = ui.window.scrollTop;
      }
    })
  },
  /**
   * comment  : 스티키
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxSticky: function () {
    $('.ui.ps-sticky').each(function () {
      var obj = $(this);
      if (obj.data('state') == undefined) {
        obj.data('state', 'ready');
        if (obj.data('top') == undefined) obj.data('top', 0);
        obj.data('start', obj.offset().top - obj.data('top'));
        $(window).scroll(function () {
          if (!obj.hasClass('fixed')) obj.data('start', obj.offset().top - obj.data('top'));
          if (ui.window.scrollTop > obj.data('start')) {
            if (!obj.next().hasClass('ego')) {
              $('<div>').addClass('ego').css('height', obj.outerHeight() + parseInt(obj.css('margin-bottom'), 10)).insertAfter(obj);
              if (obj.data('before')) new Function(obj.data('before'))()
            }
            obj.addClass('fixed').css({
              'position': 'fixed',
              'top': obj.data('top')
            });
          } else {
            if (obj.next().hasClass('ego')) {
              obj.next().remove();
              if (obj.data('before')) new Function(obj.data('restore'))()
            }
            obj.removeClass('fixed').css({
              'position': '',
              'top': ''
            });
          }
        })
      }
    })
  },
  /**
   * comment  : GNB
   * param    : 
   * @author  : 
   * @date    : 
   */
  fxGnb: function () {
    $('.ps-btn.ps-icon--menu').on('click', function () {
      $('.ps-gnb__wrap').toggleClass('on')
      $(this).toggleClass('ps-icon--close')
      ui.$html.toggleClass('scroll-lock')
      if (!$(this).hasClass('ps-icon--close')) {
        $('.ps-gnb__wrap, .ps-gnb-sub__wrap').removeClass('on')
      }
    })
    $('[data-target].ps-btn.ps-btn--gnb').on('click', function () {
      $(this).siblings('.ps-gnb-sub__wrap').addClass('on')
    })
    $('.ps-btn.ps-btn--back').on('click', function () {
      $(this).closest('.ps-gnb-sub__wrap').removeClass('on')
    })
    $('[data-href].ps-btn.ps-btn--gnb').on('click', function () {
      console.log($(this).data('href'))
      location.href = $(this).data('href')
    })
  },

  /**
   * comment  : 탭
   * param    : 
   * @author  : 
   * @date    :
   */
  fxTab: function () {
    $('.ui.ps-tab').each(function () {
      var obj = $(this);
      if (obj.data('state') == undefined) {
        obj.data('state', 'ready');
        if (obj.find('[role=tab][aria-selected="true"]').length == 1) {
          obj.find('[role=tab]').bind('click', function () {
            if ($(this).attr('aria-selected') !== 'true') {
              $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
              $($(this).attr('href')).show().attr('hidden', false);
              $($(this).attr('href')).removeClass('hidden');
              $(this).siblings().each(function () {
                $($(this).attr('href')).hide().attr('hidden', true);
                $($(this).attr('href')).addClass('hidden');
              })
            }
            return false;
          })
        } else {
          console.log('ui error : aria-selected length')
        }
      }
    })
  },
}


/**
 * comment  : 팝업
 * param    : 
 * @author  : 
 * @date    :
 */
function layerPopup() {
  $('.ps-bottom-layer-btn').on('click', function(){
    var data = $(this).data('bottom-layer');
    console.log(data);
    $('[data-bottom-layer-open="'+ data +'"]').addClass('active');
  });

  $('.ps-bottom-layer-close').on('click', function(){
    $(this).closest('.ps-bottom-layer').removeClass('active');
  });
}

$(function () {
  ui.fxInit();
  layerPopup();
})