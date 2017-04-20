//for jshint
'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 *///

var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var dragInfoWindows = false;
var defaultMapCenter = [-95.6, 38.6];

var siteAttr;

var results;

var fimiMoreInfoUrl = "http://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/fim_add_info/MapServer/1";
var ahpsForecastUrl = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/0";
var nwisUrl = "https://waterservices.usgs.gov/nwis/iv/?format=nwjson&period=P7D&parameterCd=00065&sites=";
var proxyUrl = "https://services.wim.usgs.gov/proxies/httpProxy/Default.aspx?";

var gridInfos = [];
var grid1Infos;
var grid2Infos;
var grid3Infos;
var gridLayerIndex;
var gridLayerIndexArrColl = [];


require([
    'esri/arcgis/utils',
    'esri/map',
    'esri/dijit/HomeButton',
    'esri/dijit/LocateButton',
    'esri/dijit/Geocoder',
    'esri/dijit/PopupTemplate',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    'esri/geometry/webMercatorUtils',
    'esri/graphic',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/renderers/UniqueValueRenderer',
    'esri/symbols/PictureMarkerSymbol',
    'esri/tasks/IdentifyParameters',
    'esri/tasks/IdentifyTask',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/on',
    'dojo/domReady!'
], function (
    arcgisUtils,
    Map,
    HomeButton,
    LocateButton,
    Geocoder,
    PopupTemplate,
    Multipoint,
    Point,
    webMercatorUtils,
    Graphic,
    ArcGISTiledMapServiceLayer,
    UniqueValueRenderer,
    PictureMarkerSymbol,
    IdentifyParameters,
    IdentifyTask,
    esriQuery,
    QueryTask,
    Moveable,
    query,
    dom,
    domClass,
    on
) {

    //bring this line back after experiment////////////////////////////
    ////allLayers = mapLayers;


    var lods = [
        {"level" : 0, "resolution" : 156543.03392800014, "scale" : 591657527.591555},
        {"level" : 1, "resolution" : 78271.51696399994, "scale" : 295828763.795777},
        {"level" : 2, "resolution" : 39135.75848200009, "scale" : 147914381.897889},
        {"level" : 3, "resolution" : 19567.87924099992, "scale" : 73957190.948944},
        {"level" : 4, "resolution" : 9783.93962049996, "scale" : 36978595.474472},
        {"level" : 5, "resolution" : 4891.96981024998, "scale" : 18489297.737236},
        {"level" : 6, "resolution" : 2445.98490512499, "scale" : 9244648.868618},
        {"level" : 7, "resolution" : 1222.992452562495, "scale" : 4622324.434309},
        {"level" : 8, "resolution" : 611.4962262813797, "scale" : 2311162.217155},
        {"level" : 9, "resolution" : 305.74811314055756, "scale" : 1155581.108577},
        {"level" : 10, "resolution" : 152.87405657041106, "scale" : 577790.554289},
        {"level" : 11, "resolution" : 76.43702828507324, "scale" : 288895.277144},
        {"level" : 12, "resolution" : 38.21851414253662, "scale" : 144447.638572},
        {"level" : 13, "resolution" : 19.10925707126831, "scale" : 72223.819286},
        {"level" : 14, "resolution" : 9.554628535634155, "scale" : 36111.909643},
        {"level" : 15, "resolution" : 4.77731426794937, "scale" : 18055.954822},
        {"level" : 16, "resolution" : 2.388657133974685, "scale" : 9027.977411},
        {"level" : 17, "resolution" : 1.1943285668550503, "scale" : 4513.988705}
    ];

    map = Map('mapDiv', {
        basemap: 'gray',
        //center: [-95.6, 38.6],
        center: defaultMapCenter,
        logo: false,
        lods: lods,
        zoom: 5
    });
    //button for returning to initial extent
    var home = new HomeButton({
        map: map
    }, "homeButton");
    home.startup();
    //button for finding and zooming to user's location
    var locate = new LocateButton({
        map: map
    }, "locateButton");
    locate.startup();

    //following block forces map size to override problems with default behavior
    $(window).resize(function () {
        if ($("#legendCollapse").hasClass('in')) {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('height', maxLegendHeight);
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        }
        else {
            $('#legendElement').css('height', 'initial');
        }
    });

    //displays map scale on map load
    on(map, "load", function() {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
        var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(initMapCenter.y.toFixed(3));
        $('#longitude').html(initMapCenter.x.toFixed(3));

        //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
        if (dragInfoWindows == true) {
            var handle = query(".title", map.infoWindow.domNode)[0];
            var dnd = new Moveable(map.infoWindow.domNode, {
                handle: handle
            });

            // when the infoWindow is moved, hide the arrow:
            on(dnd, 'FirstMove', function() {
                // hide pointer and outerpointer (used depending on where the pointer is shown)
                var arrowNode =  query(".outerPointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");

                var arrowNode =  query(".pointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");
            }.bind(this));
        }
        map.infoWindow.set('highlight', true);
    });

    //displays map scale on scale change (i.e. zoom level)
    on(map, "zoom-end", function () {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
    });

    //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
    on(map, "mouse-move", function (cursorPosition) {
        $('#mapCenterLabel').css("display", "none");
        if (cursorPosition.mapPoint != null) {
            var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
            $('#latitude').html(geographicMapPt.y.toFixed(3));
            $('#longitude').html(geographicMapPt.x.toFixed(3));
        }
    });
    //updates lat/lng indicator to map center after pan and shows "map center" label.
    on(map, "pan-end", function () {
        //displays latitude and longitude of map center
        $('#mapCenterLabel').css("display", "inline");
        var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(geographicMapCenter.y.toFixed(3));
        $('#longitude').html(geographicMapCenter.x.toFixed(3));
    });

    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
    //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
    on(dom.byId('btnStreets'), 'click', function () {
        map.setBasemap('streets');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnSatellite'), 'click', function () {
        map.setBasemap('satellite');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnHybrid'), 'click', function () {
        map.setBasemap('hybrid');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTerrain'), 'click', function () {
        map.setBasemap('terrain');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnGray'), 'click', function () {
        map.setBasemap('gray');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnNatGeo'), 'click', function () {
        map.setBasemap('national-geographic');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnOSM'), 'click', function () {
        map.setBasemap('osm');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTopo'), 'click', function () {
        map.setBasemap('topo');
        map.removeLayer(nationalMapBasemap);
    });

    on(dom.byId('btnNatlMap'), 'click', function () {
        map.addLayer(nationalMapBasemap);
    });


    //end code for adding draggability to infoWindow

    /*on(map, "click", function(evt) {
        var graphic = new Graphic();

        var feature = graphic;

        var template = new esri.InfoTemplate("test popup",
            "attributes and stuff go here");

        //ties the above defined InfoTemplate to the feature result returned from a click event

        feature.setInfoTemplate(template);

        map.infoWindow.setFeatures([feature]);
        map.infoWindow.show(evt.mapPoint);

        map.infoWindow.show();
    });*/

    // Using Lobipanel: https://github.com/arboshiki/lobipanel
    $("#floodToolsDiv").lobiPanel({
        unpin: false,
        reload: false,
        minimize: false,
        close: false,
        expand: false,
        editTitle: false,
        maxWidth: 800,
        maxHeight: 500
    });

    $("#floodToolsDiv .dropdown").prepend("<div id='floodClose' title='close'><b>X</b></div>");
    $("#floodToolsDiv .dropdown").prepend("<div id='floodMin' title='collapse'><b>_</b></div>");

    $("#floodMin").click(function(){
        $("#floodToolsDiv").css("visibility", "hidden");
        //map.getLayer("fimExtents").setVisibility(false);
        $("#flood-tools-alert").slideDown(250);
    });

    $("#floodClose").click(function(){
        $("#floodToolsDiv").css("visibility", "hidden");
        map.getLayer("fimExtents").setVisibility(false);
        map.getLayer("fimBreach").setVisibility(false);
        map.getLayer("fimSuppLyrs").setVisibility(false);
    });

    $("#floodToolsOpen").click(function(){
        $("#floodToolsDiv").css("visibility", "visible");
        $("#flood-tools-alert").slideUp(250);
    });

    $("#waterAlertLink").click(function() {
       $("#waterAlertLink").attr("href", "https://water.usgs.gov/wateralert/subscribe/?fim=1&intro=1&site_no=" + siteAttr.SITE_NO + "&agency_cd=USGS&type_cd=st&parms=00065:" + results[$("#floodSlider")[0].value].attributes["STAGE"]);
       $("#waterAlertLink").click();
    });

    $("#disclaimerLink").click(function() {
        $("#aboutModal").modal('show');
        $("#disclaimerTab").trigger('click');
    })

    //map.getLayer("fimGrid2").on("load", gridsLayerComp);

    map.on('layer-add', function (evt) {
        var layer = evt.layer.id;
        var actualLayer = evt.layer;

        if (layer == "fimSites") {

            var initialSiteLoad = map.getLayer(layer).on('update-end', function(evt) {
                var ahpsIds = [];
                var graphics = evt.target.graphics;
                $.each(graphics, function (index, feature) {
                    if (feature.attributes["AHPS_ID"] != null) {
                        ahpsIds.push("'" + feature.attributes["AHPS_ID"].toUpperCase() + "'");
                    }
                });

                //ahpsIds.map(function(x){ return x.toUpperCase() })

                $.ajax({
                    dataType: 'json',
                    type: 'GET',
                    url: ahpsForecastUrl + "/query?returnGeometry=false&where=GaugeLID%20in%20%28" + ahpsIds + "%29&outFields=status%2Cgaugelid&f=json",
                    headers: {'Accept': '*/*'},
                    success: function (data) {
                        console.log(data);

                        var floodAttr = data.features;

                        var i;

                        for (i = 0; i < floodAttr.length; i++) {
                            for (var j = 0; j < graphics.length; j++) {
                                //console.log(floodAttr[i].attributes.gaugelid.toLowerCase() + " : " + map.getLayer(layer).graphics[j].attributes.AHPS_ID)
                                if (map.getLayer(layer).graphics[j].attributes.AHPS_ID == floodAttr[i].attributes.gaugelid.toLowerCase()) {
                                    map.getLayer(layer).graphics[j].attributes["floodCondition"] = floodAttr[i].attributes.status;
                                    if (map.getLayer(layer).graphics[j].attributes.AHPS_ID == "cpei3") {
                                        console.log('here');
                                    }
                                }

                            }
                        }

                        var symWidth = 13.44;
                        var symHeight = 11;

                        var defaultSym = new PictureMarkerSymbol('./images/default.png', symWidth, symHeight);
                        var actionSym = new PictureMarkerSymbol('./images/action.png', symWidth, symHeight);
                        var majorSym = new PictureMarkerSymbol('./images/major.png', symWidth, symHeight);
                        var minorSym = new PictureMarkerSymbol('./images/minor.png', symWidth, symHeight);
                        var moderateSym = new PictureMarkerSymbol('./images/moderate.png', symWidth, symHeight);
                        var no_floodingSym = new PictureMarkerSymbol('./images/no_flooding.png', symWidth, symHeight);

                        var sitesRenderer = new UniqueValueRenderer(defaultSym, "floodCondition");
                        sitesRenderer.addValue("action", actionSym);
                        sitesRenderer.addValue("major", majorSym);
                        sitesRenderer.addValue("minor", minorSym);
                        sitesRenderer.addValue("moderate", moderateSym);
                        sitesRenderer.addValue("no_flooding", no_floodingSym);

                        //map.getLayer(layer).setRenderer(sitesRenderer);

                        for (var i=0; i < map.getLayer(layer).graphics.length; i++) {
                            map.graphics.add(map.getLayer(layer).graphics[i]);
                        }
                        map.graphics.setRenderer(sitesRenderer);
                        map.graphics.refresh();

                        initialSiteLoad.remove();

                    },
                    error: function (error) {
                        console.log("Error processing the JSON. The error is:" + error);
                    }
                });

            });

            map.graphics.on('click', function(evt) {

                var feature = evt.graphic;
                var attr = feature.attributes;
                siteAttr = attr;
                results = null;
                getGridInfo();

                //code to query related records for site and get logos and created/reviewed by cooperators
                //first set anything that can be set with site attributes
                $("#downloadData").attr("href", siteAttr.DATA_LINK);
                $("#reportCover").attr("src", siteAttr.REP_THUMB);
                $("#downloadReport").attr("href", siteAttr.REP_LINK);

                $('#mapsCreatedBy').empty();
                $('#mapsReviewedBy').empty();
                $('#logos').empty();

                //related records query
                $.ajax({
                    dataType: 'json',
                    type: 'GET',
                    url: map.getLayer("fimSites").url + "/queryRelatedRecords?objectIds=" + siteAttr.OBJECTID +
                        "&relationshipId=0&outFields=*&definitionExpression=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnZ=false&returnM=false&gdbVersion=&f=json",
                    headers: {'Accept': '*/*'},
                    success: function (data) {

                        if (data.relatedRecordGroups[0].relatedRecords.length > 0) {
                            var relatedRecords = data.relatedRecordGroups[0].relatedRecords;
                            var furnished = false;
                            $.each(relatedRecords, function (index, value) {
                                if (value.attributes["TYPE"] == "C") {
                                    $('#mapsCreatedBy').append("<a target='_blank' href='" + value.attributes["URL"] + "'>" + value.attributes["ENTITY"] + "</a><br/>");
                                } else if (value.attributes["TYPE"] == "R") {
                                    $('#mapsReviewedBy').append("<a target='_blank' href='" + value.attributes["URL"] + "'>" + value.attributes["ENTITY"] + "</a><br/>");
                                } else if (value.attributes["TYPE"] == "L") {
                                    $('#logos').append("<img src='https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/" + value.attributes["ENTITY"] + "'/>");
                                } else if (value.attributes["TYPE"] == "F") {
                                    $('#recordsLogo').attr("src", "https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/" + value.attributes["ENTITY"]);
                                    furnished = true;
                                }
                            });

                            if (furnished == true) {
                                $('#usgsDefaultLogo').hide();
                                $('#recordsLogo').show();
                            } else if (furnished == false) {
                                $('#usgsDefaultLogo').show();
                                $('#recordsLogo').hide();
                            }
                        }

                    },
                    error: function (error) {
                        console.log("Error processing the JSON. The error is:" + error);
                    }
                });

                var siteNo = siteAttr.SITE_NO;
                var ahpsID = siteAttr.AHPS_ID;
                var state = siteAttr.STATE;
                var community = siteAttr.COMMUNITY;

                if (map.getLevel() < 12) {
                    map.centerAndZoom(feature.geometry, 13);
                }

                // Google Analytics
                /*ga('send','event','Map','click','Site clicked');*/
                var dimensionValue = siteNo + ", " + state +", " + community;
                ga('send','event','Map','click', 'Site Clicked', {'dimension1': dimensionValue});
                // End Google Analytics

                map.getLayer("fimExtents").setVisibility(true);
                map.getLayer("fimBreach").setVisibility(true);
                var suppLyrs = map.getLayer("fimSuppLyrs");
                var suppLyrsDef = [];
                suppLyrsDef[0] = "USGSID = '" + siteNo + "'";
                suppLyrsDef[1] = "USGSID = '" + siteNo + "'";
                suppLyrs.setLayerDefinitions(suppLyrsDef);
                suppLyrs.setVisibility(true);

                $("[id*='Tab']").parents("li").removeClass("active");
                $(".nav-tabs #floodToolsTab").tab("show");

                $("#usgsSiteNoMin").text(siteNo);
                $("#usgsSiteNoMin").attr("href", "http://waterdata.usgs.gov/nwis/uv?site_no="+siteNo);
                $("#nwsSiteIDMin").text(feature.attributes.AHPS_ID);
                $("#nwsSiteIDMin").attr("href", "http://water.weather.gov/ahps2/hydrograph.php?gage="+feature.attributes.AHPS_ID);

                $("#usgsSiteNoMax").text(siteNo);
                $("#usgsSiteNoMax").attr("href", "http://waterdata.usgs.gov/nwis/uv?site_no="+siteNo);
                $("#nwsSiteIDMax").text(feature.attributes.AHPS_ID);
                $("#nwsSiteIDMax").attr("href", "http://water.weather.gov/ahps2/hydrograph.php?gage="+feature.attributes.AHPS_ID);

                if (attr.HAS_GRIDS == 1) {
                    $("#gridLabel").show();
                } else {
                    $("#gridLabel").hide();
                }

                //Web cam check and set up
                /*if (feature.attributes.HAS_WEBCAM == "1") {
                    $("#webCamTab").show();
                    $("#webCamIFrame").attr("src", "http://services.wim.usgs.gov/webCam/webCamNew/Default.aspx?webCamInfo=" + feature.attributes.WEBCAM_INFO);
                } else if (feature.attributes.HAS_WEBCAM == "0") {
                    $("#webCamTab").hide();
                }*/

                //More Info check and setup
                $.ajax({
                    dataType: 'json',
                    type: 'GET',
                    url: fimiMoreInfoUrl + "/query?where=USGSID%20%3D%20" + siteNo + "&outFields=ADD_INFO&f=json",
                    headers: {'Accept': '*/*'},
                    success: function (data) {

                        if (data.features.length > 0) {
                            $("#moreInfo").text(data.features[0].attributes.ADD_INFO);
                            $("#moreInfoTab").show();
                            $(".nav-tabs a[href='#moreInfoTabPane']").tab('show');
                        } else {
                            $("#moreInfo").text("Loading...");
                            $("#moreInfoTab").hide();
                        }

                    },
                    error: function (error) {
                        console.log("Error processing the JSON. The error is:" + error);
                    }
                });

                $.ajax({
                    dataType: 'text',
                    type: 'GET',
                    url: proxyUrl + "site_no="+siteNo+"&site_info=true",
                    headers: {'Accept': '*/*'},
                    success: function (data) {
                        var rtHtml = "";
                        var nwisHtml = "";

                        //var ivUrl = "http://waterservices.usgs.gov/nwis/site/?format=gm&sites="+attr['Name']+"&siteOutput=expanded&outputDataTypeCd=iv&hasDataTypeCd=iv&parameterCd=00065,00060,00010,00095,63680,99133";
                        var ivUrl = "https://waterservices.usgs.gov/nwis/iv/?format=json&sites="+attr['SITE_NO']+"&parameterCd=00060,00065";

                        $.ajax({
                            dataType: 'json',
                            type: 'GET',
                            url: ivUrl,
                            headers: {'Accept': '*/*'},
                            success: function (data) {
                                var siteData = data;
                                var variable = "";
                                var variableCode = "";
                                //if siteData.
                                //rtHtml = ""
                                $.each(siteData.value.timeSeries, function(key, value) {
                                    /*console.log("key: " + key + ", value: " + value);
                                     console.log(
                                     "var code: " + value.variable.variableCode[0].value +
                                     ", units: " + value.variable.unit.unitAbbreviation +
                                     ", value: " + value.values[0].value[0].value);*/

                                    variableCode = value.variable.variableCode[0].value;
                                    var units = value.variable.unit.unitAbbreviation;
                                    var varValue = "";
                                    if (value.values[0].value.length > 0) {
                                        var varValue = value.values[0].value[0].value;
                                        switch (variableCode) {
                                            case "00060":
                                                variable = "Discharge";
                                                break;
                                            case "00065":
                                                variable = "Gage height";
                                                break;
                                            case "00010":
                                                variable = "Temperature, water";
                                                break;
                                            case "00300":
                                                variable = "Dissolved oxygen";
                                                break;
                                            case "00400":
                                                variable = "pH";
                                                break;
                                            case "00095":
                                                variable = "Specific cond at 25C";
                                                break;
                                            case "32283":
                                                variable = "Chlorophyll, in situ";
                                                break;
                                            case "63680":
                                                variable = "Turbidity, Form Neph";
                                                break;
                                            case "99133":
                                                variable = "NO3+NO2,water,insitu";
                                                break;
                                        }

                                        var startDate = getTodayDate();
                                        var todayDate = getTodayDate();
                                        var valDate = value.values[0].value[0].dateTime;

                                        var formattedDate = dateFormat(valDate);

                                        if (variable == "Discharge") {
                                            $("#floodMaxDischarge").text(varValue);
                                            $("#floodMinDischarge").text(varValue);
                                        } else if (variable == "Gage height") {
                                            $("#floodMaxGage").text(varValue);
                                            $("#floodMinGage").text(varValue);
                                        }

                                        var rtLabel = "";
                                        if (varValue == "-999999") {
                                            rtLabel = "<label class='paramLabel'>" + variable + ": <span style='font-weight: normal'>N/A</span></label><br/>";
                                        } else {
                                            rtLabel = "<label class='paramLabel'>" + variable + ": <span style='font-weight: normal'>" + varValue + " " + units + " <span style='font-size: smaller; color: darkblue'><i>(" + formattedDate + "</i>)</span></span></label><br/>";
                                        }

                                        rtHtml = rtHtml + rtLabel;

                                        var siteNo = feature.attributes.Name;

                                        if (dateInRange(valDate,startDate) == true) {
                                            var nwisGraphUrl = "http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no="+siteNo+"&parm_cd="+variableCode+"&begin_date=" + startDate + "&end_date="+todayDate//+"&dd_nu="+param_dd[variableCode];

                                            var nwisChart = "<br/><br/><label>"+ variable + "</label><br/><img src='" + nwisGraphUrl + "'/>";

                                            nwisHtml = nwisHtml + nwisChart;
                                        }

                                    }

                                });

                                var siteName = siteData.value.timeSeries[0].sourceInfo.siteName;

                                var template = new esri.InfoTemplate("<span class=''>" + siteName + "</span>",
                                    "<div id='rtInfo'>" + rtHtml + "</div>" +
                                    "<br/><span>Most recent measurement(s) <span style='font-size: smaller; color: darkblue'><i>(local time)</i></span> - see <a target='_blank' href='http://waterdata.usgs.gov/nwis/uv?site_no=" + siteNo + "'>NWIS Site</a> for more details</span>" +
                                    "<div id='nwisCharts'>" + nwisHtml + "</div>");

                            },
                            error: function (error) {
                                console.log("Error processing the JSON. The error is:" + error);
                            }
                        });
                    },
                    error: function (error) {
                        console.log("Error processing the JSON. The error is:" + error);
                    }
                });

                //call for observed (NWIS) hydro data
                var nwisCall = $.ajax({
                    dataType: 'text',
                    type: 'GET',
                    //url: proxyUrl + "site_no="+siteNo+"&hydroGet=true",
                    url: nwisUrl + siteNo,
                    headers: {'Accept': '*/*'}
                });

                var nwsCall = $.ajax({
                    dataType: 'xml',
                    type: 'GET',
                    url: proxyUrl + "ahpsID=" + ahpsID,
                    headers: {'Accept': '*/*'}
                });

                $("#floodToolsDiv").css("visibility", "visible");
                var instance = $('#floodToolsDiv').data('lobiPanel');
                var docHeight = $(document).height();
                var docWidth = $(document).width();
                var percentageOfScreen = 0.9;
                var floodToolsHeight = docHeight*percentageOfScreen
                var floodToolsWidth = docWidth*percentageOfScreen;
                var highChartWidth = 600;
                var highChartHeight = 325;
                if (docHeight < 500) {
                    $("#floodToolsDiv").height(floodToolsHeight);
                    highChartHeight = $("#floodToolsDiv").height() - 50;
                }
                if (docWidth < 500) {
                    $("#floodToolsDiv").width(floodToolsWidth);
                    highChartWidth = $("#floodToolsDiv").width() - 50;
                }

                $.when(nwisCall,nwsCall)
                    .done(function(nwisData,nwsData) {

                        //NWIS data handling
                        var siteData = $.parseJSON(nwisData[0]);
                        var values = siteData.data[0].time_series_data

                        var finalNWISDataArray = [];
                        var finalNWSDataArray = [];

                        $.each(values, function(key, value) {

                            if (value[0] !== undefined) {
                                var time = value[0];
                                var value = value[1];

                                finalNWISDataArray.push([time,value]);
                            }

                        });

                        //NWS data handling
                        if (nwsData[0].children[0].children[0].textContent != "no nws data") {
                            var nwsIndex = getNwsForecastIndex(nwsData[0].children[0].children);
                            var nwsValues = nwsData[0].children[0].children[nwsIndex].children;
                            if (nwsValues.length > 0) {
                                var nwsDatum = (nwsValues[0].children[1].attributes.name.value == "Stage") ? 1 : 2;
                                $.each(nwsValues, function(key, value) {

                                    if (value.children[0].textContent !== "") {
                                        var time = dateFix(value.children[0].textContent,"nws");
                                        var value = Number(value.children[nwsDatum].textContent);

                                        finalNWSDataArray.push([time,value]);
                                    }

                                });
                            }
                        }

                        //var siteName = siteData.documentElement.children[1].children[0].children[0].textContent;

                        //$("#hydroChart").empty();
                        var hydroChart = new Highcharts.Chart('hydroChart', {
                            chart: {
                                type: 'line',
                                height: highChartHeight,
                                width: highChartWidth
                            },
                            title: {
                                text: ""
                            },
                            series: [{
                                data: finalNWISDataArray,
                                name: "NWIS Observed"
                            },{
                                data: finalNWSDataArray,
                                name: "NWS Predicted"
                            }],
                            xAxis: {
                                type: "datetime"
                            },
                            yAxis: {
                                labels: {
                                    format: "{value} ft"
                                },
                                title: {
                                    text: "Gage height"
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var date = new Date(this.x);
                                    var dayOfWeek = getDay(date);
                                    var month = getMonth(date);
                                    var dayOfMonth = date.getDate()
                                    var hours = date.getHours().toString();
                                    var minutes = date.getMinutes().toString();
                                    if (hours.length == 1) {
                                        hours = "0"+hours;
                                    }
                                    if (minutes.length == 1) {
                                        minutes = "0"+minutes;
                                    }
                                    return dayOfWeek + ', ' + month + ' ' + dayOfMonth + ', ' + hours + ':' + minutes + '<br/>' +
                                        this.series.name + ': <b>' + this.y + ' ft</b>';
                                }
                            }
                        });
                    })
                    .fail(function() {
                        alert('there was an issue');
                    });


                var floodExtentsUrl = map.getLayer("fimExtents").url + "/0";

                var extentQuery = new esriQuery();
                extentQuery.returnGeometry = false;
                extentQuery.outFields = ["*"];
                extentQuery.orderByFields = ["STAGE ASC"];
                extentQuery.where = "USGSID = '" + attr["SITE_NO"] + "'";

                var extentQueryTask = new QueryTask(floodExtentsUrl);
                extentQueryTask.execute(extentQuery, extentResult);

                function extentResult(featureSet) {

                    if (featureSet.features.length > 0) {

                        results = featureSet.features;

                        $("#floodToolsPanelHeader").text(attr["STATE"] + ": " + attr["COMMUNITY"]);

                        $("#siteNumber").text(attr["SITE_NO"]);
                        $("#floodSlider").attr({"min": 0, "max": results.length-1});
                        $("#floodSlider")[0].value = 0;
                        $("#selectedValue").text(results[0].attributes["STAGE"]);
                        $("#floodMinSelectedGage").text(results[0].attributes["STAGE"]);

                        var layerDefinitions = [];
                        layerDefinitions[0] = "USGSID = '" + attr["SITE_NO"] + "' AND STAGE = " + results[0].attributes["STAGE"];
                        map.getLayer("fimExtents").setLayerDefinitions(layerDefinitions);
                        map.getLayer("fimBreach").setLayerDefinitions(layerDefinitions);

                        $("#slider").on("input change", function() {
                            $("#selectedValue").text(results[$("#floodSlider")[0].value].attributes["STAGE"]);
                            $("#floodMinSelectedGage").text(results[$("#floodSlider")[0].value].attributes["STAGE"]);
                            var layerDefinitions = [];
                            layerDefinitions[0] = "USGSID = '" + attr["SITE_NO"] + "' AND STAGE = " + results[$("#floodSlider")[0].value].attributes["STAGE"];
                            map.getLayer("fimExtents").setLayerDefinitions(layerDefinitions);
                            map.getLayer("fimBreach").setLayerDefinitions(layerDefinitions);
                        });

                        var instanceX = docWidth*0.5-$("#floodToolsDiv").width()*0.5;
                        var instanceY = docHeight*0.5-$("#floodToolsDiv").height()*0.5;

                        instance.setPosition(instanceX, instanceY);
                        if (instance.isPinned() == true) {
                            instance.unpin();
                        }

                    }

                }

            });

        } else if (layer == "fimGrid1" || layer == "fimGrid2" || layer == "fimGrid3") {
            //var layer = evt.layer.id;
            var grids;
            switch (layer) {
                case "fimGrid1":
                    grid1Infos = map.getLayer(layer).layerInfos;
                    break;
                case "fimGrid2":
                    grid2Infos = map.getLayer(layer).layerInfos;
                    break;
                case "fimGrid3":
                    grid3Infos = map.getLayer(layer).layerInfos;
                    break;

            }
        }

    });

    function getGridInfo() {
        var gridServ = null;
        switch (siteAttr.GRID_SERV) {
            case 1:
                gridServ = grid1Infos;
                break;
            case 2:
                gridServ = grid2Infos;
                break;
            case 3:
                gridServ = grid3Infos;
                break;
            case null:
                gridServ = null;
                break;
        }

        if (gridServ != null) {
            var id;
            var shortName;
            var gridID;
            for (var i = 0; i < gridServ.length; i++) {
                var tempGridInfo = gridServ[i].name.split('_');
                shortName = tempGridInfo[0];
                gridID = tempGridInfo[1];
                id = gridServ[i].id;
                if (shortName == siteAttr.SHORT_NAME) {
                    /*var tempName:String = fimi_grids.layerInfos[i].name;
                     var tempGage:String = tempGridInfo[1] + '.' + tempGridInfo[2];
                     var tempGageNumber:Number = parseFloat(tempGage);
                     gridInfos.addItem({index: id, name: tempName, gage: tempGageNumber.toFixed(2)});*/
                     gridInfos.push({index: id, shortname: shortName, gridid: gridID});
                }
            }
        }

    }

    map.on("click", function(evt) {
        //$("[id*='fimExtents'] .esriLegendLayerLabel").hide();
        var identifyParameters = new IdentifyParameters();
        if (siteAttr != null && siteAttr.HAS_GRIDS == 1 && map.getLayer("fimExtents").visible == true && evt.target.localName != "image") {
            //come back to this to deal with grid clicks
            var grid_serv = siteAttr.GRID_SERV;
            identifyParameters.layerIds = [];
            gridLayerIndexArrColl = [];

            for (var i=0; i < gridInfos.length; i++) {
                if (gridInfos[i].shortname == siteAttr.SHORT_NAME && Number(gridInfos[i].gridid) == results[$("#floodSlider")[0].value].attributes["GRIDID"]) {
                    identifyParameters.layerIds.push([gridInfos[i].index]);
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                } else if (gridInfos[i].shortname == siteAttr.SHORT_NAME && gridInfos[i].gridid == results[$("#floodSlider")[0].value].attributes["GRIDID"]+'b') {
                    identifyParameters.layerIds.push([gridInfos[i].index]);
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                }
            }

            identifyParameters.width = map.width;
            identifyParameters.height = map.height;
            identifyParameters.geometry = evt.mapPoint;
            identifyParameters.tolerance = 1;
            identifyParameters.mapExtent = map.extent;
            identifyParameters.spatialReference = map.spatialReference;

            var identifyTask = new IdentifyTask("https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_" + grid_serv + "/MapServer");
            identifyTask.showBusyCursor = true;

            var deferredResult = identifyTask.execute(identifyParameters);

            deferredResult.addCallback(function(response) {

                map.infoWindow.hide();

                if (response[0].feature.attributes["Pixel Value"] != "NoData") {
                    var depthRange = siteAttr.DEPTH_RANG;
                    if (depthRange == null) {
                        depthRange = 1;
                    }

                    var factor = (Number(depthRange)/2) % 0.5;
                    if (factor == 0) { //second half of OR only to handle libraries without depth range even though it is a required field
                        factor = 0.5;
                    }

                    var gridAttr = response[0].feature.attributes["Pixel Value"];
                    var rndGridValue = roundToNearest(factor,gridAttr);

                    var lowValue = rndGridValue-Number(depthRange)/2;
                    var highValue = rndGridValue+Number(depthRange)/2;

                    //code to adjust value so range falls on .0s and .5s
                    var roundingRemainder = (rndGridValue+Number(depthRange)/2) % 0.5;
                    if (roundingRemainder != 0) {
                        var diff = rndGridValue - gridAttr;
                        if (diff > 0) {
                            lowValue = Number((rndGridValue - Number(depthRange)/2 - factor).toFixed(1));
                            highValue = Number((rndGridValue + Number(depthRange)/2 - factor).toFixed(1));
                        } else {
                            lowValue = Number((rndGridValue - Number(depthRange)/2 + factor).toFixed(1));
                            highValue = Number((rndGridValue + Number(depthRange)/2 + factor).toFixed(1));
                        }
                    }

                    //check for negative values of lowValue
                    if (lowValue < 0) {
                        lowValue = 0;
                    }

                    //using depth range value in site file
                    var range = lowValue.toString() + ' - ' + highValue.toString();

                    var template = new esri.InfoTemplate("Water depth <a target='_blank' href='" + siteAttr.REP_LINK + "'><i style='color: white' class='fa fa-question-circle'></a>",
                        "<b>Range:</b> " + range + " ft");

                    var feature = response[0].feature;
                    feature.setInfoTemplate(template);

                    map.infoWindow.setFeatures([feature]);
                    map.infoWindow.resize(175,125);
                    map.infoWindow.show(evt.mapPoint);
                }

            });
        }
    });

    function roundToNearest(roundTo, value) {
        return Math.round(value/roundTo)*roundTo;
    }

    function getNwsForecastIndex(obj) {
        var index;
        for (var i=0; i < obj.length; i++) {
            if (obj[i].nodeName == "forecast") {
                index = i;
            }
            if (i == obj.length-1 && obj[i].nodeName != "forecast") {
                index = null;
            }
        }
        return index;
    }

    function getTodayDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;

        return today;
    }

    function dateInRange(valDate,startDate) {
        var inRange = false;

        var valDateSub = valDate.substring(0,10);

        var valDateSubSplit = valDateSub.split('-');
        var startDateSplit = startDate.split('-');

        var val = new Date(valDateSubSplit[0], valDateSubSplit[1]-1, valDateSubSplit[2]); //Year, Month, Date
        var start = new Date(startDateSplit[0], startDateSplit[1]-1, startDateSplit[2]);

        if(val >= start)
        {
            inRange = true;
        }

        return inRange;
    }

    function dateFormat(valDate) {
        var outFormat = "";

        var dateSplit = valDate.split("T");

        var utcFormat = dateSplit[0] + " " + dateSplit[1].split(".")[0] + " UTC";
        var utcDate = new Date(utcFormat).toString();

        outFormat = dateSplit[0] + " " + utcDate.split(" ")[4];

        return outFormat;
    }

    function dateFix(date,series) {
        var outDate;

        var dateSplit = date.split("T");
        var YMD = dateSplit[0].split("-");
        if (series == "nwis") {
            var HMS = dateSplit[1].split(".")[0].split(":");
        } else if (series == "nws") {
            var HMS = dateSplit[1].split("-")[0].split(":");
        }


        var year = Number(YMD[0]);
        var month = Number(YMD[1])-1;
        var day = Number(YMD[2]);
        var hour = Number(HMS[0]);
        var minute = Number(HMS[1]);
        var second = Number(HMS[2]);

        outDate = Date.UTC(year,month,day,hour,minute,second);

        return outDate;
    }

    function getDay(date) {
        var day;
        switch (date.getDay()) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
        }
        return day;
    }

    function getMonth(date) {
        var month;
        switch (date.getMonth()) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
        }
        return month;
    }



    // create search_api widget in element "geosearch"
    search_api.create( "geosearch", {
        on_result: function(o) {
            // what to do when a location is found
            // o.result is geojson point feature of location with properties

            // zoom to location
            require(["esri/geometry/Extent"], function(Extent) {
                var noExtents = ["GNIS_MAJOR", "GNIS_MINOR", "ZIPCODE", "AREACODE"];
                var noExtentCheck = noExtents.indexOf(o.result.properties["Source"])
                if (noExtentCheck == -1) {
                    map.setExtent(
                        new esri.geometry.Extent({
                            xmin: o.result.properties.LonMin,
                            ymin: o.result.properties.LatMin,
                            xmax: o.result.properties.LonMax,
                            ymax: o.result.properties.LatMax,
                            spatialReference: {"wkid":4326}
                        }),
                        true
                    );
                } else {
                    //map.setCenter();
                    require( ["esri/geometry/Point"], function(Point) {
                        map.centerAndZoom(
                            new Point( o.result.properties.Lon, o.result.properties.Lat ),
                            12
                        );
                    });
                }

            });

        },
        "include_usgs_sw": true,
        "include_usgs_gw": true,
        "include_usgs_sp": true,
        "include_usgs_at": true,
        "include_usgs_ot": true,
        "include_huc2": true,
        "include_huc4": true,
        "include_huc6": true,
        "include_huc8": true,
        "include_huc10": true,
        "include_huc12": true

    });

    /*var geocoder = new Geocoder({
        value: '',
        maxLocations: 25,
        autoComplete: true,
        arcgisGeocoder: true,
        autoNavigate: false,
        map: map
    }, 'geosearch');
    geocoder.startup();
    geocoder.on('select', geocodeSelect);
    geocoder.on('findResults', geocodeResults);
    geocoder.on('clear', clearFindGraphics);
    on(geocoder.inputNode, 'keydown', function (e) {
        if (e.keyCode == 13) {
            setSearchExtent();
        }
    });

    // Symbols
    var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);

    /*map.on('load', function (){
        map.infoWindow.set('highlight', false);
        map.infoWindow.set('titleInBody', false);
    });*/

    // Geosearch functions
    //on(dom.byId('btnGeosearch'),'click', geosearch);

    // Optionally confine search to map extent
    /*function setSearchExtent (){
        if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }
    }*/
    /*function geosearch() {
        //setSearchExtent();
        var def = geocoder.find();
        def.then(function (res){
            geocodeResults(res);
        });
        // Close modal
        $('#geosearchModal').modal('hide');
    }
    function geocodeSelect(item) {
        clearFindGraphics();
        var g = (item.graphic ? item.graphic : item.result.feature);
        g.setSymbol(sym);
        //addPlaceGraphic(item.result,g.symbol);
        // Close modal
        //$('#geosearchModal').modal('hide');
    }
    function geocodeResults(places) {
        places = places.results;
        if (places.length > 0) {
            clearFindGraphics();
            var symbol = sym;
            // Create and add graphics with pop-ups
            for (var i = 0; i < places.length; i++) {
                //addPlaceGraphic(places[i], symbol);
            }
            //zoomToPlaces(places);
            var centerPoint = new Point(places[0].feature.geometry);
            map.centerAndZoom(centerPoint, 17);
            //map.setLevel(15);

        } else {
            //alert('Sorry, address or place not found.');  // TODO
        }
    }
    function stripTitle(title) {
        var i = title.indexOf(',');
        if (i > 0) {
            title = title.substring(0,i);
        }
        return title;
    }
    function addPlaceGraphic(item,symbol)  {
        var place = {};
        var attributes,infoTemplate,pt,graphic;
        pt = item.feature.geometry;
        place.address = item.name;
        place.score = item.feature.attributes.Score;
        // Graphic components
        attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
        infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
        graphic = new Graphic(pt,symbol,attributes,infoTemplate);
        // Add to map
        map.graphics.add(graphic);
    }

    function zoomToPlaces(places) {
        var multiPoint = new Multipoint(map.spatialReference);
        for (var i = 0; i < places.length; i++) {
            multiPoint.addPoint(places[i].feature.geometry);
        }
        map.setExtent(multiPoint.getExtent().expand(2.0));
    }

    function clearFindGraphics() {
        map.infoWindow.hide();
        map.graphics.clear();
    }

    function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
        return new PictureMarkerSymbol(
            {
                'angle': 0,
                'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                'url': url,
                'contentType': 'image/png',
                'width':xWidth, 'height': yHeight
            });
    }*/

    // Show modal dialog; handle legend sizing (both on doc ready)
    $(document).ready(function(){
        function showModal() {
            $('#geosearchModal').modal('show');
        }
        // Geosearch nav menu is selected
        $('#geosearchNav').click(function(){
            showModal();
        });

        function showAboutModal () {
            $('#aboutModal').modal('show');
        }
        $('#aboutNav').click(function(){
            showAboutModal();
        });

        $("#html").niceScroll();
        $("#sidebar").niceScroll();
        $("#sidebar").scroll(function () {
            $("#sidebar").getNiceScroll().resize();
        });

        $("#legendDiv").niceScroll();

        maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
        $('#legendElement').css('max-height', maxLegendHeight);

        $('#legendCollapse').on('shown.bs.collapse', function () {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        });

        $('#legendCollapse').on('hide.bs.collapse', function () {
            $('#legendElement').css('height', 'initial');
        });

    });

    require([
        'esri/dijit/Legend',
        'esri/tasks/locator',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphicsUtils',
        'esri/geometry/Point',
        'esri/geometry/Extent',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/SpatialReference',
        'esri/layers/WMSLayer',
        'esri/layers/WMSLayerInfo',
        'dijit/form/CheckBox',
        'dijit/form/RadioButton',
        'dojo/query',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-construct',
        'dojo/dom-style',
        'dojo/on'
    ], function(
        Legend,
        Locator,
        Query,
        QueryTask,
        graphicsUtils,
        Point,
        Extent,
        ArcGISDynamicMapServiceLayer,
        FeatureLayer,
        SpatialReference,
        WMSLayer,
        WMSLayerInfo,
        CheckBox,
        RadioButton,
        query,
        dom,
        domClass,
        domConstruct,
        domStyle,
        on
    ) {

        var legendLayers = [];
        var layersObject = [];
        var layerArray = [];
        var staticLegendImage;
        var identifyTask, identifyParams;
        var navToolbar;
        var locator;

        //create global layers lookup
        var mapLayers = [];

        $.each(allLayers, function (index,group) {
            console.log('processing: ', group.groupHeading)


            //sub-loop over layers within this groupType
            $.each(group.layers, function (layerName,layerDetails) {



                //check for exclusiveGroup for this layer
                var exclusiveGroupName = '';
                if (layerDetails.wimOptions.exclusiveGroupName) {
                    exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                }

                if (layerDetails.wimOptions.layerType === 'agisFeature') {
                    var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    /*if (layerDetails.wimOptions.renderer !== undefined) {
                        layer.setRenderer(layerDetails.wimOptions.renderer);
                    }*/
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisWMS') {
                    var layer = new WMSLayer(layerDetails.url, {resourceInfo: layerDetails.options.resourceInfo, visibleLayers: layerDetails.options.visibleLayers }, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                    var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.layerDefinitions) {
                        var layerDefs = [];
                        $.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                            layerDefs[index] = def;
                        });
                        layer.setLayerDefinitions(layerDefs);
                    }
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }
            });
        });

        function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

            //add layer to map
            //layer.addTo(map);
            if (wimOptions.layerIndex !== undefined) {
                map.addLayer(layer, wimOptions.layerIndex);
            } else {
                map.addLayer(layer);
            }

            if (wimOptions.legendLabel == false) {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '[id*=' + layer.id + '] .esriLegendLayerLabel { display: none; }';
                document.getElementsByTagName('head')[0].appendChild(style);
            }

            //add layer to layer list
            mapLayers.push([exclusiveGroupName,camelize(layerName),layer]);

            //check if its an exclusiveGroup item
            if (exclusiveGroupName) {

                if (!$('#' + camelize(exclusiveGroupName)).length) {
                    var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');

                    exGroupRoot.click(function(e) {
                        exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                        $.each(mapLayers, function (index, currentLayer) {

                            var tempLayer = map.getLayer(currentLayer[2].id);

                            if (currentLayer[0] == exclusiveGroupName) {
                                if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('removing layer: ',currentLayer[1]);
                                    map.removeLayer(currentLayer[2]);
                                }
                            }

                        });
                    });

                    var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div>');
                    $('#toggle').append(exGroupDiv);
                }

                //create radio button
                //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                if (layer.visible) {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                } else {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                }

                $('#' + camelize(exclusiveGroupName)).append(button);

                //click listener for radio button
                button.click(function(e) {

                    if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                        $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                        var newLayer = $(this)[0].id;

                        $.each(mapLayers, function (index, currentLayer) {

                            if (currentLayer[0] == exclusiveGroupName) {
                                if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                    //$('#' + camelize(currentLayer[1])).toggle();
                                }
                                else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('groud heading not checked');
                                }
                                else {
                                    console.log('removing layer: ',currentLayer[1]);
                                    map.removeLayer(currentLayer[2]);
                                    if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                        $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                    }
                                    //$('#' + camelize(this[1])).toggle();
                                }
                            }
                        });
                    }
                });
            }

            //not an exclusive group item
            else if (wimOptions.includeInLayerList) {

                //create layer toggle
                //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true) {
                    //opacity icon and zoomto icon; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true){
                    //opacity icon and zoomto icon; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    //opacity icon only; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    //opacity icon only; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider == false && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true){
                    //zoomto icon only; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider == false && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true) {
                    //zoomto icon only; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');
                } else if(layer.visible) {
                    //no icons; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                } else {
                    //no icons; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                }

                //click listener for regular
                button.click(function(e) {

                    //toggle checkmark
                    $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                    $(this).find('button').button('toggle');

                    e.preventDefault();
                    e.stopPropagation();

                    $('#' + camelize(layerName)).toggle();

                    //layer toggle
                    if (layer.visible) {
                        layer.setVisibility(false);
                    } else {
                        layer.setVisibility(true);
                    }

                    // Google Analytics
                    var dimensionValue = layerName + "";
                    ga('send','event','layer','click', 'layer toggle', {'dimension2': dimensionValue});
                    // End Google Analytics

                });
            }

            //group heading logic
            if (showGroupHeading) {

                //camelize it for divID
                var groupDivID = camelize(groupHeading);

                //check to see if this group already exists
                if (!$('#' + groupDivID).length) {
                    //if it doesn't add the header
                    var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                    $('#toggle').append(groupDiv);
                }

                //if it does already exist, append to it

                if (exclusiveGroupName) {
                    //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                    $('#' + groupDivID).append(exGroupRoot);
                    $('#' + groupDivID).append(exGroupDiv);
                } else {
                    $('#' + groupDivID).append(button);
                    //begin opacity slider logic
                    if ($("#opacity"+camelize(layerName)).length > 0) {
                        $("#opacity"+camelize(layerName)).hover(function () {
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);[0]

                            $("#slider")[0].value = currOpacity*100;
                            $(".opacitySlider").css('left', event.clientX-180);
                            $(".opacitySlider").css('top', event.clientY-50);

                            $(".opacitySlider").mouseleave(function() {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function() {
                                $(".opacitySlider").remove();
                            });
                            $('#slider').change(function(event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value)/100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });
                        });
                    }
                    //end opacity slider logic

                    //begin zoomto logic (in progress)
                    $(".zoomto").hover(function (e) {

                        $(".zoomDialog").remove();
                        var layerToChange = this.parentNode.id;
                        var zoomDialog = $('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');

                        $("body").append(zoomDialog);

                        $(".zoomDialog").css('left', event.clientX-80);
                        $(".zoomDialog").css('top', event.clientY-5);

                        $(".zoomDialog").mouseleave(function() {
                            $(".zoomDialog").remove();
                        });

                        $(".zoomClose").click(function() {
                            $(".zoomDialog").remove();
                        });

                        $('#zoomscale').click(function (e) {
                            //logic to zoom to layer scale
                            var layerMinScale = map.getLayer(layerToChange).minScale;
                            map.setScale(layerMinScale);
                        });

                        $("#zoomcenter").click(function (e){
                            //logic to zoom to layer center
                            //var layerCenter = map.getLayer(layerToChange).fullExtent.getCenter();
                            //map.centerAt(layerCenter);
                            var dataCenter = new Point(defaultMapCenter, new SpatialReference({wkid:4326}));
                            map.centerAt(dataCenter);

                        });

                        $("#zoomextent").click(function (e){
                            //logic to zoom to layer extent
                            var layerExtent = map.getLayer(layerToChange).fullExtent;
                            map.setExtent(layerExtent);
                        });
                    });
                    //end zoomto logic

                }
            }

            else {
                //otherwise append
                $('#toggle').append(button);
            }
        }


        //get visible and non visible layer lists
        function addMapServerLegend(layerName, layerDetails) {


            if (layerDetails.wimOptions.layerType === 'agisFeature') {

                //for feature layer since default icon is used, put that in legend
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisWMS') {

                //for WMS layers, for now just add layer title
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="http://placehold.it/25x41" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisDynamic') {

                //create new legend div
                var legendItemDiv = $('<div align="left" id="' + camelize(layerName) + '"><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItemDiv);



                //get legend REST endpoint for swatch
                $.getJSON(layerDetails.url + '/legend?f=json', function (legendResponse) {

                    console.log(layerName,'legendResponse',legendResponse);

                    //make list of layers for legend
                    if (layerDetails.options.layers) {
                        // console.log(layerName, 'has visisble layers property')
                        //if there is a layers option included, use that
                        var visibleLayers = layerDetails.options.layers;
                    }
                    else {
                        //console.log(layerName, 'no visible layers property',  legendResponse)

                        //create visibleLayers array with everything
                        var visibleLayers = [];
                        $.grep(legendResponse.layers, function(i,v) {
                            visibleLayers.push(v);
                        });
                    }

                    //loop over all map service layers
                    $.each(legendResponse.layers, function (i, legendLayer) {

                        //var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong>');
                        //$('#' + camelize(layerName)).append(legendHeader);

                        //sub-loop over visible layers property
                        $.each(visibleLayers, function (i, visibleLayer) {

                            //console.log(layerName, 'visibleLayer',  visibleLayer);

                            if (visibleLayer == legendLayer.layerId) {

                                console.log(layerName, visibleLayer,legendLayer.layerId, legendLayer)

                                //console.log($('#' + camelize(layerName)).find('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>'))

                                var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>');
                                $('#' + camelize(layerName)).append(legendHeader);

                                //get legend object
                                var feature = legendLayer.legend;
                                /*
                                 //build legend html for categorized feautres
                                 if (feature.length > 1) {
                                 */

                                //placeholder icon
                                //<img alt="Legend Swatch" src="http://placehold.it/25x41" />

                                $.each(feature, function () {

                                    //make sure there is a legend swatch
                                    if (this.imageData) {
                                        var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + this.imageData + '" /><small>' + this.label.replace('<', '').replace('>', '') + '</small></br>');

                                        $('#' + camelize(layerName)).append(legendFeature);
                                    }
                                });
                                /*
                                 }
                                 //single features
                                 else {
                                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>&nbsp;&nbsp;' + legendLayer.layerName + '</small></br>');

                                 //$('#legendDiv').append(legendItem);
                                 $('#' + camelize(layerName)).append(legendFeature);

                                 }
                                 */
                            }
                        }); //each visible layer
                    }); //each legend item
                }); //get legend json
            }
        }
        /* parse layers.js */

        var legend = new Legend({
            map: map,
            layerInfos: legendLayers
        }, "legendDiv");
        legend.startup();

    });//end of require statement containing legend building code


});

$(document).ready(function () {
    //7 lines below are handler for the legend buttons. to be removed if we stick with the in-map legend toggle
    //$('#legendButtonNavBar, #legendButtonSidebar').on('click', function () {
    //    $('#legend').toggle();
    //    //return false;
    //});
    //$('#legendClose').on('click', function () {
    //    $('#legend').hide();
    //});


});
$('body').text( $('body').text().replace("●", ''));
