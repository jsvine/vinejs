# vine.js

... by @jsvine. Somewhere between a total joke and a perhaps-useful library for fetching Vine.co videos.

Because Vine.co doesn't currently have an API, vine.js searches the Twitter API for recent vines, and then parses the results into a handy format.


## Usage

Vine.js should work in both the browser and Node.js. In both cases, the library depends on jQuery.

In the browser:

```
<script src="vine.js"></script>
```

In Node.js:

```
var VineJS = require("./vine.js");
```

And then, to use in either:

```
var search = new VineJS.Search("#cats");
var search.fetch(function () {
	console.log(this.results);
});
``` 

You can also use the shorthand:

```
var search = new VineJS.Search("#cats", function () {
	console.log(this.results);
});
```

## Thanks

Thanks to Michael Keller (@mhkeller) and Kate Ray (@kraykray), who independently both suggested I make this library. They were joking; this is semi-serious.