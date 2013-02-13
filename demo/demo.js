/*jshint evil:true*/
(function () {
	var $main = $("#main");

	$main.find(".example .go").click(function (e) {
		var $example = $(this.parentNode);
		var $results = $example.find(".results");
		$results.hide();
		var search_code = $example.find(".code").html();
		var search = new Function([], search_code + " return search;")();
		var onSuccess = function () {
			if (this.results.length) {
				var urls_found = [];
				var unique_results = $.map(this.results, function (r) {
					if (urls_found.indexOf(r.url) > -1) {
						return null;	
					} else {
						urls_found.push(r.url);
						return r;	
					}
				});
				var $iframes = $.map(unique_results.slice(0,3), function (r) {
					return $("<iframe src='" + r.card + "'></iframe>");
				});
				$results.html($iframes);
			} else {
				$results.html("<div class='error'>No vines found.</div>");	
			}
			$results.show();
		};
		var onError = function (e) {
			$results.html("<div class='error'>Error searching Twitter.</div>");
			$results.show();
			console.log(e);	
		};
		search.fetch(onSuccess, onError);
	});
}).call(this);
