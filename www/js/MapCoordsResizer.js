function scaleImageMap(){

    function resizeMap() {
        function resizeAreaTag(cachedAreaCoords,idx){
            function scale(coord){
                var dimension = ( 1 === (isWidth = 1-isWidth) ? 'width' : 'height' );
                return Math.floor(Number(coord) * scallingFactor[dimension]);
            }

            var isWidth = 0;

            areas[idx].coords = cachedAreaCoords.split(',').map(scale).join(',');
        }

        var scallingFactor = {
            width  : image.width  / image.naturalWidth,
            height : image.height / image.naturalHeight
        };

        cachedAreaCoordsArray.forEach(resizeAreaTag);
    }

    function getCoords(e){
        //Normalize coord-string to csv format without any space chars
        return e.coords.replace(/ *, */g,',').replace(/ +/g,',');
    }

    function debounce() {
        clearTimeout(timer);
        timer = setTimeout(resizeMap, 250);
    }

    function start(){
        if ((image.width !== image.naturalWidth) || (image.height !== image.naturalHeight)) {
            resizeMap();
        }
    }

    //function addEventListeners(){
    //    image.addEventListener('onload',  resizeMap, false); //Detect late image loads in IE11
    //    window.addEventListener('focus',  resizeMap, false); //Cope with window being resized whilst on another tab
    //    window.addEventListener('resize', debounce,  false);
    //    document.addEventListener('fullscreenchange', resizeMap,  false);
    //}

    function beenHere(){
        return ('function' === typeof map._resize);
    }

    function setup(){
        areas                 = map.getElementsByTagName('area');
        cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords);
        image                 = document.querySelector('img[usemap="#'+map.name+'"]');
        map._resize           = resizeMap; //Bind resize method to HTML map element
    }

    var
    /*jshint validthis:true */
        map   = this,
        areas = null, cachedAreaCoordsArray = null, image = null, timer = null;

    if (!beenHere()){
        setup();
        console.log("areas's length: "+areas.length);
        //addEventListeners();
        start();
    } else {
        map._resize(); //Already setup, so just resize map
    }
}

function getCurrentImage(){
    return "getCurrentImage for djzhang";
}

module.exports = {
    scaleImageMap: scaleImageMap,
    getCurrentImage: getCurrentImage
};