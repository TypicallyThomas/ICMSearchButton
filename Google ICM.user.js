// ==UserScript==
// @name         Google ICM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to Google Video Search movies
// @author       Thomas Bunink
// @match        *.icheckmovies.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=icheckmovies.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function createSearchLink(title) {
        // Add params to URL
        var url = new URL("https://www.google.com/search");
        url.searchParams.set("q", title);
        url.searchParams.set("tbm", "vid");
        url.searchParams.set("tbs", "durREPLACEMEl");
        url.searchParams.set("dpr", "1");
        url = url.toString().replace("REPLACEME", ":");
        return url;
    }

    function addSearchButtonToElement(element, title) {
        // Add a button to input element
        let optionListMenu = element.querySelector("ul.optionIconMenu");
        if (optionListMenu != null) {
            let newOptionListItem = document.createElement("li");
            let newOptionItem = document.createElement("a");
            newOptionItem.classList.add("external", "optionIcon");
            newOptionItem.href = createSearchLink(title);
            newOptionItem.title = `Search ${title} on Google Video`;
            newOptionListItem.appendChild(newOptionItem);
            optionListMenu.appendChild(newOptionListItem);
        }
        else {
            console.log("Failed to find optionListMenu")
        }

    }

    window.onload = function () {
        if (window.location.href.match(/.+\.com\/movies\/.+/i) != null) {
            let title = document.querySelector("h1").innerHTML;
            let movieElement = document.querySelector(".movie");
            addSearchButtonToElement(movieElement, title);
        } else if (window.location.href.match(/.+\.com\/movies\/$|.+\.com\/lists\/.+/i) != null) {
            let listOfMovieElements = document.querySelectorAll("li.listItemMovie");
            for (let movieElement of listOfMovieElements) {
                let title = movieElement.querySelector("h2 > a").innerHTML;
                let year = movieElement.querySelector("span.info > a").innerHTML;
                title = `${title} (${year})`;

                addSearchButtonToElement(movieElement, title);
            }
        }
    }
})();
