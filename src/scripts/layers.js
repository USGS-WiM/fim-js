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
                    "url" : "http://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_ONDEMAND,
                        "outFields": ["*"],
                        "definitionExpression": "Public = 1",
                        //"infoTemplate": fimInfoTemplate,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : false
                    }
                },
                "Flood-inundation area": {
                    "url" : "http://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtents/MapServer",
                    "options": {
                        "id": "fimExtents",
                        "opacity": 0.75,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "Area of uncertainty (where applicable)": {
                    "url" : "http://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/breach/MapServer",
                    "options": {
                        "id": "fimBreach",
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
                },
                "Supplemental layers": {
                    "url" : "http://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/suppLyrs/MapServer",
                    "options": {
                        "id": "fimSuppLyrs",
                        "opacity": 1.0,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "National Weather Service Radar": {
                    "url" : "http://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
                    "options": {
                        "id": "nwsRadar",
                        "opacity": 0.65,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : false
                    }
                },
                "Flood Watches and Warnings": {
                    "url" : "http://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",
                    "visibleLayers": [1],
                    "options": {
                        "id": "floodWatchWarn",
                        "opacity": 0.65,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "AHPS Forecast Sites": {
                    "url" : "http://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",
                    "visibleLayers": [0],
                    "options": {
                        "id": "ahpsSites",
                        "opacity": 0.65,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true
                    }
                },
                "USGS FIM Sites (NWS forecast category)": {
                    "url" : "http://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/fimi_sites_for_legend/MapServer",
                    "options": {
                        "id": "fimSitesLegend",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true,
                        "layerIndex": 0
                    }
                }
            }
        }
    ]

});





