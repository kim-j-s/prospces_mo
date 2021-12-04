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
    ui.fxPrdDetailScroll();
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
      //console.log($(this).data('href'))
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
    });
  },
  /**
   * comment  : 스티키
   * param    : 
   * @author  : 
   * @date    : 
   */
   fxPrdDetailScroll: function () {

    // 상품상세 탭
    var $prdDetailTab = $('.ps-prd-detail--tab');

    if ($prdDetailTab.length > 0) {
      ui.window.$this.on({
        'scroll': function () {
          if ($prdDetailTab.offset().top < ui.window.scrollTop) {
            $('.detail-tab').addClass('on');
          } else {
            $('.detail-tab').removeClass('on');
          }
        }
      });
    }
    
    $('.anchor').on('click', function(){
      var $this = $(this);
      var $target = $('.ps-prd-detail');
      var $top = $target.offset().top;
      $('html, body').animate({
        scrollTop: $top - 56
      }, 500);
      return false;
    })

    // 상품상세 추가옵션
    var $bottomOption = $('.ps-buy');
    var $content = $('.ps-prd-detail');
    
    if ($bottomOption.length > 0) {
      ui.window.$this.on({
        'scroll': function () {
          if ($content.offset().top + $content.outerHeight() < ui.window.scrollTop + ui.window.height) {
            $bottomOption.addClass('active');
            $('.ps-bottom-layer').removeClass('active');
          } else {
            $bottomOption.removeClass('active');
          }
        }
      });
    }

  },
}

/**
 * comment  : 팝업
 * param    : 
 * @author  : 
 * @date    :
 */
function layerPopup() {
  $('[data-open-layer]').on('click', function(){
    var data = $(this).data('open-layer');
    $('[data-layer-target="'+ data +'"]').addClass('active');
  });

  $('[data-close-layer]').on('click', function(){
    var data = $(this).data('close-layer');
    $('[data-layer-target="'+ data +'"]').removeClass('active');
  });
}

function fxLayerOutsideClose () {
  var $modal = $('.ps-bottom-layer');
  $(window).on('click', function(event) {
    for (var i = 0; i < $modal.length; i++) {
      if (event.target == $modal[i]) {
        $modal.removeClass('active');
      }
    }
  });
}

// 이메일 도메인 체크
function changeMailDomain(domain) {
  var $this = domain.value;
  if (!$this == '') {
    $('.inp-domain').attr('disabled', true);
    $('.inp-domain').val($this);
    if ($this == '99' || $this == '999') {
      $('.inp-domain').attr('disabled', false).val('').focus();
    }
  }
}

// slider
function slide() {
  $('.ps-slide-item a').on('click', function () {
    var $this = $(this);
    if ( $this.next().css('display') == 'none' ) {
      $this.closest('.ps-slide').find('.ps-slide-item').removeClass('on');
      $this.closest('.ps-slide').find('.ps-slide-content').slideUp(300);
      $this.closest('.ps-slide-item').addClass('on');
      $this.next().slideDown(300);
    } else {
      $this.closest('.ps-slide').find('.ps-slide-item').removeClass('on');
      $this.closest('.ps-slide').find('.ps-slide-content').slideUp(300);
    }
  });
}

// 공유하기 url 복사
function CopyUrlToClipboard(){
  var ct;
  $('.ps-btn-clipboard').on('click', function () {
    end();
    var dummy = document.createElement("input");
    var text = location.href;      
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    $('.ps-toast-msg').addClass('on');
    start();
  });

  function start() {
    ct = setTimeout(function(){
      $('.ps-toast-msg').removeClass('on');
    }, 1000);
  }
  function end() {
    clearTimeout(ct);
  }
}


$(function () {
  ui.fxInit();
  layerPopup();

  // slider
  slide();

  // layer popup close outside
  fxLayerOutsideClose();

  // 공유하기 url 복사
  CopyUrlToClipboard();

})