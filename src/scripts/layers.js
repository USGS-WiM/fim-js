/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

var floodExtentsMultiTableUrl = "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/floodExtentsMulti/MapServer/1";
var floodExtentsMultiThreeSitesTableUrl = "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/floodExtentsThreeSites/MapServer/1";
var fimHazusUrl = "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/sites/MapServer/2";

var fimiMoreInfoUrl = "https://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/fim_add_info/MapServer/1";
var ahpsForecastUrl = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/0";
var nwisUrl = "https://waterservices.usgs.gov/nwis/iv/?format=nwjson&period=P7D";//&parameterCd=00060,00065,62614,62615&sites=";
var proxyUrl = "https://services.wim.usgs.gov/proxies/httpProxy/Default.aspx?";

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

    var ahpsInfoTemplate = new InfoTemplate("Flood stage: ${status}", "<b>Location</b>:  ${location}<br/>" +
        "<b>Waterbody</b>: ${waterbody}<br/>" +
        "<b>Forecast</b>: ${forecast}<br/>" +
        "<b>Gage ID</b>: ${gaugelid}<br/>" +
        "<b>Date/Time</b>: ${fcsttime}<br/>" +
        "<b>URL</b>: <a target='_blank' href='${url}'>Click here for more info</a><br/>");

    allLayers = [
        {
            "groupHeading": "available layers",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "FIM Sites": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "(Public = 1 OR Public = 2) AND (MULTI_SITE = 0 OR MULTI_SITE = 1 OR MULTI_SITE = 3)",
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
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/floodExtents/MapServer",
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
                "Flood-inundation area - two sites": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/floodExtentsMulti/MapServer",
                    "options": {
                        "id": "fimExtentsMulti",
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
                "Flood-inundation area - three sites": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/floodExtentsThreeSites/MapServer",
                    "options": {
                        "id": "fimExtentsThreeSites",
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
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/breach/MapServer",
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
                "Area of uncertainty (where applicable, two sites)": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/breachMulti/MapServer",
                    "options": {
                        "id": "fimBreachMulti",
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
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/suppLyrs/MapServer",
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
                "FIM sites for print": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMPrint/fimPrintTest/MapServer",
                    "options": {
                        "id": "fimSitesPrint",
                        "visibleLayers": [0],
                        "opacity": 1.0,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "layerDefinitions": ["(Public = 1) AND (MULTI_SITE = 0 OR MULTI_SITE = 1 OR MULTI_SITE = 3)"],
                        "includeLegend" : false,
                        "legendLabel": false
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
                        "includeLegend" : true,
                        "legendLabel": false,
                        "legendPlacement": 0,
                        "layerDefinitions": {1: "prod_type LIKE '%Flood%'"}
                    }
                },
                "Depth grids": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/grids_1/MapServer",
                    "options": {
                        "id": "fimGrid1",
                        "opacity": 0.7,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : false,
                        "legendLabel" : false
                    }
                },
                "Depth grids ": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/grids_2/MapServer",
                    "options": {
                        "id": "fimGrid2",
                        "opacity": 0.7,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : false,
                        "legendLabel" : false
                    }
                },
                "Depth grids  ": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/grids_3/MapServer",
                    "options": {
                        "id": "fimGrid3",
                        "opacity": 0.7,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : false,
                        "legendLabel" : false
                    }
                },
                "Depth grids   ": {
                    "url" : "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/grids_4/MapServer",
                    "options": {
                        "id": "fimGrid4",
                        "opacity": 0.7,
                        "visible": false
                    },
                    "wimOptions": {//
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : false,
                        "legendLabel" : false
                    }
                }
            }
        },
        {
            'groupHeading': 'AHPS Forecast Sites',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'moreinfo': "https://www.fws.gov/wetlands/Documents/Scalable-Wetland-Mapping-Fact-Sheet.pdf",
            'otherLayersToggled': ['major','moderate','minor','near','noflood','obs'],
            'layers': {
                "AHPS Forecast Sites": {
                    "url" : "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",
                    "visibleLayers": [-1],
                    "options": {
                        "id": "ahpsSites",
                        "opacity": 1.0,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend" : true,
                        'layerIndex': -1,
                        'otherLayersToggled': ['major','moderate','minor','near','noflood']
                    }
                },
                'Major flooding':{
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/1',
                    'options':{
                        'id': 'major',
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["location","waterbody","forecast","gaugelid","fcsttime","url"],
                        'opacity': 0.6,
                        'infoTemplate': ahpsInfoTemplate,
                        'visible': false,
                        'definitionExpression': "status = 'major'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        'includeInLayerList': true,
                        'layerIndex': 0,
                        'includeLegend': false
                    }
                },
                'Moderate flooding': {
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/1',
                    'options':{
                        'id': 'moderate',
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["location","waterbody","forecast","gaugelid","fcsttime","url"],
                        'opacity': 0.6,
                        'infoTemplate': ahpsInfoTemplate,
                        'visible': false,
                        'definitionExpression': "status = 'moderate'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        'includeInLayerList': true,
                        'layerIndex': 0,
                        'includeLegend' : false
                    }
                },
                'Minor flooding': {
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/1',
                    'options':{
                        'id': 'minor',
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["location","waterbody","forecast","gaugelid","fcsttime","url"],
                        'opacity': 0.6,
                        'infoTemplate': ahpsInfoTemplate,
                        'visible': false,
                        'definitionExpression': "status = 'minor'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        'includeInLayerList': true,
                        'layerIndex': 0,
                        'includeLegend' : false
                    }
                },
                'Near flood': {
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/1',
                    'options':{
                        'id': 'near',
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["location","waterbody","forecast","gaugelid","fcsttime","url"],
                        'opacity': 0.6,
                        'infoTemplate': ahpsInfoTemplate,
                        'visible': false,
                        'definitionExpression': "status = 'action'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        'includeInLayerList': true,
                        'layerIndex': 0,
                        'includeLegend' : false
                    }
                },
                'No flooding': {
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/1',
                    'options':{
                        'id': 'noflood',
                        "mode": FeatureLayer.MODE_ONDEMAND,
                        "outFields": ["location","waterbody","forecast","gaugelid","fcsttime","url"],
                        'opacity': 0.6,
                        'infoTemplate': ahpsInfoTemplate,
                        'visible': false,
                        'definitionExpression': "status = 'no_flooding'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'opacity': 1.00,
                        'mode': FeatureLayer.MODE_SNAPSHOT,
                        'outFields': ["*"],
                        'includeInLayerList': true,
                        'layerIndex': 0,
                        'includeLegend' : false
                    }
                }/*,
                'observation > 24 hrs old': {
                    'url' : 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer',
                    'visibleLayers': [0],
                    'options':{
                        'id': 'obs',
                        'opacity': 0.6,
                        'visible': false,
                        'mode': FeatureLayer.MODE_SNAPSHOT,
                        'definitionExpression': "status = 'out_of_service'"
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'mode': FeatureLayer.MODE_SNAPSHOT,
                        'includeInLayerList': true,
                        'includeLegend' : true,
                        'mode': FeatureLayer.MODE_SNAPSHOT,
                        'otherLayersToggled': ['major','moderate','minor','near','noflood']
                    }
                }*/
            }
        }
    ]

});





