# vine.js

... by @jsvine. Somewhere between a total joke and a useful library for fetching Vine.co videos.

Because Vine.co doesn't have a public API right now, vine.js searches the Twitter API for recent vines, and then parses the results into a handy format.

__Note:__ Vine.js uses Twitter's Search API, which is rate limited. Especially if you're using vine.js in the browser, be careful to ration your searches.

## Demo

[Click here for a basic demo.](http://www.jsvine.com/vinejs/demo/)

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
search.fetch(function () {
	console.log(this.results);
});
``` 

You can also use the shorthand:

```
var search = new Vine.Search("#cats", function () {
	console.log(this.results);
});
```

## Advanced Usage

Rather than pass a string as the first parameter to `Vine.Search`, you can pass a dictionary of options. These options are drawn from [Twitter's Search API (v1)](https://dev.twitter.com/docs/api/1/get/search) and default to:

```
{
		q: undefined,
		callback: undefined,
		geocode: undefined,
		lang: undefined,
		locale: undefined,
		page: undefined,
		result_type: "recent",
		rpp: 100,
		show_user: undefined,
		until: undefined,
		since_id: undefined,
		max_id: undefined,
		include_entities: true
}
```

All parameters are directly passed to Twitter's Search API, with the exception of `q`, which is first converted to "vine.co/v/ AND (`q`)".

So to search for the top-tweeted vines within 10 miles of central Denver:

```
var search = new Vine.Search({
	geocode: "39.730426,-104.927673,10mi",
	result_type: "popular"
});

search.fetch(function () {
	console.log(this.results);
}, function (jqXHR, textStatus, errorThrown) {
	console.log("ERROR:", textStatus);
});
``` 

(You can pass an error-handling function as the second parameter to `fetch` or as the third parameter to the `Search` constructor.)


## Thanks

Thanks to [Michael Keller](http://twitter.com/@mhkeller) and [Kate Ray](http://twitter.com/kraykray) for pseudo-goading me into this. They were joking; this is semi-serious.

## TODO

- Add tests.
- Add a `Search.fetchNext` method.
- Add package.json and npm module?
