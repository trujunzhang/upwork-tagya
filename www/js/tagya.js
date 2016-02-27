var bridge = require("./bridge");
var factory = require("./imageMapResizer");
var mapCoordsResizer = require("./MapCoordsResizer");

function Tagya() {
}

bridge.registerListener("injectPlayerLevel", function (payload) {
    var levelNo = payload.levelNo;
    var hValue = getLevelHeight(levelNo);
    setPlayer(levelNo, hValue);

    //debugImage();
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

    mapCoordsResizer.scaleImageMap();

    var message = document.getElementsByTagName('html')[0].innerHTML;
    console.log(message);
    //alert(message);

    var level = 'L' + levelNo;
    var p1pin = document.getElementById("p1pin");
    var coords = document.getElementById(level).getAttribute('coords');
    coords = coords.replace(" ", "");
    var arr = coords.split(",", 2);
    var left = arr[0] - (p1pin.width / 2);
    var top = (parseInt(hValue) + parseInt(arr[1])) - p1pin.height;

    //alert("hvalue: " + hValue + "," + parseInt(hValue));
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
