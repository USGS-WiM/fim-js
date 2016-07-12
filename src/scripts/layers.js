/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/InfoTemplate",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    InfoTemplate,
    WMSLayerInfo,
    FeatureLayer
) {

    var fimInfoTemplate = new InfoTemplate("${SITE_NO}", "Community:  ${COMMUNITY}");

    allLayers = [
        {
            "groupHeading": "available layers",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "FIM Sites": {
                    "url" : "http://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 0.75,
                        "mode": FeatureLayer.MODE_ONDEMAND,
                        "outFields": ["*"],
                        "definitionExpression": "Public = 1",
                        ////"infoTemplate": fimInfoTemplate,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "FIM flood extents": {
                    "url" : "http://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtents/MapServer",
                    "options": {
                        "id": "fimExtents",
                        "opacity": 0.35,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                }
            }
        }
    ]

});





