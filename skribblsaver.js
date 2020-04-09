// ==UserScript==
// @name           Skribbl Saver
// @namespace      https://github.com/Andrusowski/skribblsaver
// @version        0.1
// @description    Copies the drawing to clipboard after each round ends
// @description:de Kopiert am Ende jeder Runde die Zeichnung in die Zwischenablage
// @author         Andrusowski
// @license        MIT
// @copyright      2020, Andrusowski (https://github.com/Andrusowski)
// @match          https://www.skribbl.io/*
// @match          https://skribbl.io/*
// @match          http://www.skribbl.io/*
// @match          http://skribbl.io/*
// @grant          GM_setValue
// @grant          GM_getValue
// @updateURL      https://raw.githubusercontent.com/Andrusowski/skribblsaver/master/skribblsaver.js
// @downloadURL    https://raw.githubusercontent.com/Andrusowski/skribblsaver/master/skribblsaver.js
// @supportURL     https://github.com/Andrusowski/skribblsaver/issues
// ==/UserScript==

(function() {
    'use strict';

    console.log("Skribbl Saver v" + GM_info.script.version + " - " + GM_info.script.namespace);
    GM_setValue("roundStarted", false);

    setInterval(function(){
        var roundStarted = false;

        if (roundFinished() === true){
            if (GM_getValue("roundStarted") === true) {
                copyDrawing();
            }

            GM_setValue("roundStarted", false);
        }
        else{
            GM_setValue("roundStarted", true);
        }
    }, 500);

    function copyDrawing() {
        var canvas = document.getElementById("canvasGame");
        canvas.toBlob((blob) => {
            let data = null;

            // Chrome
            if (ClipboardItem === "undefined") {
                data = new DataTransfer();
                data.items.add(blob, "image/png");
            }
            // Firefox, etc.
            else {
                data = [new ClipboardItem({
                    [blob.type]: blob
                })];
            }

            navigator.clipboard.write(data).then(
                () => {},
                (error) => {
                console.error(error);
            });
        });
    }

    function roundFinished() {
        if (document.getElementById("overlay").style.display === "none") {
            return false;
        }

        return true;
    }
})();
