/*!
 * jquery.expand-search.js - v0.0.1 - https://github.com/kerotaa/jquery.expand-search.js
 * A jQuery plugin that makes search form full screen.
 * 
 * 
 * Copyright (c) 2013 kerotaa (http://kerotaa.github.io)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013-06-26
 **/
;(function($, window, pluginName) {
  var ExpandSearch;
  ExpandSearch = (function() {
    function ExpandSearch(_target, _options) {
      var _activate, _clone, _closeButton, _deactivate, _document, _enabled, _getClone, _id, _textfield, _window;
      _id = '.' + pluginName + new Date().getTime();
      _window = $(window);
      _document = $(document);
      _closeButton = $(_options.CloseButton, _target).first();
      _textfield = $(_options.TextField, _target).first();
      _clone = false;
      _enabled = false;
      _getClone = function() {
        return $(document.createElement('div')).outerWidth(_target.outerWidth(true)).outerHeight(_target.outerHeight(true)).hide();
      };
      _activate = function(event) {
        var activePlaceholder;
        _target.addClass(_options.ActiveClassName).animate({
          'opacity': 1
        }, 300);
        _clone.show();
        activePlaceholder = _textfield.data('active-placeholder');
        if (activePlaceholder) {
          _textfield.data('deactive-placeholder', _textfield.attr('placeholder'));
          _textfield.attr('placeholder', activePlaceholder);
        }
        _document.on('keyup' + _id, function(event) {
          var code;
          code = event.keyCode || event.which;
          if (code === 27) {
            return _deactivate.call(self, event);
          }
        });
      };
      _deactivate = function(event) {
        var deactivePlaceholder;
        _document.off('keyup' + _id);
        _textfield.blur();
        deactivePlaceholder = _textfield.data('deactive-placeholder');
        _target.animate({
          'opacity': 0
        }, 200, 'swing', function() {
          if (deactivePlaceholder) {
            _textfield.attr('placeholder', deactivePlaceholder);
          }
          _clone.hide();
          return _target.removeClass(_options.ActiveClassName).css('opacity', '');
        });
      };
      this.on = function() {
        var self;
        if (_enabled) {
          return;
        }
        _enabled = true;
        self = this;
        _clone = _getClone();
        _target.after(_clone);
        _textfield.on('focus' + _id, $.proxy(_activate, this));
        _closeButton.on('click' + _id, $.proxy(_deactivate, this));
        _window.on('scroll' + _id, function(event) {
          return event.preventDefault();
        });
      };
      this.off = function() {
        if (!_enabled) {
          return;
        }
        _clone.remove();
        _textfield.off('focus' + _id);
        _closeButton.off('click' + _id);
        _document.off('keyup' + _id);
        _window.off('scroll' + _id);
        _enabled = false;
      };
    }

    return ExpandSearch;

  })();
  $.fn[pluginName] = function(options) {
    var configs;
    configs = $.extend(true, {}, $.fn[pluginName].defaults, options);
    return this.each(function() {
      var data, target;
      target = $(this);
      data = target.data(pluginName);
      if (!data) {
        data = new ExpandSearch(target, configs);
        target.data(pluginName, data);
      }
      return data.on();
    });
  };
  $.fn[pluginName].defaults = {
    'CloseButton': '.btn-close',
    'TextField': 'input[type=text]',
    'ActiveClassName': 'active'
  };
})(jQuery, window, 'expandSearch');
