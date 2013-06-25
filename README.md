# jQuery Expand Search

A jQuery plugin that makes search form full screen.

## Demo

* [Demo Page](http://kerotaa.github.io/jquery.expand-search.js/)

## Usage

### 1. Import StyleSheet

```html
<link rel="stylesheet" href="jquery.expand-search.css">
```

### 2. Markup

```html
<form class="search-box">
	<div class="btn-close"></div>
	<p>
		<input type="text" value="" placeholder="Search" data-active-placeholder="Type to search...">
	</p>
	<p class="help">
		Press <strong>return</strong> to search. Press <strong>Esc</strong> to cancel.
	</p>
</form>
```

### 3. JavaScript

```javascript
$(function() {
	$(selector).expandSearch(options);
});
```

## Options

```
{
	"CloseButton": ".btn-close",
	"TextField": "input[type=text]",
	"ActiveClassName": "active"
}
```

## Manual switch
```javascript
$(selector).data('expandSearch').off();
$(selector).data('expandSearch').on();
```
