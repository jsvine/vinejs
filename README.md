# vine.js

... by @jsvine. Somewhere between a total joke and a perhaps-useful library for fetching Vine.co videos.

Because Vine.co doesn't have a public API right now, vine.js searches the Twitter API for recent vines, and then parses the results into a handy format.

__Note:__ Vine.js uses Twitter's Search API, which is rate limited. Especially if you're using vine.js in the browser, be careful to ration your searches.

## Usage

Vine.js should work in both the browser and Node.js. In either case, the library depends on jQuery.

In the browser:

```
<script src="vine.js"></script>
```

In Node.js:

```
var Vine = require("./vine.js");
```

And then, to use in either:

```
var search = new Vine.Search("#cats");
var search.fetch(function () {
	console.log(this.results);
});
``` 

You can also use the shorthand:

```
var search = new Vine.Search("#cats", function () {
	console.log(this.results);
});
```

## Thanks

Thanks to [Michael Keller](http://twitter.com/@mhkeller) and [Kate Ray](http://twitter.com/kraykray), who independently both suggested I make this library. They were joking; this is semi-serious.