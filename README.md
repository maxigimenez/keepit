keepit
====================

Is a minimal API wrapper for localStorage with the big featured of set data with expiration time expressed in hours.

##Download

The source is available for download from [Github](https://github.com/maxigimenez/keepit), and you can using [Bower](http://bower.io/).

```
bower install keepit
```

##In the browser

Usage:

```html
<script type="text/javascript" src="keepit.js"></script>
<script type="text/javascript">
	keepit.set('dummykey', 'dummyvalue');
	console.log(keepit.get('dummykey'));
</script>

```

##How to use

```js
keepit.set(key, value, expiration);
keepit.get(key);
keepit.getAll();
keepit.delete(key);
keepit.flush();

```
