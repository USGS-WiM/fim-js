/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

var floodExtentsMultiTableUrl = "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtentsMulti/MapServer/1";
var fimHazusUrl = "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/2";

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
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 1.00,
                        "mode": FeatureLayer.MODE_SNAPSHOT,
                        "outFields": ["*"],
                        "definitionExpression": "Public = 1 OR Public = 0 AND (MULTI_SITE = 0 OR MULTI_SITE = 1)",
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
                "Flood-inundation area - two sites": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtentsMulti/MapServer",
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
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtentsThreeSites/MapServer",
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
                "Area of uncertainty (where applicable, two sites)": {
                    "url" : "https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/breachMulti/MapServer",
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
                        "includeLegend" : true,
                        "legendLabel": false,
                        "legendPlacement": 0,
                        "layerDefinitions": {1: "prod_type LIKE '%Flood%'"}
                    }
                },
                /*"USGS FIM Sites (NWS forecast category)": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/fimi_sites_for_legend/MapServer",
                    "options": {
                        "id": "fimSitesLegend",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": false,
                        "includeLegend" : true,
                        "layerIndex": 0,
                        "legendLabel": false
                    }
                },*/
                "grids1": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_1/MapServer",
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
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                },
                "grids2": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_2/MapServer",
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
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                },
                "grids3": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_3/MapServer",
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
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                },
                "grids4": {
                    "url" : "https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_4/MapServer",
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
                        "includeLegend" : true
                        //"legendLabel": false
                    }
                }//http://gis.wim.usgs.gov/ArcGIS/rest/services/FIMTest/grids_1_test/MapServer*/
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
                        'includeLegend': true,
                        'legendTitle': 'AHPS Forecast Sites',
                        'legendPlacement': 1
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





