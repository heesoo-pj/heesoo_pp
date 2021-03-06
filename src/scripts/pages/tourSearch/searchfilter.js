(function() {
  var checkBox = function(e) {
    var _this = this;
    var activeClassName = ' checked';
    var el = e;
    var label = el.parentNode;
    var classname = label.getAttribute('class');
    var text = label.querySelector('span');
    var type = el.getAttribute('type');
    var name = el.getAttribute('name') === null?false:el.getAttribute('name');

    if (type === 'checkbox') {
      type = el.getAttribute('data-type') === null?'checkbox':el.getAttribute('data-type');
    }

    var chk = function(e) {
      var bool = false;
      (e.indexOf(activeClassName) === -1)&&(bool = true);
      return bool;
    };

    this.check = function(el) {
      var _el = el;
      var _label = _el.parentNode;
      var _classname = _label.getAttribute('class');
      if (chk(_classname)) {
        _label.setAttribute('class', _classname + activeClassName);
        _el.setAttribute('checked', '');
      }
    };
    this.unCheck = function(el) {
      var _el = el;
      var _label = _el.parentNode;
      var _classname = _label.getAttribute('class');
      var _checked = _el.getAttribute('checked') === null?false:true;
      if (_checked) {
        _label.setAttribute('class', _classname.replace(activeClassName, ''));
        _el.removeAttribute('checked');
      }
    };
    if (type === 'allcheckbox') {
      if (chk(classname)) {
        var _el = document.querySelectorAll('[name="'+name+'"]');
        for (var i = 0; i<_el.length; i++) {
          _this.check(_el[i]);
        }
      } else {
        var _el = document.querySelectorAll('[name="'+name+'"]');
        for (var i = 0; i<_el.length; i++) {
          _this.unCheck(_el[i]);
        }
      }
    } else if (type === 'checkbox') {
      if (chk(classname)) {
        _this.check(el);
      } else {
        _this.unCheck(el);
      }
    } else {
      if (chk(classname)) {
        var _el = document.querySelectorAll('[name="'+name+'"]');
        for (var i = 0; i<_el.length; i++) {
          _this.unCheck(_el[i]);
        }
        _this.check(el);
      }
    }
  };
  (window.checkBox === undefined)&&(window.checkBox = checkBox);
  var initSlider = (function() {
    $('.bestListView .bestList').bxSlider({
      minSlides: 3,
      maxSlides: 3,
      slideWidth: 192,
      slideMargin: 40,
      infiniteLoop: false,
      hideControlOnEnd: true,
      pagerType: 'short'
    });
  }());

  var ranges = (function() {
    if ($('.range').length !== 0) {
      var ranges = $('.range').nstSlider({
        'rounding': {
          '10000': '990000'
        },
        'left_grip_selector': '.min',
        'right_grip_selector': '.max',
        'value_bar_selector': '.bar',
        'value_changed_callback': function(cause, leftValue, rightValue) {
          var $container = $(this).parent();
          leftValue = leftValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          rightValue = rightValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          $container.find('.minPrice').val(leftValue + '???');
          $container.find('.maxPrice').val(rightValue + '???');
        }
      });
    }
  }());

  var goToTheTop = (function() {
    $(window).on('scroll', function(e) {
      var scrollY = $(window).scrollTop();
      if (scrollY > 800) {
        var el = document.createElement('button');
        el.setAttribute('class', 'goToTheTop');
        if (!$('.housingCateWrapper').children().eq(0).hasClass('goToTheTop')) {
          $('.housingCateWrapper').prepend(el);
          $('.goToTheTop').on('click', function() {
            $('html, body').stop().animate({scrollTop: 0}, 500, 'swing');
          });
        } else {
          if ($('.housingCateWrapper').children('.goToTheTop').hasClass('disabled')) {
            $('.housingCateWrapper').children('.goToTheTop').removeClass('disabled');
          }
        }
      } else {
        $('.housingCateWrapper').children('.goToTheTop').addClass('disabled');
      }
    });
  }());

  // ??????
  var initPop = (function() {
    var locSelPop = new popup('locationSelect');
    var dateSelPop = new popup('dateSelect');
    var peopRoomPop = new popup('peopRoomSelect');
    var mapViewPop = new popup('mapView');

    $('.schForm .date .layerBtn').on('click', dateSelPop.open);
    $('.schForm .peopNum .layerBtn').on('click', peopRoomPop.open);
    $('.schForm .btnSpot .locSel').on('click', locSelPop.open);
    $('.schForm .btnSpot .map').on('click', mapViewPop.open);
  }());

  // ???
  var uiTab = (function uiTab(tab, con) {
    tab.on('click', '[role=tab]', function() {
      var _this = $(this);
      var idx = _this.index();
      var target = con.find('[role=tabpanel]').eq(idx);
      _this
        .addClass('current')
        .siblings('[role=tab]')
        .removeClass('current');
      target
        .addClass('current')
        .siblings('[role=tabpanel]')
        .removeClass('current');
    });
  });
  (window.uiTab === undefined)&&(window.uiTab = uiTab);

  // ???????????????
  var uiListBox = (function(elem) {
    elem.on('focus blur', 'button', function() {
      $(this)
        .siblings('[role=listbox]')
        .toggleClass('hidden', !$(this).is(':focus'));
    });
  });
  (window.uiListBox === undefined)&&(window.uiListBox = uiListBox);

  // ????????????
  function uiCheckbox(el) {
    el.on('click', function() {
      var chkbox = el.find('[type=checkbox]');
      el.toggleClass('checked');
      chkbox.prop('checked', !chkbox.is(':checked'));
      return false;
    });
  }

  // ?????? ??????????????????
  function uiPlaceholder(ipt) {
  // IE9 ?????? ???????????? ??????
    if (document.all && !window.atob) {
      var cont = ipt.parent();
      var txt = ipt.attr('placeholder');
      var placeholder = '<span class=\"iePlaceholder' + (ipt.hasValue() ? ' hidden' : '') + '\">' + txt + '</span>';
      cont.prepend(placeholder);

      // placeholder??? ??????????????? input??? ?????????
      cont.on('click', '.iePlaceholder', function() {
        $(this)
          .siblings('input')
          .focus();
      });

      // ????????? value??? ???????????? placeholder ??????
      ipt.on('keyup blur', function() {
        $(this)
          .siblings('.iePlaceholder')
          .toggleClass('hidden', ipt.hasValue());
      });
    }
  }

  // ????????? value??? ????????? ??????
  $.fn.hasValue = function() {
    return ($(this).val().length > 0);
  };

  $.fn.adHoverEvent = function() {
    $(this).on('mouseenter', function() {
      $(this).find('.adLayer').show();
    });

    $(this).on('mouseleave', function() {
      $(this).find('.adLayer').hide();
    });
  };

  $(document).ready(function() {
    // ????????????
    $('.chkBox').each(function() {
      uiCheckbox($(this));
    });

    // IE8 ?????? ?????? placeholder
    $('.schForm input[placeholder]').each(function() {
      uiPlaceholder($(this));
    });

    // ????????? ?????????????????????
    var $keyIpt = $('.schForm .keyword input[type=text]');
    $keyIpt.on('focus keyup', function() {
      $(this)
        .siblings('.autoComList')
        .toggleClass('hidden', !$(this).hasValue());
    });
    $keyIpt.on('blur', function() {
      $(this)
        .siblings('.autoComList')
        .addClass('hidden');
    });

    if ($('.adBox').length) {
      $('.adBox').adHoverEvent();
    }
  });
})();
