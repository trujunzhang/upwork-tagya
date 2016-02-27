
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

function getCurrentImage(){
    return "getCurrentImage for djzhang";
}

module.exports = {
    addStyleLink: resizeMap,
    getCurrentImage: getCurrentImage
};