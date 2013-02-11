(function ($) {
	var root = this;
	var previousVine = root.Vine;

	var Vine = {
		VERSION: "0.0.1"
	};

	var VINE_PATH = "vine.co/v/";
	var TWITTER_ENDPOINT = "http://search.twitter.com/search.json";

	// Defaults based on Twitter's search API.
	// https://dev.twitter.com/docs/api/1/get/search
	var DEFAULTS = {
		q: VINE_PATH,
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
	};

	// Result constructor for storing and parsing Twitter data
	var Result = function (raw) {
		this.raw = raw;	
	};

	Result.prototype  = {
		parse: function () {
			var raw = this.raw;
			var vine_url = $.map(raw.entities.urls, function (url) {
				return url.expanded_url.split("//")[1].indexOf("vine.co/v/") > -1 ? url : null;
			})[0];
			if (!vine_url) { return null; }
			this.url = vine_url.expanded_url;
			this.card = this.url + "/card";
			this.tweet = {
				user: raw.from_user,
				user_name: raw.from_user_name,
				text: raw.text,
				created_at: raw.created_at
			};
			return this;
		}
	};

	// Main search-via-Twitter constructor
	var Search = function (opts, success, error) {
		this.opts = opts;

		// If opts is passed as a string, just query that string.
		// Else set opts to itself or an empty object.
		opts = toString.call(opts) == "[object String]" ? { q: opts } : (opts || {});

		// If we're searching for something -- i.e., not just the latest vines -- add the Vine path to our query.
		if (opts.q !== undefined) {
			opts.q = VINE_PATH + " AND (" + opts.q + ")";	
		}

		// Construct search parameters from defaults and custom options.
		this.search_params = $.extend({}, DEFAULTS, opts);
		if (success) {
			this.fetch(success, error);
		}
		return this;
	};

	Search.prototype = {
		fetch: function (success, error) {
			var _this = this;

			var use_jsonp = root.location ? true : false;
			// Request JSON from Twitter API
			$.getJSON(TWITTER_ENDPOINT + (use_jsonp ? "?callback=?" : ""), this.search_params)
				// Create results objects and pass them to the success function.
				.success(function (data) {
					_this.raw = data;
					// Note: $.map auto-compacts null/undefined array elements. So if Result.parse returns null -- which it does if it can't find a vine.co/v/ URL in a tweet -- then this.results will be shorter than this.raw.results.
					_this.results = $.map(data.results, function (result) {
						return new Result(result).parse();
					});
					success.call(_this);
				})
				.error(error);
			return this;
		}
	};

	// Attach Result and Search constructors to the main namespace.
	Vine.Result = Result;
	Vine.Search = Search;

	// noConflict method reverts the global `Vine` variable to its previous state and returns a reference to `Vine`, to be assigned to another variable.
	Vine.noConflict = function () {
		root.Vine = previousVine;
		return Vine;
	};

	// Export Vine for either Node.js or the browser.
	// Code borrowed from underscore.js
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Vine;
		}
		exports.Vine = Vine;
	} else {
		root.Vine = Vine;
	}
}).call(this, this.jQuery || require("jquery"));
