// ==UserScript==
// @name         Wikipedia Dark Theme
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Auto Enable Wikipedia Dark Theme
// @author       Hansaplast
// @match        *://*.wikipedia.org/*
// @match        *://*.mediawiki.org/*
// @match        *://*.wikidata.org/*
// @match        *://*.wikisource.org/*
// @icon         https://en.wikipedia.org/static/favicon/wikipedia.ico
// @run-at       document-idle
// @license      GPL3
// @downloadURL  https://github.com/hansaplasst/wikipedia-dark-theme/raw/refs/heads/main/wikipedia-dark-theme.user.js
// @updateURL    https://github.com/hansaplasst/wikipedia-dark-theme/raw/refs/heads/main/wikipedia-dark-theme.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const automaticSelector =
        'input[name="skin-client-pref-skin-theme-group"][value="night"]';

    const hideSelector =
        'button[aria-label="Hide Appearance"]';

    let automaticClicked = false;
    let attempts = 0;
    const maxAttempts = 100;

    const timer = setInterval(() => {
        attempts++;

        // Select the Dark Theme
        if (!automaticClicked) {
            const automatic = document.querySelector(automaticSelector);

            if (automatic) {
                if (!automatic.checked) {
                    automatic.click();
                    console.log('Wikipedia: Automatic Theme Selected.');
                }

                automaticClicked = true;
            }
        }

        // Hide Appearance menu
        if (automaticClicked) {
            const hideButton = document.querySelector(hideSelector);

            if (hideButton) {
                hideButton.click();
                console.log('Wikipedia: Hide Appearance menu');
                clearInterval(timer);
            }
        }

        if (attempts >= maxAttempts) {
            clearInterval(timer);
            console.log('Wikipedia: reached timeout.');
        }
    }, 100);
})();
