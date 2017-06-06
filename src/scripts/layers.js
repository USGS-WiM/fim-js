/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/InfoTemplate",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/symbols/PictureMarkerSymbol",
    'dojo/domReady!'
], function(
    Extent,
    InfoTemplate,
    WMSLayerInfo,
    FeatureLayer,
    UniqueValueRenderer,
    PictureMarkerSymbol
) {

    //var fimInfoTemplate = new InfoTemplate("${SITE_NO}", "Community:  ${COMMUNITY}");

    allLayers = [
        {
            "groupHeading": "available layers",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "FIM Sites": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "Public = 1 AND MULTI_SITE = 0",
                        //"infoTemplate": fimInfoTemplate,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "includeLegend" : false//,
                        //"renderer": sitesRenderer
                    }
                },
                "Flood-inundation area": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtents/MapServer",
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
                        "includeLegend" : true,
                        "legendLabel": false
                    }
                },
                "Area of uncertainty (where applicable)": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/breach/MapServer",
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
                        "includeLegend" : true,
                        "legendLabel": false
                    }
                },
                "Supplemental layers": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/suppLyrs/MapServer",
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
                    "url" : "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
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
                    "url" : "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",
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
                        "includeLegend" : false,
                        "legendLabel": false,
                        "layerDefinitions": {1: "prod_type LIKE '%Flood%'"}
                    }
                },
                "AHPS Forecast Sites": {
                    "url" : "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",
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
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/fimi_sites_for_legend/MapServer",
                    "options": {
                        "id": "fimSitesLegend",
                        "opacity": 0.0,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true,
                        //"layerIndex": 0,
                        "legendLabel": false
                    }
                },
                "grids1": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_1/MapServer",
                    "options": {
                        "id": "fimGrid1",
                        "opacity": 1.0,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                },
                "grids2": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_2/MapServer",
                    "options": {
                        "id": "fimGrid2",
                        "opacity": 0.0,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                },
                "grids3": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_3/MapServer",
                    "options": {
                        "id": "fimGrid3",
                        "opacity": 0.0,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                }//http://gis.wim.usgs.gov/ArcGIS/rest/services/FIMTest/grids_1_test/MapServer*/
            }
        }
    ]

});





