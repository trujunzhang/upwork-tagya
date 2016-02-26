
var cachedAreaCoordsArray;

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

module.exports = {
    addStyleLink: resizeMap
};