do ($=jQuery, window, pluginName='expandSearch') ->

	class ExpandSearch
		constructor: (_target, _options) ->
			_id = '.' + pluginName + new Date().getTime()
			_window = $(window)
			_document = $(document)
			_closeButton = $(_options.CloseButton, _target).first()
			_textfield = $(_options.TextField, _target).first()
			_clone = false
			_enabled = false

			_getClone = ->
				$(document.createElement('div')).outerWidth(_target.outerWidth(true)).outerHeight(_target.outerHeight(true)).hide()

			_activate = (event)->
				_target.addClass(_options.ActiveClassName).animate(
					'opacity': 1
				, 300)
				_clone.show()
				activePlaceholder = _textfield.data('active-placeholder')
				if activePlaceholder
					_textfield.data('deactive-placeholder', _textfield.attr('placeholder'))
					_textfield.attr('placeholder', activePlaceholder)
				_document.on('keyup' + _id, (event) ->
					code = event.keyCode || event.which
					if code == 27
						_deactivate.call(self, event)
				)
				return

			_deactivate = (event)->
				_document.off('keyup' + _id)
				_textfield.blur()
				deactivePlaceholder = _textfield.data('deactive-placeholder')
				_target.animate(
					'opacity': 0
				, 200, 'swing', ->
					if deactivePlaceholder
						_textfield.attr('placeholder', deactivePlaceholder)
					_clone.hide()
					_target.removeClass(_options.ActiveClassName).css('opacity', '')
				)
				return

			@on = ->
				return if _enabled
				_enabled = true
				self = @
				_clone = _getClone()
				_target.after(_clone)
				_textfield.on('focus' + _id, $.proxy(_activate, @))
				_closeButton.on('click' + _id, $.proxy(_deactivate, @))
				_window.on('scroll' + _id, (event)->
					event.preventDefault()
				)
				return

			@off = ->
				return if !_enabled
				_clone.remove()
				_textfield.off('focus' + _id)
				_closeButton.off('click' + _id)
				_document.off('keyup' + _id)
				_window.off('scroll' + _id)
				_enabled = false
				return

	$.fn[pluginName] = (options)->
		configs = $.extend(true, {}, $.fn[pluginName].defaults, options)
		this.each(->
			target = $(this)
			data = target.data(pluginName)
			if !data
				data = new ExpandSearch(target, configs)
				target.data(pluginName, data)
			data.on()
		)

	$.fn[pluginName].defaults =
		'CloseButton': '.btn-close'
		'TextField': 'input[type=text]'
		'ActiveClassName': 'active'

	return
