(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var cachedAreaCoordsArray = [
    ["501,125,0", "84,1088,25", "226,1003,27", "335,972,24", "465,953,26", "572,921,26", "575,839,28", "480,766,26", "369,744,27", "246,728,28", "138,682,29", "165,601,27", "274,549,28", "375,495,29", "345,412,27", "239,382,31", "153,337,29", "153,262,29", "246,223,29", "343,207,29", "438,183,31", "498,123,34"],
];

function resizeMap() {
    function resizeAreaTag(cachedAreaCoords,idx){
        function scale(coord){
            var dimension = ( 1 === (isWidth = 1-isWidth) ? 'width' : 'height' );
            return Math.floor(Number(coord) * scallingFactor[dimension]);
        }

        var isWidth = 0;

        //areas[idx].coords = cachedAreaCoords.split(',').map(scale).join(',');
    }

    var scallingFactor = {
        width  : image.width  / image.naturalWidth,
        height : image.height / image.naturalHeight
    };

    cachedAreaCoordsArray.forEach(resizeAreaTag);
}

module.exports = {
    addStyleLink: resizeMap
};
},{}],2:[function(require,module,exports){
function Bridge() {
}

var eventHandlers = {};

// This is called directly from Java
window.handleMessage = function( type, msgPointer ) {
    var that = this;
    var payload = JSON.parse( marshaller.getPayload( msgPointer ) );
    if ( eventHandlers.hasOwnProperty( type ) ) {
        eventHandlers[type].forEach( function( callback ) {
            callback.call( that, payload );
        } );
    }
};

Bridge.prototype.registerListener = function( messageType, callback ) {
    if ( eventHandlers.hasOwnProperty( messageType ) ) {
        eventHandlers[messageType].push( callback );
    } else {
        eventHandlers[messageType] = [ callback ];
    }
};

Bridge.prototype.sendMessage = function( messageType, payload ) {
    var messagePack = { type: messageType, payload: payload };
    var ret = window.prompt( encodeURIComponent(JSON.stringify( messagePack )) );
    if ( ret ) {
        return JSON.parse( ret );
    }
};

module.exports = new Bridge();
// FIXME: Move this to somewhere else, eh?
window.onload = function() {
    module.exports.sendMessage( "DOMLoaded", {} );
};
},{}],3:[function(require,module,exports){
var bridge = require("./bridge");

function addStyleLink(href) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("charset", "UTF-8");
    link.setAttribute("href", href);
    document.getElementsByTagName("head")[0].appendChild(link);
}

bridge.registerListener("injectStyles", function (payload) {
    var style_paths = payload.style_paths;
    //alert("stylexxx" + style_paths);
    for (var i = 0; i < style_paths.length; i++) {
        addStyleLink(style_paths[i]);
    }
});

module.exports = {
    addStyleLink: addStyleLink
};
},{"./bridge":2}],4:[function(require,module,exports){
var bridge = require( "./bridge" );
var transformer = require("./transformer");

bridge.registerListener( "requestImagesList", function( payload ) {
    var imageURLs = [];
    var images = document.querySelectorAll( "img" );
    for ( var i = 0; i < images.length; i++ ) {
        if (images[i].width < payload.minsize || images[i].height < payload.minsize) {
            continue;
        }
        imageURLs.push( images[i].src );
    }
    bridge.sendMessage( "imagesListResponse", { "images": imageURLs });
} );

// reusing this function
function replaceImageSrc( payload ) {
    var images = document.querySelectorAll( "img[src='" + payload.originalURL + "']" );
    for ( var i = 0; i < images.length; i++ ) {
        var img = images[i];
        img.setAttribute( "src", payload.newURL );
        img.setAttribute( "data-old-src", payload.originalURL );
        img.removeAttribute( "srcset" );
    }
}
bridge.registerListener( "replaceImageSrc", replaceImageSrc );

bridge.registerListener( "replaceImageSources", function( payload ) {
    for ( var i = 0; i < payload.img_map.length; i++ ) {
        replaceImageSrc( payload.img_map[i] );
    }
} );

bridge.registerListener( "setPageProtected", function( payload ) {
    var el = document.getElementsByTagName( "html" )[0];
    if (!el.classList.contains("page-protected") && payload.protect) {
        el.classList.add("page-protected");
    }
    else if (el.classList.contains("page-protected") && !payload.protect) {
        el.classList.remove("page-protected");
    }
    if (!el.classList.contains("no-editing") && payload.noedit) {
        el.classList.add("no-editing");
    }
    else if (el.classList.contains("no-editing") && !payload.noedit) {
        el.classList.remove("no-editing");
    }
} );

bridge.registerListener( "setDecorOffset", function( payload ) {
    transformer.setDecorOffset(payload.offset);
} );

},{"./bridge":2,"./transformer":6}],5:[function(require,module,exports){
var bridge = require("./bridge");

function Tagya() {
}

bridge.registerListener("injectPlayerLevel", function (payload) {
    var levelNo = payload.levelNo;
    var hValue = getLevelHeight(levelNo);
    //setPlayer(levelNo, hValue);

    debugImage();
});

debugImage = function(){
    var image = document.getElementById("p1img");

    var scallingFactor = {
        width  : image.width  / image.naturalWidth,
        height : image.height / image.naturalHeight
    };

    scale(460,100);

};

function scale(coord){
    var dimension = ( 1 === (isWidth = 1-isWidth) ? 'width' : 'height' );
    return Math.floor(Number(coord) * scallingFactor[dimension]);
}

// 460,100
// 800,1280
setPlayer = function (levelNo, hValue) {
    var level = 'L' + levelNo;
    var p1pin = document.getElementById("p1pin");
    var coords = document.getElementById(level).getAttribute('coords');
    coords = coords.replace(" ", "");
    var arr = coords.split(",", 2);
    var left = arr[0] - (p1pin.width / 2);
    var top = (parseInt(hValue) + parseInt(arr[1])) - p1pin.height;

    alert("hvalue: " + hValue + "," + parseInt(hValue));
    //alert("left: " + left + "top: " + top);
    //var left = 100;
    //var top = 800;

    p1pin.style.left = left + 'px';
    p1pin.style.top = top + 'px';

    $('html, body').animate({
        scrollTop: top - (screen.height / 2)
    }, 2000);
};

getLevelHeight = function (levelNo) {
    var hValue = 0;

    var p1img = document.getElementById("p1img");
    var p2img = document.getElementById("p2img");
    var p3img = document.getElementById("p3img");
    var p4img = document.getElementById("p4img");
    var p5img = document.getElementById("p5img");
    var p6img = document.getElementById("p6img");
    var p7img = document.getElementById("p7img");

    if (levelNo >= 1 && levelNo <= 37) {
        hValue = p1img.height + p2img.height + p3img.height + p4img.height + p5img.height + p6img.height;
    }

    if (levelNo > 37 && levelNo <= 74) {
        hValue = p1img.height + p2img.height + p3img.height + p4img.height + p5img.height;
    }

    if (levelNo > 74 && levelNo <= 100) {
        hValue = p1img.height + p2img.height + p3img.height + p4img.height;
    }

    if (levelNo > 100 && levelNo <= 122) {
        hValue = p1img.height + p2img.height + p3img.height;
    }
    if (levelNo > 122 && levelNo <= 151) {
        hValue = p1img.height + p2img.height;
    }
    if (levelNo > 151 && levelNo <= 179) {
        hValue = p1img.height;
    }
    if (levelNo > 179 && levelNo <= 200) {
        hValue = 0;
    }
    return hValue;
};

module.exports = new Tagya();

},{"./bridge":2}],6:[function(require,module,exports){
function Transformer() {
}

var transforms = {};
var decorOffset = 0; // The height of the toolbar and, when translucent, status bar in CSS pixels.

Transformer.prototype.register = function( transform, fun ) {
    if ( transform in transforms ) {
        transforms[transform].push( fun );
    } else {
        transforms[transform] = [ fun ];
    }
};

Transformer.prototype.transform = function( transform, element ) {
    var functions = transforms[transform];
    for ( var i = 0; i < functions.length; i++ ) {
        element = functions[i](element);
    }
};

Transformer.prototype.getDecorOffset = function() {
    return decorOffset;
};

Transformer.prototype.setDecorOffset = function(offset) {
    decorOffset = offset;
};

module.exports = new Transformer();
},{}]},{},[2,4,5,3,6,1]);
