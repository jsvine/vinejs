(function () {
	var root = this;

	var VineJS = {
		VERSION: 0.0.1	
	};

	var VINE_PATH = "vine.co/v/";

	// Defaults based on Twitter's search API.
	// https://dev.twitter.com/docs/api/1.1/get/search/tweets
	var DEFAULTS = {
		q: VINE_PATH,
		geocode: undefined,
		lang: undefined,
		locale: undefined,
		result_type: "recent",
		count: 100,
		until: undefined,
		since_id: undefined,
		max_id: undefined,
		include_entities: true,
		callback: undefined
	};

	// Helper function
	var _extend = function (obj) {
		var rest = Array.prototype.slice.call(arguments, 1);
		var source;
		for (var i = 0; i < rest.length; i++) {
			source = rest[i];
			for (var prop in source) {
				obj[prop] = source[prop];
			}
		}
		return obj;
	};

	// Main search-via-Twitter constructor
	var Search = function (opts) {
		this.search_params = _extend({}, DEFAULTS, opts);
	};

	VineJS.Search = Search;

	root.VineJS = VineJS;
}).call(this);
