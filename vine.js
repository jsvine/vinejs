(function ($) {
	var root = this;

	var VineJS = {
		VERSION: "0.0.1"
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

	// Main search-via-Twitter constructor
	var Search = function (opts, callback) {
		this.search_params = $.extend({}, DEFAULTS, opts);
	};

	VineJS.Search = Search;

	// Export VineJS for either Node.js or the browser.
	// Code borrowed from underscore.js
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = VineJS;
		}
		exports.VineJS = VineJS;
	} else {
		root.VineJS = VineJS;
	}
}).call(this, jQuery);
