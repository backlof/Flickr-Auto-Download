// ==UserScript==
// @name     Flickr Auto-Download
// @version  1
// @grant    none
// @include  https://www.flickr.com/photos/*
// @include  http://www.flickr.com/photos/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function () {

    console.log("test");

    setTimeout(function () {

        var url = window.location.href;

        if (/^https?:\/\/www\.flickr\.com\/photos\/([^\/]+)\/(\d+)\//.test(url)) {

            var htmlText = document.documentElement.innerHTML;

            var match = htmlText.match(/\.ClientApp\.init\(\{(.|\n)*?modelExport:((.|\n)*?)\,(\n|\s)*?auth/);

            var modelExportVm = JSON.parse(match[2]);

            if (!modelExportVm) {
                return;
            }

            var mainVm = modelExportVm.main;

            if (!mainVm) {
                return;
            }

            var photoModelsVm = mainVm["photo-models"];

            if (!photoModelsVm) {
                return;
            }

            if (photoModelsVm.length !== 1) {
                return;
            }

            var firstPhotoVm = photoModelsVm[0];

            if (!firstPhotoVm) {
                return;
            }

            var sizes = firstPhotoVm.sizes;

            if (!sizes) {
                return;
            }

            var original = sizes.o;

            if (!original) {
                return;
            }

            var downloadUrl = original.url;

            if (!downloadUrl) {
                return;
            }

            window.open(downloadUrl, "_self");
        }

    }, 1000);

});