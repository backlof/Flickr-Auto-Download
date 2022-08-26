// ==UserScript==
// @name     Flickr Auto-Download
// @version  1
// @grant    none
// @include  https://www.flickr.com/photos/*
// @include  http://www.flickr.com/photos/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(() => {

	setTimeout(() => {

		if (/^https?:\/\/www\.flickr\.com\/photos\/([^\/]+)\/(\d+)\//.test(window.location.href)) {

			var htmlText = document.documentElement.innerHTML;

			var match = htmlText.match(/\.ClientApp\.init\(\{(.|\n)*?modelExport:((.|\n)*?)\,(\n|\s)*?auth/);

			var modelExportVm = JSON.parse(match[2]);

			var sizesObject = modelExportVm?.main?.["photo-models"]?.[0]?.sizes;

			console.log(sizesObject);

			var urlsOrderedBySize = Object.getOwnPropertyNames(sizesObject)
				.map(n => sizesObject[n])
				.sort((p1, p2) => p1.width * p1.height > p2.width * p2.height ? -1 : 1)
				.map(p => p.url);

			window.open(urlsOrderedBySize[0], "_self");
		}

	}, 3000);

});
