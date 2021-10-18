//for jshint
"use strict";
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 */ //

var map;
var dialog;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var dragInfoWindows = false;
var defaultMapCenter = [-95.6, 38.6];

var printCount = 0;

var siteAttr;
var siteDatumInfo = [];

var results;

var gridInfos = [];
var grid1Infos;
var grid2Infos;
var grid3Infos;
var grid4Infos;
var gridLayerIndex;
var gridLayerIndexArrColl = [];

var gridsArray = [1, 2, 3, 4];

var siteClick;

var extentResults = null;
var libExtent = null;

var siteNo;
var siteNo_2;
var siteNo_3;
var ahpsID;
var ahpsID_2;
var ahpsID_3;
var pcode;
var pcode_2;
var pcode_3;
var pcodeAbbr;

var fimSiteAHPSLookup = [];

var gageValues = [];
var gageValues2 = [];
var gageValues3 = [];
var altitudeValues = [];
var altitudeValues2 = [];
var altitudeValues3 = [];
var dischargeValues = [];
var dischargeValues2 = [];
var dischargeValues3 = [];
var gagePairs = [];

var loadedInitialLibrary = false;

var majorCount = 0;
var moderateCount = 0;
var minorCount = 0;
var actionCount = 0;
var nofloodCount = 0;
var currentBasemap;

var sitesLayerPrint;

var allAnnualChart;
var topTenChart;

var usStates = [
  { name: "ALABAMA", abbreviation: "AL" },
  { name: "ALASKA", abbreviation: "AK" },
  { name: "AMERICAN SAMOA", abbreviation: "AS" },
  { name: "ARIZONA", abbreviation: "AZ" },
  { name: "ARKANSAS", abbreviation: "AR" },
  { name: "CALIFORNIA", abbreviation: "CA" },
  { name: "COLORADO", abbreviation: "CO" },
  { name: "CONNECTICUT", abbreviation: "CT" },
  { name: "DELAWARE", abbreviation: "DE" },
  { name: "DISTRICT OF COLUMBIA", abbreviation: "DC" },
  { name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM" },
  { name: "FLORIDA", abbreviation: "FL" },
  { name: "GEORGIA", abbreviation: "GA" },
  { name: "GUAM", abbreviation: "GU" },
  { name: "HAWAII", abbreviation: "HI" },
  { name: "IDAHO", abbreviation: "ID" },
  { name: "ILLINOIS", abbreviation: "IL" },
  { name: "INDIANA", abbreviation: "IN" },
  { name: "IOWA", abbreviation: "IA" },
  { name: "KANSAS", abbreviation: "KS" },
  { name: "KENTUCKY", abbreviation: "KY" },
  { name: "LOUISIANA", abbreviation: "LA" },
  { name: "MAINE", abbreviation: "ME" },
  { name: "MARSHALL ISLANDS", abbreviation: "MH" },
  { name: "MARYLAND", abbreviation: "MD" },
  { name: "MASSACHUSETTS", abbreviation: "MA" },
  { name: "MICHIGAN", abbreviation: "MI" },
  { name: "MINNESOTA", abbreviation: "MN" },
  { name: "MISSISSIPPI", abbreviation: "MS" },
  { name: "MISSOURI", abbreviation: "MO" },
  { name: "MONTANA", abbreviation: "MT" },
  { name: "NEBRASKA", abbreviation: "NE" },
  { name: "NEVADA", abbreviation: "NV" },
  { name: "NEW HAMPSHIRE", abbreviation: "NH" },
  { name: "NEW JERSEY", abbreviation: "NJ" },
  { name: "NEW MEXICO", abbreviation: "NM" },
  { name: "NEW YORK", abbreviation: "NY" },
  { name: "NORTH CAROLINA", abbreviation: "NC" },
  { name: "NORTH DAKOTA", abbreviation: "ND" },
  { name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP" },
  { name: "OHIO", abbreviation: "OH" },
  { name: "OKLAHOMA", abbreviation: "OK" },
  { name: "OREGON", abbreviation: "OR" },
  { name: "PALAU", abbreviation: "PW" },
  { name: "PENNSYLVANIA", abbreviation: "PA" },
  { name: "PUERTO RICO", abbreviation: "PR" },
  { name: "RHODE ISLAND", abbreviation: "RI" },
  { name: "SOUTH CAROLINA", abbreviation: "SC" },
  { name: "SOUTH DAKOTA", abbreviation: "SD" },
  { name: "TENNESSEE", abbreviation: "TN" },
  { name: "TEXAS", abbreviation: "TX" },
  { name: "UTAH", abbreviation: "UT" },
  { name: "VERMONT", abbreviation: "VT" },
  { name: "VIRGIN ISLANDS", abbreviation: "VI" },
  { name: "VIRGINIA", abbreviation: "VA" },
  { name: "WASHINGTON", abbreviation: "WA" },
  { name: "WEST VIRGINIA", abbreviation: "WV" },
  { name: "WISCONSIN", abbreviation: "WI" },
  { name: "WYOMING", abbreviation: "WY" },
];

require([
  "esri/arcgis/utils",
  "esri/Color",
  "esri/map",
  "esri/dijit/Geocoder",
  "esri/dijit/HomeButton",
  "esri/dijit/LocateButton",
  "esri/dijit/PopupTemplate",
  "esri/dijit/Scalebar",
  "esri/geometry/Extent",
  "esri/geometry/Multipoint",
  "esri/geometry/Point",
  "esri/geometry/screenUtils",
  "esri/geometry/webMercatorUtils",
  "esri/graphic",
  "esri/lang",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/layers/FeatureLayer",
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/tasks/IdentifyParameters",
  "esri/tasks/IdentifyTask",
  "esri/tasks/LegendLayer",
  "esri/tasks/PrintTask",
  "esri/tasks/PrintParameters",
  "esri/tasks/PrintTemplate",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "dijit/popup",
  "dijit/TooltipDialog",
  "dojo/dnd/Moveable",
  "dojo/query",
  "dojo/dom",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/on",
  "dojo/domReady!",
], function (
  arcgisUtils,
  Color,
  Map,
  Geocoder,
  HomeButton,
  LocateButton,
  PopupTemplate,
  Scalebar,
  Extent,
  Multipoint,
  Point,
  screenUtils,
  webMercatorUtils,
  Graphic,
  esriLang,
  ArcGISTiledMapServiceLayer,
  FeatureLayer,
  UniqueValueRenderer,
  PictureMarkerSymbol,
  SimpleFillSymbol,
  IdentifyParameters,
  IdentifyTask,
  LegendLayer,
  PrintTask,
  PrintParameters,
  PrintTemplate,
  esriQuery,
  QueryTask,
  dijitPopup,
  TooltipDialog,
  Moveable,
  query,
  dom,
  domClass,
  domStyle,
  on
) {
  //bring this line back after experiment////////////////////////////
  ////allLayers = mapLayers;

  esriConfig.defaults.io.corsEnabledServers.push("fim.wim.usgs.gov");
  esriConfig.defaults.io.corsEnabledServers.push("fimtest.wim.usgs.gov");
  esriConfig.defaults.io.corsEnabledServers.push("fimnew.wim.usgs.gov");
  esriConfig.defaults.io.corsEnabledServers.push("gis.wim.usgs.gov");
  esri.config.defaults.io.proxyUrl = proxyUrl;

  var lods = [
    { level: 0, resolution: 156543.03392800014, scale: 591657527.591555 },
    { level: 1, resolution: 78271.51696399994, scale: 295828763.795777 },
    { level: 2, resolution: 39135.75848200009, scale: 147914381.897889 },
    { level: 3, resolution: 19567.87924099992, scale: 73957190.948944 },
    { level: 4, resolution: 9783.93962049996, scale: 36978595.474472 },
    { level: 5, resolution: 4891.96981024998, scale: 18489297.737236 },
    { level: 6, resolution: 2445.98490512499, scale: 9244648.868618 },
    { level: 7, resolution: 1222.992452562495, scale: 4622324.434309 },
    { level: 8, resolution: 611.4962262813797, scale: 2311162.217155 },
    { level: 9, resolution: 305.74811314055756, scale: 1155581.108577 },
    { level: 10, resolution: 152.87405657041106, scale: 577790.554289 },
    { level: 11, resolution: 76.43702828507324, scale: 288895.277144 },
    { level: 12, resolution: 38.21851414253662, scale: 144447.638572 },
    { level: 13, resolution: 19.10925707126831, scale: 72223.819286 },
    { level: 14, resolution: 9.554628535634155, scale: 36111.909643 },
    { level: 15, resolution: 4.77731426794937, scale: 18055.954822 },
    { level: 16, resolution: 2.388657133974685, scale: 9027.977411 },
    { level: 17, resolution: 1.1943285668550503, scale: 4513.988705 },
    { level: 18, resolution: 0.5971642835598172, scale: 2256.994353 },
    { level: 19, resolution: 0.29858214164761665, scale: 1128.497176 },
  ];

  map = Map("mapDiv", {
    basemap: "topo",
    touchZoom: true,
    //center: [-95.6, 38.6],
    center: defaultMapCenter,
    dragging: true,
    //extent: new Extent({xmin:-13876072.366774123,ymin:3500204.399233875,xmax:-7413780.247433899,ymax:6324093.972200677,spatialReference:{wkid:102100}}),
    //fitExtent: true,
    zoom: 5,
    logo: false,
    lods: lods,
  });

  //button for returning to initial extent
  var home = new HomeButton(
    {
      map: map,
    },
    "homeButton"
  );
  home.startup();

  //button for finding and zooming to user's location
  var locate = new LocateButton(
    {
      map: map,
    },
    "locateButton"
  );
  locate.startup();

  //scalebar
  var scalebar = new Scalebar({
    map: map,
    scalebarUnit: "dual",
  });

  var url_string = window.location;
  var site_no_param = "";
  if (url_string.search != undefined) {
    var params = url_string.search;
    if (params.search("site_no") != -1) {
      site_no_param = params.split("site_no=")[1];
    }
  }

  map.on("extent-change", function (evt) {
    if (site_no_param != "") {
      var fim_sites = map.graphics.graphics;
      $.each(fim_sites, function (index, value) {
        if (
          value.attributes != undefined &&
          value.attributes.SITE_NO == site_no_param
        ) {
          var screenPoint = screenUtils.toScreenGeometry(
            map.extent,
            map.width,
            map.height,
            value.geometry
          );
          var event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            x: screenPoint.x,
            y: screenPoint.y,
          });
          var e = new jQuery.Event("click");
          e.pageX = 1305;
          e.pageY = 327;
          $(value)[0].trigger("click");
        }
      });
    }

    if (map.getLevel() > 17) {
      $(".zoom-disclaimer").show();
    } else {
      $(".zoom-disclaimer").hide();
    }
  });

  //following block forces map size to override problems with default behavior
  $(window).resize(function () {
    // if ($("#legendCollapse").hasClass('in')) {
    //     maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
    //     $('#legendElement').css('height', maxLegendHeight);
    //     $('#legendElement').css('max-height', maxLegendHeight);
    //     maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
    //     $('#legendDiv').css('max-height', maxLegendDivHeight);
    // }
    // else {
    //     $('#legendElement').css('height', 'initial');
    // }
    /*if ($("#floodToolsDiv").css("visibility") == "visible") {
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
                $("#floodToolsDiv").each(function() {
                    $(this).find("*").height("100%");
                });
                highChartHeight = $("#floodToolsDiv").height() - 50;
            }
            if (docWidth < 500) {
                $("#floodToolsDiv").width(floodToolsWidth);
                $("#floodToolsDiv").each(function() {
                    $(this).find("*").width("100%");
                });
                highChartWidth = $("#floodToolsDiv").width() - 50;
            }

            var instanceX = docWidth*0.5-$("#floodToolsDiv").width()*0.5;
            var instanceY = docHeight*0.5-$("#floodToolsDiv").height()*0.5;

            instance.setPosition(instanceX, instanceY);
        }*/
  });

  $("#aboutModal").modal("show");
  $("#disclaimerTab").trigger("click");

  function showPrintModal() {
    $("#printModal").modal("show");
    map.getLayer("fimSitesPrint").setVisibility(true);
    map.getLayer("fimSites").setVisibility(false);
  }

  $("#printNavButton").click(function () {
    showPrintModal();
  });

  $("#printExecuteButton").click(function (e) {
    e.preventDefault();
    $(this).button("loading");
    printMap();
  });

  $("#printModal").on("click", function (evt) {
    if (
      evt.target == this ||
      $(evt.target).attr("class") == "close" ||
      evt.target.id == "printDismissButton"
    ) {
      //alert("Close the Print Modal")
      var sitesLayerPrint = map.getLayer("fimSites");
      sitesLayerPrint.setVisibility(true);
      map.reorderLayer(sitesLayerPrint, 1000);
      map.getLayer("fimSitesPrint").setVisibility(false);
    } else {
      //alert("Don't close the Print Modal");
    }
  });

  $("#shareLink").click(function () {
    showShareModal();
  });

  function showShareModal() {
    $("#shareModal").modal("show");
    //create a URL query string with extent
    var shareQueryString = "?site_no=" + siteAttr.SITE_NO;
    var cleanURL = document.location.href;
    cleanURL = cleanURL.split("?")[0];
    //below line for local testing only. replace with above line for production
    //var cleanURL = "https://fim.wim.usgs.gov/fim-js-dev/";
    var shareURL = cleanURL + shareQueryString;
    $("#siteURL").html("<code>" + shareURL + "</code>");

    // Hidden Input for copy button
    var $temp = $("<input id='shareURLInput'>");
    $("body").append($temp);
    $temp.val(shareURL);
  }

  $("#copyShareURL").click(function () {
    // Copy hidden input text
    $("#shareURLInput").select();
    document.execCommand("copy");
    $("#shareURLInput").remove();

    $("#copyShareURL").addClass("success");
    $("#copyShareURL").html("Link Copied to Clipboard");
    setTimeout(function () {
      $("#copyShareURL").removeClass("success");
      $("#copyShareURL").html("Copy Link");
    }, 5000);
  });

  dialog = new TooltipDialog({
    id: "tooltipDialog",
    style:
      "position: absolute; font: normal normal normal 10pt Helvetica;z-index:100",
  });
  dialog.startup();

  ///displays map scale on map load
  on(map, "load", function () {
    var scale = map.getScale().toFixed(0);
    $("#scale")[0].innerHTML = addCommas(scale);
    var initMapCenter = webMercatorUtils.webMercatorToGeographic(
      map.extent.getCenter()
    );
    $("#latitude").html(initMapCenter.y.toFixed(3));
    $("#longitude").html(initMapCenter.x.toFixed(3));

    //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
    if (dragInfoWindows == true) {
      var handle = query(".title", map.infoWindow.domNode)[0];
      var dnd = new Moveable(map.infoWindow.domNode, {
        handle: handle,
      });

      // when the infoWindow is moved, hide the arrow:
      on(
        dnd,
        "FirstMove",
        function () {
          // hide pointer and outerpointer (used depending on where the pointer is shown)
          var arrowNode = query(".outerPointer", map.infoWindow.domNode)[0];
          domClass.add(arrowNode, "hidden");

          var arrowNode = query(".pointer", map.infoWindow.domNode)[0];
          domClass.add(arrowNode, "hidden");
        }.bind(this)
      );
    }
    map.infoWindow.set("highlight", true);
    $('[class^="scalebar"]').attr("bottom", "40px");
  });

  function closeDialog() {
    dijitPopup.close(dialog);
  }

  //displays map scale on scale change (i.e. zoom level)
  on(map, "zoom-end", function () {
    var scale = map.getScale().toFixed(0);
    $("#scale")[0].innerHTML = addCommas(scale);
  });

  //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
  on(map, "mouse-move", function (cursorPosition) {
    $("#mapCenterLabel").css("display", "none");
    if (cursorPosition.mapPoint != null) {
      var geographicMapPt = webMercatorUtils.webMercatorToGeographic(
        cursorPosition.mapPoint
      );
      $("#latitude").html(geographicMapPt.y.toFixed(3));
      $("#longitude").html(geographicMapPt.x.toFixed(3));
    }
  });
  //updates lat/lng indicator to map center after pan and shows "map center" label.
  on(map, "pan-end", function () {
    //displays latitude and longitude of map center
    $("#mapCenterLabel").css("display", "inline");
    var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(
      map.extent.getCenter()
    );
    $("#latitude").html(geographicMapCenter.y.toFixed(3));
    $("#longitude").html(geographicMapCenter.x.toFixed(3));
  });

  var nationalMapBasemap = new ArcGISTiledMapServiceLayer(
    "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",
    { id: "tnm" }
  );
  //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
  on(dom.byId("btnStreets"), "click", function () {
    map.setBasemap("streets");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnSatellite"), "click", function () {
    map.setBasemap("satellite");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnHybrid"), "click", function () {
    map.setBasemap("hybrid");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnTerrain"), "click", function () {
    map.setBasemap("terrain");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnGray"), "click", function () {
    map.setBasemap("gray");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnNatGeo"), "click", function () {
    map.setBasemap("national-geographic");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnOSM"), "click", function () {
    map.setBasemap("osm");
    map.removeLayer(nationalMapBasemap);
  });
  on(dom.byId("btnTopo"), "click", function () {
    map.setBasemap("topo");
    map.removeLayer(nationalMapBasemap);
  });

  on(dom.byId("btnNatlMap"), "click", function () {
    map.setBasemap("topo");
    map.addLayer(nationalMapBasemap, 1);
  });

  map.on("basemap-change", function (evt) {
    if (evt.current.basemapName != "hybrid") {
      $("#satCheckBox").prop("checked", false);
    } else {
      $("#satCheckBox").prop("checked", true);
    }
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
    width: 800,
    height: 500,
    maxWidth: 800,
    maxHeight: 500,
  });

  $("#floodMin").click(function () {
    $("#floodToolsDiv").css("visibility", "hidden");
    //map.getLayer("fimExtents").setVisibility(false);
    $("#minFT").addClass("visible");

    $("#hydroChart, #hydroChart2, #hydroChart3").hide();
  });

  var closeFloodTools = function () {
    clearFTValues();
    map.getLayer("fimExtents").setVisibility(false);
    if (map.getLayer("fimGrid" + siteAttr.GRID_SERV) !== undefined) {
      map.getLayer("fimGrid" + siteAttr.GRID_SERV).setVisibility(false);
    }
    map.getLayer("fimBreach").setVisibility(false);
    map.getLayer("fimSuppLyrs").setVisibility(false);
    map.getLayer("fimExtentsMulti").setVisibility(false);
    map.getLayer("fimBreachMulti").setVisibility(false);
    map.getLayer("fimExtentsThreeSites").setVisibility(false);
    //REVISIT: when dealing with three sites breach
    //map.getLayer("fimBreachThreeSites").setVisibility(false);
    if ($("#hydroChart").highcharts() != null) {
      $("#hydroChart").highcharts().destroy();
    }
    if ($("#hydroChart2").highcharts() != null) {
      $("#hydroChart2").highcharts().destroy();
    }
    if ($("#hydroChart3").highcharts() != null) {
      $("#hydroChart3").highcharts().destroy();
    }
    map.infoWindow.hide();
  };

  // Reset and Clear values, hide things for next time
  var clearFTValues = function () {
    $("#floodToolsDiv").fadeOut(90);
    setTimeout(function () {
      $("#floodToolsDiv").fadeIn(0);
      $("#floodToolsDiv").css("visibility", "hidden");
      $("#floodToolsDiv").addClass("loading-background");
      $("#floodToolsDiv .panel-heading").addClass("loading-hide");
      $("#floodToolsDiv .panel-body").addClass("loading-hide");
      $("#floodToolsDiv").addClass("loading-background");
    }, 90);

    // Hide error message
    $("#floodToolsErrorMessage").hide();
    $(".floodSlider").each(function (index) {
      this.value = 0;
      this.min = 0;
      this.max = 0;
    });
    $(".slider-min").text("");
    $(".slider-max").text("");
    $(".sliderWhiteSpace").css("width", "0%");
    $(".sliderActionLevel").css("width", "0%");
    $(".sliderMinorLevel").css("width", "0%");
    $(".sliderModerateLevel").css("width", "0%");
    $(".sliderMajorLevel").css("width", "0%");
    $(".sliderExtendedLevel").css("width", "0%");
    $("#floodGage").text("");
    $("#floodDischarge").text("");
    $(".floodSlider").trigger("change");
  };

  // Close Flood Tools
  $("#floodClose").click(function () {
    closeFloodTools();
    $("#printExecuteButton").prop("disabled", true);
    $(".printWarning").show();
  });

  // Open flood tools or maximize from min
  $("#floodToolsOpen, #floodToolsMax").click(function () {
    $("#hydroChart").delay(500).show();
    if (siteAttr.MULTI_SITE == 1) {
      $("#hydroChart2").delay(500).show();
    }
    if (siteAttr.MULTI_SITE > 1) {
      $("#hydroChart2").delay(500).show();
      $("#hydroChart3").delay(500).show();
    }
    $("#floodToolsDiv").css("visibility", "visible");
    $("#minFT").removeClass("visible");
  });

  // Click Water Alert Link
  $("#waterAlertLink").click(function () {
    $("#waterAlertLink").attr(
      "href",
      "https://water.usgs.gov/wateralert/subscribe/?fim=1&intro=1&site_no=" +
        siteAttr.SITE_NO +
        "&agency_cd=USGS&type_cd=st&parms=" +
        siteAttr.PCODE +
        ":" +
        results[$(".fts1 #floodSlider")[0].value].attributes["STAGE"]
    );
    $("#waterAlertLink").click();
  });

  // Click disclaimer link, show disclaimer
  $("#disclaimerLink").click(function () {
    $("#aboutModal").modal("show");
    $("#disclaimerTab").trigger("click");
  });

  // =======================================================
  // UI Functions
  // UI Functions
  // UI Functions
  // =======================================================
  $("#viewFullHazus").click(function () {
    $("#hazusTable").addClass("full-hazus");
    $(this).hide();
    $("#hideFullHazus").show();
    $("#hazusRangeInfo").hide();
  });
  $("#hideFullHazus").click(function () {
    $("#hazusTable").removeClass("full-hazus");
    $(this).hide();
    $("#viewFullHazus").show();

    if ($("#hazusTable").find("tr.active").length) {
      $("#hazusRangeInfo").hide();
    } else {
      $("#hazusRangeInfo").show();
    }
  });

  // Dismiss mobile FT warning
  $("#dismissMobileFTWarning").click(function () {
    $(".ft-mboile-warning").remove();
  });

  // Flood Tools Tabs
  // Flood Tools Tabs
  // Flood Tools Tabs
  $(".ft-tab").click(function () {
    $(".ft-tab").removeClass("active");
    $(this).addClass("active");
    var toggleID = $(this).attr("data-toggle").toString();
    $(".ftmodal-content")
      .not("#" + toggleID)
      .hide();
    $("#" + toggleID).show();
  });

  // Historical Tabs
  $("#topTen").click(function () {
    $("#allAnnual").removeClass("active");
    $(this).addClass("active");
    $("#topTenContent").show();
    $("#allAnnualContent").hide();
  });
  $("#allAnnual").click(function () {
    $("#topTen").removeClass("active");
    $(this).addClass("active");
    $("#allAnnualContent").show();
    $("#topTenContent").hide();
  });

  //map.getLayer("fimGrid2").on("load", gridsLayerComp);

  map.on("layer-add", function (evt) {
    var layer = evt.layer.id;
    var actualLayer = evt.layer;

    if (layer == "fimSites") {
      var initialSiteLoad = map
        .getLayer(layer)
        .on("update-end", function (evt) {
          /*on(evt.target, "mouse-out", closeDialog);

                on(evt.target, "mouse-over", function(evt){
                    var t = "${STATE}: ${COMMUNITY}";

                    var content = esriLang.substitute(evt.graphic.attributes,t);
                    dialog.setContent(content);

                    dijitPopup.open({
                        popup: dialog,
                        x: evt.pageX,
                        y: evt.pageY
                    });
                });*/

          //Code to retrieve all ahps IDs for fim sites to make request for flood condition from nws
          var ahpsIds = [];
          var graphics = evt.target.graphics;
          $.each(graphics, function (index, feature) {
            if (feature.attributes["AHPS_ID"] != null) {
              ahpsIds.push(
                "'" + feature.attributes["AHPS_ID"].toUpperCase() + "'"
              );
              if (feature.attributes["Public"] == 2) {
                feature.hide();
              }
              //code to build look up array for use with multi-site libraries that can be used to make requests for multi-site nws predicted data
              fimSiteAHPSLookup.push({
                site_no: feature.attributes.SITE_NO,
                ahps_id: feature.attributes.AHPS_ID,
              });
            }
          });

          //map.getLayer(layer).attr("flood_condition", "_blank_");
          //map.getLayer(layer).refresh();

          //ahpsIds.map(function(x){ return x.toUpperCase() })

          $.ajax({
            dataType: "json",
            type: "GET",
            url:
              ahpsForecastUrl +
              "/query?returnGeometry=false&where=GaugeLID%20in%20%28" +
              ahpsIds +
              "%29&outFields=status%2Cgaugelid&f=json",
            headers: { Accept: "*/*" },
            success: function (data) {
              var floodAttr = data.features;

              var i;

              for (i = 0; i < floodAttr.length; i++) {
                for (var j = 0; j < graphics.length; j++) {
                  //console.log(floodAttr[i].attributes.gaugelid.toLowerCase() + " : " + map.getLayer(layer).graphics[j].attributes.AHPS_ID)
                  if (
                    map.getLayer(layer).graphics[j].attributes.AHPS_ID ==
                    floodAttr[i].attributes.gaugelid.toLowerCase()
                  ) {
                    map.getLayer(layer).graphics[j].attributes.FLOOD_CONDITION =
                      floodAttr[i].attributes.status;
                    /*console.log(floodAttr[i].attributes.status);
                                    if (map.getLayer(layer).graphics[j].attributes.AHPS_ID == "cpei3") {
                                        console.log('here');
                                    }*/
                  }
                }
              }

              var symWidth = 15.88;
              var symHeight = 13;

              var defaultSym = new PictureMarkerSymbol(
                "./images/default.png",
                symWidth,
                symHeight
              );
              var actionSym = new PictureMarkerSymbol(
                "./images/action.png",
                symWidth,
                symHeight
              );
              var majorSym = new PictureMarkerSymbol(
                "./images/major.png",
                symWidth,
                symHeight
              );
              var minorSym = new PictureMarkerSymbol(
                "./images/minor.png",
                symWidth,
                symHeight
              );
              var moderateSym = new PictureMarkerSymbol(
                "./images/moderate.png",
                symWidth,
                symHeight
              );
              var no_floodingSym = new PictureMarkerSymbol(
                "./images/no_flooding.png",
                symWidth,
                symHeight
              );

              var sitesRenderer = new UniqueValueRenderer(
                defaultSym,
                "FLOOD_CONDITION"
              );
              sitesRenderer.addValue("action", actionSym);
              sitesRenderer.addValue("major", majorSym);
              sitesRenderer.addValue("minor", minorSym);
              sitesRenderer.addValue("moderate", moderateSym);
              sitesRenderer.addValue("no_flooding", no_floodingSym);

              //map.getLayer(layer).setRenderer(sitesRenderer);

              /*for (var i=0; i < map.getLayer(layer).graphics.length; i++) {
                            //map.graphics.add(map.getLayer(layer).graphics[i]);
                        }*/
              map.getLayer(layer).setRenderer(sitesRenderer);
              map.getLayer(layer).redraw();
              //map.getLayer(layer).refresh();
              //var mapLevel = map.getLevel();
              //map.setLevel(mapLevel - 1);
              //map.setLevel(mapLevel);

              initialSiteLoad.remove();
              $("#usgs-loader").hide();

              if (site_no_param != "") {
                var fim_sites = map.getLayer(layer).graphics;
                $.each(fim_sites, function (index, value) {
                  if (
                    value.attributes != undefined &&
                    value.attributes.SITE_NO == site_no_param
                  ) {
                    /*var screenPoint = screenUtils.toScreenGeometry(map.extent, map.width, map.height, value.geometry);
                                    var event = new MouseEvent('click', {
                                        'view': window,
                                        'bubbles': false,
                                        'cancelable': true
                                    });*/
                    var graphic = value;
                    //$(graphic)[0].trigger('click');
                    graphic._shape.rawNode.id = site_no_param;
                    $("#" + site_no_param).on("click", siteClick);
                    $("#" + site_no_param).trigger("click");
                  }
                });
              }
            },
            error: function (error) {
              console.log("Error processing the JSON. The error is:" + error);
            },
          });

          /*if (site_no_param != "") {

                    var query = new esriQuery(); // Create a Query Object
                    query.where = "SITE_NO = " + site_no_param; // Select the first point from the Feature Layer
                    query.returnGeometry = true;

                    var selectionSymbol = new SimpleFillSymbol().setColor(new Color([255,255,0,0.5]));;
                    map.getLayer(layer).setSelectionSymbol(selectionSymbol);

                    map.getLayer(layer).selectFeatures(query, FeatureLayer.SELECTION_NEW);*/

          /*var fim_sites = graphics;
                    $.each(fim_sites, function(index, value) {
                        if (value.attributes != undefined && value.attributes.SITE_NO == site_no_param) {
                            var screenPoint = screenUtils.toScreenGeometry(map.extent, map.width, map.height, value.geometry);
                            var event = new MouseEvent('click', {
                                'view': window,
                                'bubbles': true,
                                'cancelable': true,
                                'x': screenPoint.x,
                                'y': screenPoint.y
                            });
                            var graphic = value;
                            //$(graphic).trigger('click');
                            var e = new jQuery.Event("click");
                            e.screenX = screenPoint.x;
                            e.screenY = screenPoint.y;
                            $(window).trigger(e);
                            map.graphics.graphics[index].emit("click", {
                                bubbles: true,
                                cancelable: true
                            });
                        }
                    });
                }*/
        });

      var siteClick = function (evt) {
        console.log("Site Clicked");
        $("#floodToolsErrorMessage").hide();

        var feature;
        if (evt.graphic != undefined) {
          feature = evt.graphic;
        } else {
          feature = evt.target.e_graphic;
        }
        var attr = feature.attributes;
        siteAttr = attr;

        $("#depth_grids_legend_title").hide();
        $("#aou_grids_legend_title").hide();

        if (siteAttr["MULTI_SITE"] == 0) {
          $(".fts2").hide();
          $(".fts3").hide();
          $("#ftSliders").attr("class", "onesite");
          sitePopup(evt);
        } else if (siteAttr["MULTI_SITE"] > 0) {
          // Add classes for multi site
          $("#minFT").addClass("multisite");

          if (siteAttr["MULTI_SITE"] == 1) {
            $(".fts2").show();
            $(".fts3").hide();
            $("#ftSliders").attr("class", "twosite");
          } else if (siteAttr["MULTI_SITE"] == 3) {
            $(".fts2").show();
            $(".fts3").show();
            $("#ftSliders").attr("class", "threesite");
          }

          var multiSitesQuery = new esriQuery();
          multiSitesQuery.returnGeometry = false;
          multiSitesQuery.where = "site_no =" + siteAttr["SITE_NO"];
          multiSitesQuery.outFields = ["combo_id"];
          var multiSitesQueryTask;
          if (siteAttr["MULTI_SITE"] == 1) {
            multiSitesQueryTask = new QueryTask(floodExtentsMultiTableUrl);
          } else if (siteAttr["MULTI_SITE"] == 3) {
            multiSitesQueryTask = new QueryTask(
              floodExtentsMultiThreeSitesTableUrl
            );
          }

          multiSitesQueryTask.execute(multiSitesQuery, multiSitesResult);

          function multiSitesResult(featureSet) {
            var multiQuery = new esriQuery();
            multiQuery.returnGeometry = false;
            multiQuery.where =
              "combo_id = " + featureSet.features[0].attributes.combo_id;
            multiQuery.outFields = ["site_no,combo_id,ordinal"];

            var multiQueryTask;
            if (siteAttr["MULTI_SITE"] == 1) {
              multiQueryTask = new QueryTask(floodExtentsMultiTableUrl);
            } else if (siteAttr["MULTI_SITE"] == 3) {
              multiQueryTask = new QueryTask(
                floodExtentsMultiThreeSitesTableUrl
              );
            }
            multiQueryTask.execute(multiQuery, multiInitResult);

            function multiInitResult(featureSet) {
              sitePopup(evt, featureSet);
            }
          }
        }
      };

      var sitePopup = function (evt, sites = null) {
        var feature;
        if (evt.graphic != undefined) {
          feature = evt.graphic;
        } else {
          feature = evt.target.e_graphic;
        }
        var attr = feature.attributes;
        siteAttr = attr;

        function getPCODE(siteno) {
          var pcode;

          var allSites = map.getLayer("fimSites").graphics;

          $.each(allSites, function (index, site) {
            if (site.attributes.SITE_NO == siteno) {
              pcode = site.attributes.PCODE;
            }
          });

          return pcode;
        }

        if (sites && sites.features.length > 1) {
          siteNo_2 = null;
          siteNo_3 = null;
          ahpsID_2 = null;
          ahpsID_3 = null;
          pcode_2 = null;
          pcode_3 = null;

          // need to find way to find and assign PCODE for all three sites
          //
          //
          //
          //
          //
          /*


                            lk;hj   lkjhk;h;
                            ;ajsdlkjfa;sd
                            g
                            arg;ilas;dgjhs;ldkfgjs
                            dfga
                            sdjg;aljhg;alkdfjga
                            sdga'dfhgalk;dhfg;lsjhdfg
                            asdghwekhek;rqhwerkjhqeglhasd
                            g
                            df'tr'lwejg'werigj



                    */
          for (var i = 0; i < sites.features.length; i++) {
            if (sites.features[i].attributes.ordinal == 1) {
              siteNo = sites.features[i].attributes.site_no;
              if (siteNo.toString().length == 7) {
                siteNo = "0" + siteNo;
              } else {
                siteNo = sites.features[i].attributes.site_no;
              }
              var siteObj = fimSiteAHPSLookup.filter((obj) => {
                return obj.site_no === siteNo;
              });
              if (siteObj && siteObj[0] && siteObj[0].ahps_id) {
                ahpsID = siteObj[0].ahps_id;
              }
              pcode = getPCODE(siteNo);
              //pcode = "00060";
            } else if (sites.features[i].attributes.ordinal == 2) {
              siteNo_2 = sites.features[i].attributes.site_no;
              if (siteNo_2.toString().length == 7) {
                siteNo_2 = "0" + siteNo_2;
              } else {
                siteNo_2 = sites.features[i].attributes.site_no;
              }
              var siteObj = fimSiteAHPSLookup.filter((obj) => {
                return obj.site_no === siteNo_2;
              });
              if (siteObj && siteObj[0] && siteObj[0].ahps_id) {
                ahpsID_2 = siteObj[0].ahps_id;
              }
              pcode_2 = getPCODE(siteNo_2);
              //pcode_2 = "00060";
            } else if (sites.features[i].attributes.ordinal == 3) {
              siteNo_3 = sites.features[i].attributes.site_no;
              if (siteNo_3.toString().length == 7) {
                siteNo_3 = "0" + siteNo_3;
              } else {
                siteNo_3 = sites.features[i].attributes.site_no;
              }
              var siteObj = fimSiteAHPSLookup.filter((obj) => {
                return obj.site_no === siteNo_3;
              });
              if (siteObj && siteObj[0] && siteObj[0].ahps_id) {
                ahpsID_3 = siteObj[0].ahps_id;
              }
              pcode_3 = getPCODE(siteNo_3);
              //pcode_3 = "00060";
            }
          }
        } else {
          siteNo = siteAttr["SITE_NO"];
          pcode = siteAttr["PCODE"];
          siteNo_2 = null;
          siteNo_3 = null;
          ahpsID_2 = null;
          ahpsID_3 = null;
        }

        $("#minFT").slideUp(150);
        $("#floodToolsDiv .panel-heading").addClass("loading-hide");
        $("#floodToolsDiv .panel-body").addClass("loading-hide");
        $("#floodToolsDiv").addClass("loading-background");

        // // Default to Flood Tools Tab
        // $(".ftmodal-content").hide();
        // $("#ftTools").show();
        // $(".ft-tab").removeClass("active");
        // $("#ftDataTabs .ft-main-tab").addClass("active");

        results = null;
        getGridInfo();
        extentResults = null;
        gageValues = [];
        gageValues2 = [];
        gageValues3 = [];
        gagePairs = [];

        altitudeValues = [];
        altitudeValues2 = [];
        altitudeValues3 = [];

        map.getLayer("fimExtents").setVisibility(false);
        map.getLayer("fimExtentsMulti").setVisibility(false);
        map.getLayer("fimExtentsThreeSites").setVisibility(false);
        map.getLayer("fimBreach").setVisibility(false);
        map.getLayer("fimBreachMulti").setVisibility(false);

        //code to query related records for site and get logos and created/reviewed by cooperators
        //first set anything that can be set with site attributes
        if (siteAttr.DATA_LINK.toLowerCase() == "none") {
          $("#downloadData").hide();
          $("#noDownloadData").show();
        } else {
          $("#noDownloadData").hide();
          $("#downloadData").show();
          $("#downloadData").attr("href", siteAttr.DATA_LINK);
        }

        //code for showing or hiding report thumbnail
        if (siteAttr.REP_THUMB != "NONE") {
          $("#reportCover").attr("href", siteAttr.REP_LINK);
          $("#reportCover img").attr("src", siteAttr.REP_THUMB);
          $("#reportCover").show();
        } else {
          $("#reportCover").hide();
        }

        // $("#reportCover").off("click").click(function() {
        //     window.open(siteAttr.REP_LINK);
        // });

        //code to add report link or text saying no report available
        if (siteAttr.REP_LINK != "NONE") {
          $("#downloadReport").html(
            "<a id='downloadReport' target='_blank' class='ft-button' href='" +
              siteAttr.REP_LINK +
              "'>Download report</a>"
          );
        } else {
          $("#downloadReport").text(
            "Report not currently available for this site."
          );
        }

        $("#mapsCreatedBy").empty();
        $("#mapsReviewedBy").empty();
        $("#logos").empty();

        $("#gridsCheckBox").prop("checked", false);

        $("#aouCheckBox").prop("checked", true);
        if (siteAttr.HAS_BREACH == 1) {
          $("#aouCheck").show();
        } else {
          $("#aouCheck").hide();
        }

        $("#aouCheckBox").on("click", function (evt) {
          if (evt.currentTarget.checked == true) {
            if ($("#gridsCheckBox").prop("checked") == false) {
              if (siteAttr["MULTI_SITE"] == 0) {
                map.getLayer("fimBreach").setVisibility(true);
              } else if (siteAttr["MULTI_SITE"] == 1) {
                map.getLayer("fimBreachMulti").setVisibility(true);
              }
              $("#depth_grids_legend_title").hide();
              $("#aou_grids_legend_title").hide();
            } else {
              map.getLayer("fimBreach").setVisibility(false);
              map.getLayer("fimBreachMulti").setVisibility(false);
              var has_breach_grids = false;
              if (siteAttr["HAS_GRIDS"] == 1) {
                gridLayerIndexArrColl = [];

                if (siteAttr["MULTI_SITE"] == 0) {
                  for (var i = 0; i < gridInfos.length; i++) {
                    if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      Number(gridInfos[i].gridid) ==
                        results[$(".fts1 #floodSlider")[0].value].attributes[
                          "GRIDID"
                        ]
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                    } else if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      gridInfos[i].gridid ==
                        results[$(".fts1 #floodSlider")[0].value].attributes[
                          "GRIDID"
                        ] +
                          "b" &&
                      $("#aouCheckBox").prop("checked") == true
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                      has_breach_grids = true;
                    }
                  }
                } else if (siteAttr["MULTI_SITE"] == 1) {
                  var gridLayerID;
                  $.each(gagePairs, function (index, value) {
                    if (
                      value.STAGE_1 == gageValues[0].gageValue &&
                      value.STAGE_2 == gageValues2[0].gageValue
                    ) {
                      gridLayerID = value.GRIDID;
                    }
                  });
                  for (var i = 0; i < gridInfos.length; i++) {
                    if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      Number(gridInfos[i].gridid) == gridLayerID
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                    } else if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      gridInfos[i].gridid == gridLayerID + "b" &&
                      $("#aouCheckBox").prop("checked") == true
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                      has_breach_grids = true;
                    } else if ($("#aouCheckBox").prop("checked") == false) {
                    }
                  }
                } else if (siteAttr["MULTI_SITE"] == 3) {
                  var gridLayerID;
                  $.each(gagePairs, function (index, value) {
                    if (
                      value.STAGE_1 == gageValues[0].gageValue &&
                      value.STAGE_2 == gageValues2[0].gageValue &&
                      value.STAGE_3 == gageValues3[0].gageValue
                    ) {
                      gridLayerID = value.GRIDID;
                    }
                  });
                  for (var i = 0; i < gridInfos.length; i++) {
                    if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      Number(gridInfos[i].gridid) == gridLayerID
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                    } else if (
                      gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                      gridInfos[i].gridid == gridLayerID + "b" &&
                      $("#aouCheckBox").prop("checked") == true
                    ) {
                      gridLayerIndexArrColl.push(gridInfos[i].index);
                      gridLayerIndex = gridInfos[i].index;
                      has_breach_grids = true;
                    }
                  }
                }

                //set grids layer definitions/choose the right layer here and in next input change function
                console.log("grid stuff");
                var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
                var gridVisLayer = [];
                gridVisLayer.push(gridLayerIndexArrColl);
                map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
                map.getLayer(gridLayer).setVisibility(true);
                $("#depth_grids_legend_title").show();
                if (has_breach_grids == true) {
                  $("#aou_grids_legend_title").show();
                } else {
                  $("#aou_grids_legend_title").hide();
                  if (
                    siteAttr["MULTI_SITE"] == 0 &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    map.getLayer("fimBreach").setVisibility(true);
                  } else if ($("#aouCheckBox").prop("checked") == true) {
                    map.getLayer("fimBreachMulti").setVisibility(true);
                  }
                }
              }
            }
          } else if (evt.currentTarget.checked == false) {
            map.getLayer("fimBreach").setVisibility(false);
            map.getLayer("fimBreachMulti").setVisibility(false);
            if (
              siteAttr["HAS_GRIDS"] == 1 &&
              $("#gridsCheckBox").prop("checked") == true
            ) {
              gridLayerIndexArrColl = [];
              var has_breach_grids = false;
              if (siteAttr["MULTI_SITE"] == 0) {
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ]
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ] +
                        "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 1) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 == gageValues[0].gageValue &&
                    value.STAGE_2 == gageValues2[0].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 3) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 == gageValues[0].gageValue &&
                    value.STAGE_2 == gageValues2[0].gageValue &&
                    value.STAGE_3 == gageValues3[0].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              }

              //set grids layer definitions/choose the right layer here and in next input change function
              console.log("grid stuff");
              var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
              var gridVisLayer = [];
              gridVisLayer.push(gridLayerIndexArrColl);
              map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
              map.getLayer(gridLayer).setVisibility(true);
              $("#depth_grids_legend_title").show();
              if (has_breach_grids == true) {
                $("#aou_grids_legend_title").show();
              } else {
                $("#aou_grids_legend_title").hide();
                if (
                  siteAttr["MULTI_SITE"] == 0 &&
                  $("#aouCheckBox").prop("checked") == true
                ) {
                  map.getLayer("fimBreach").setVisibility(true);
                } else if ($("#aouCheckBox").prop("checked") == true) {
                  map.getLayer("fimBreachMulti").setVisibility(true);
                }
              }
            }
          }
        });

        //$('#gridsCheckBox').prop('checked', true);
        if (siteAttr.HAS_GRIDS == 1) {
          $("#gridsCheck").show();
        } else {
          $("#gridsCheck").hide();
        }

        $.each(gridsArray, function (item) {
          map.getLayer("fimGrid" + gridsArray[item]).setVisibility(false);
        });

        // REVISIT: need to adjust once displaying mutli site flood extents
        $("#gridsCheckBox, #gridsCheckBox2").on("click", function (evt) {
          if (evt.currentTarget.checked == true) {
            switch (siteAttr["MULTI_SITE"]) {
              case 0:
                map.getLayer("fimExtents").setVisibility(false);
                map.getLayer("fimBreach").setVisibility(false);
                break;
              case 1:
                map.getLayer("fimExtentsMulti").setVisibility(false);
                map.getLayer("fimBreachMulti").setVisibility(false);
                break;
              case 2 || 3:
                map.getLayer("fimExtentsThreeSites").setVisibility(false);
                break;
            }
            if (siteAttr["HAS_GRIDS"] == 1) {
              gridLayerIndexArrColl = [];
              var has_breach_grids = false;

              if (siteAttr["MULTI_SITE"] == 0) {
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ]
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ] +
                        "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 1) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 ==
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue &&
                    value.STAGE_2 ==
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 3) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 ==
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue &&
                    value.STAGE_2 ==
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue &&
                    value.STAGE_3 ==
                      gageValues3[$(".fts3 #floodSlider")[0].value].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                    has_breach_grids = true;
                  }
                }
              }

              //set grids layer definitions/choose the right layer here and in next input change function
              console.log("grid stuff");
              var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
              var gridVisLayer = [];
              gridVisLayer.push(gridLayerIndexArrColl);
              map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
              map.getLayer(gridLayer).setVisibility(true);
              $("#depth_grids_legend_title").show();
              if (has_breach_grids == true) {
                $("#aou_grids_legend_title").show();
              } else {
                $("#aou_grids_legend_title").hide();
                if (
                  siteAttr["MULTI_SITE"] == 0 &&
                  $("#aouCheckBox").prop("checked") == true
                ) {
                  map.getLayer("fimBreach").setVisibility(true);
                } else if ($("#aouCheckBox").prop("checked") == true) {
                  map.getLayer("fimBreachMulti").setVisibility(true);
                }
              }
            }
          } else if (evt.currentTarget.checked == false) {
            switch (siteAttr["MULTI_SITE"]) {
              case 0:
                map.getLayer("fimExtents").setVisibility(true);
                if ($("#aouCheckBox").prop("checked") == true) {
                  map.getLayer("fimBreach").setVisibility(true);
                }
                break;
              case 1:
                map.getLayer("fimExtentsMulti").setVisibility(true);
                if ($("#aouCheckBox").prop("checked") == true) {
                  map.getLayer("fimBreachMulti").setVisibility(true);
                }
                break;
              case 2 || 3:
                map.getLayer("fimExtentsThreeSites").setVisibility(true);
                break;
            }
            map.getLayer("fimGrid" + siteAttr.GRID_SERV).setVisibility(false);
            $("#depth_grids_legend_title").hide();
            $("#aou_grids_legend_title").hide();
          }
        });

        if (map.getLayer("tnm") != undefined) {
          currentBasemap = "tnm";
        } else {
          currentBasemap = map.getBasemap();
        }

        if (currentBasemap == "hybrid") {
          currentBasemap = "topo";
          $("#satCheckBox").prop("checked", true);
        } else {
          $("#satCheckBox").prop("checked", false);
        }

        $("#satCheckBox").on("click", function (evt) {
          if (evt.currentTarget.checked == true) {
            map.setBasemap("hybrid");
            map.removeLayer(nationalMapBasemap);
          } else if (evt.currentTarget.checked == false) {
            if (currentBasemap == "tnm") {
              map.setBasemap("topo");
              map.addLayer(nationalMapBasemap, 1);
            } else {
              map.setBasemap(currentBasemap);
              map.removeLayer(nationalMapBasemap);
            }
          }
        });

        //related records query
        $.ajax({
          dataType: "json",
          type: "GET",
          url:
            map.getLayer("fimSites").url +
            "/queryRelatedRecords?objectIds=" +
            siteAttr.OBJECTID +
            "&relationshipId=0&outFields=*&definitionExpression=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnZ=false&returnM=false&gdbVersion=&f=json",
          headers: { Accept: "*/*" },
          success: function (data) {
            if (
              data.relatedRecordGroups.length > 0 &&
              data.relatedRecordGroups[0].relatedRecords.length > 0
            ) {
              var relatedRecords = data.relatedRecordGroups[0].relatedRecords;
              var furnished = false;
              $.each(relatedRecords, function (index, value) {
                if (value.attributes["TYPE"] == "C") {
                  $("#mapsCreatedBy").append(
                    "<a target='_blank' href='" +
                      value.attributes["URL"] +
                      "'>" +
                      value.attributes["ENTITY"] +
                      "</a>"
                  );
                } else if (value.attributes["TYPE"] == "R") {
                  $("#mapsReviewedBy").append(
                    "<a target='_blank' href='" +
                      value.attributes["URL"] +
                      "'>" +
                      value.attributes["ENTITY"] +
                      "</a>"
                  );
                } else if (value.attributes["TYPE"] == "L") {
                  $("#logos").append(
                    "<img src='https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/" +
                      value.attributes["ENTITY"] +
                      "'/>"
                  );
                } else if (value.attributes["TYPE"] == "F") {
                  $("#recordsLogo").attr(
                    "src",
                    "https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/" +
                      value.attributes["ENTITY"]
                  );
                  furnished = true;
                }
              });

              if (furnished == true) {
                $("#usgsDefaultLogo").hide();
                $("#recordsLogo").show();
              } else if (furnished == false) {
                $("#usgsDefaultLogo").show();
                $("#recordsLogo").hide();
              }
            }
          },
          error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
          },
        });

        //var siteNo = siteAttr.SITE_NO;
        if (siteAttr.MULTI_SITE == 0) {
          ahpsID = siteAttr.AHPS_ID;
        } else if (siteAttr.MULTI_SITE == 1 && ahpsID_2 == undefined) {
          ahpsID_2 = siteAttr.AHPS_ID_2;
        }
        var state = siteAttr.STATE;
        var community = siteAttr.COMMUNITY;

        if (map.getLevel() < 12) {
          map.centerAndZoom(feature.geometry, 13);
        }

        // Google Analytics
        /*ga('send','event','Map','click','Site clicked');*/
        var dimensionValue = siteNo + ", " + state + ", " + community;
        ga("send", "event", "Map", "click", "Site Clicked", {
          dimension1: dimensionValue,
        });
        // End Google Analytics

        var suppLyrs = map.getLayer("fimSuppLyrs");
        var suppLyrsDef = [];
        suppLyrsDef[0] = "USGSID = '" + siteNo + "'";
        suppLyrsDef[1] = "USGSID = '" + siteNo + "'";
        suppLyrsDef[2] = "USGSID = '" + siteNo + "'";
        suppLyrs.setLayerDefinitions(suppLyrsDef);
        suppLyrs.setVisibility(true);

        $("[id*='Tab']").parents("li").removeClass("active");
        $(".nav-tabs #floodToolsTab").tab("show");

        // Set site links, titles
        $(".fts1 #usgsSiteNo").text(siteNo);
        $(".fts1 #usgsSiteNo").attr(
          "href",
          "https://waterdata.usgs.gov/monitoring-location/" + siteNo
        );
        $(".fts1 #siteName").text(attr["STATE"] + ": " + attr["COMMUNITY"]);
        if (ahpsID != "NONE") {
          $(".fts1 .nws-site-id").html(
            "<a href='https://water.weather.gov/ahps2/hydrograph.php?gage=" +
              ahpsID +
              "' target='_blank' alt='" +
              ahpsID +
              "' title='" +
              ahpsID +
              "'>" +
              ahpsID +
              "</a>"
          );
        } else {
          $(".fts1 .nws-site-id").html("NONE");
        }

        $(".fts2 #usgsSiteNo").text(siteNo_2);
        $(".fts2 #usgsSiteNo").attr(
          "href",
          "https://waterdata.usgs.gov/monitoring-location/" + siteNo_2
        );
        if (ahpsID_2 != "NONE") {
          $(".fts2 .nws-site-id").html(
            "<a href='https://water.weather.gov/ahps2/hydrograph.php?gage=" +
              ahpsID_2 +
              "' target='_blank' alt='" +
              ahpsID_2 +
              "' title='" +
              ahpsID_2 +
              "'>" +
              ahpsID_2 +
              "</a>"
          );
        } else {
          $(".fts2 .nws-site-id").html("NONE");
        }

        $(".fts3 #usgsSiteNo").text(siteNo_3);
        $(".fts3 #usgsSiteNo").attr(
          "href",
          "https://waterdata.usgs.gov/monitoring-location/" + siteNo_3
        );
        if (ahpsID_3 != "NONE") {
          $(".fts3 .nws-site-id").html(
            "<a href='https://water.weather.gov/ahps2/hydrograph.php?gage=" +
              ahpsID_3 +
              "' target='_blank' alt='" +
              ahpsID_3 +
              "' title='" +
              ahpsID_3 +
              "'>" +
              ahpsID_3 +
              "</a>"
          );
        } else {
          $(".fts3 .nws-site-id").html("NONE");
        }

        if (attr.HAS_GRIDS == 1) {
          $("#gridLabel").show();
        } else {
          $("#gridLabel").hide();
        }

        //Web cam check and set up
        //Web cam check and set up
        //Web cam check and set up
        if (feature.attributes.HAS_WEBCAM == "1") {
          //Embed
          $(".ft-webcam-tab").hide();
          $(".ft-webcam-link-tab").show();
          $(".ft-webcam-link-tab").attr(
            "href",
            "https://services.wim.usgs.gov/webCam/webCamNew/Default.aspx?webCamInfo=" +
              feature.attributes.WEBCAM_INFO
          );
          console.log("Open Webcam in new tab");
        } else if (feature.attributes.HAS_WEBCAM == "2") {
          //Image
          $(".ft-webcam-tab").show();
          $(".ft-webcam-link-tab").hide();
          $("#webcamImage").attr(
            "src",
            feature.attributes.WEBCAM_INFO.replace("http:", "https:")
          );
          console.log("Webcam image embedded.");
        } else {
          $(".ft-webcam-tab").hide();
          $(".ft-webcam-link-tab").hide();
          console.log("No webcam");
        }

        //More Info check and setup
        $.ajax({
          dataType: "json",
          type: "GET",
          url: fimMoreInfoUrl + siteNo,
          headers: { Accept: "*/*" },
          success: function (data) {
            if (data.hassite == true) {
              $("#moreInfo").text("");
              var moreInfoArray = data.ADD_INFO.split("\\n");
              if (moreInfoArray.length > 0) {
                $.each(moreInfoArray, function (index, value) {
                  if (value.length > 0) {
                    $("#moreInfo").append("<p>" + value + "</p>");
                  }
                });
              } else {
                $("#moreInfo").append(data.ADD_INFO);
              }
              $(".ft-more-info-tab").show();
            } else {
              $("#moreInfo").text("Loading...");
              $(".ft-hydro-tab").click();
              $(".ft-more-info-tab").hide();
            }
          },
          error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
          },
        });

        function getDatumInfo(response) {
          var returnSiteDatumInfo = [];
          var datumValueKey;
          var datumKey;

          var rdbByLine = response.split("\n");

          for (var i = 0; i < rdbByLine.length; i++) {
            var currentLine = rdbByLine[i];
            if (
              currentLine.match("#") == null &&
              currentLine.match("agency_cd") != null
            ) {
              var lineSplit = currentLine.split("\t");
              $.each(lineSplit, function (key, value) {
                if (lineSplit[key] == "alt_va") {
                  datumValueKey = key;
                }
                if (lineSplit[key] == "alt_datum_cd") {
                  datumKey = key;
                }
              });
            }
            if (
              currentLine.match("#") == null &&
              currentLine.match("USGS") != null
            ) {
              var lineSplit = currentLine.split("\t");
              returnSiteDatumInfo.push(Number(lineSplit[datumValueKey]));
              returnSiteDatumInfo.push(lineSplit[datumKey]);
            }
          }

          return returnSiteDatumInfo;
        }

        $.ajax({
          dataType: "text",
          type: "GET",
          //url: proxyUrl + "site_no="+siteNo+"&site_info=true",
          url:
            "https://waterservices.usgs.gov/nwis/site/?format=rdb&sites=" +
            siteNo +
            "&siteStatus=all",
          headers: { Accept: "*/*" },
          success: function (data) {
            var rtHtml = "";
            var nwisHtml = "";

            siteDatumInfo = getDatumInfo(data);

            //var ivUrl = "http://waterservices.usgs.gov/nwis/site/?format=gm&sites="+attr['Name']+"&siteOutput=expanded&outputDataTypeCd=iv&hasDataTypeCd=iv&parameterCd=00065,00060,00010,00095,63680,99133";
            var ivUrl =
              "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" +
              attr["SITE_NO"] +
              "&parameterCd=00060,00065";

            $.ajax({
              dataType: "json",
              type: "GET",
              url: ivUrl,
              headers: { Accept: "*/*" },
              success: function (data) {
                var siteData = data;
                var variable = "";
                var variableCode = "";
                //if siteData.
                //rtHtml = ""
                $.each(siteData.value.timeSeries, function (key, value) {
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

                    var rtLabel = "";
                    if (varValue == "-999999") {
                      rtLabel =
                        "<label class='paramLabel'>" +
                        variable +
                        ": <span style='font-weight: normal'>N/A</span></label>";
                    } else {
                      rtLabel =
                        "<label class='paramLabel'>" +
                        variable +
                        ": <span style='font-weight: normal'>" +
                        varValue +
                        " " +
                        units +
                        " <span style='font-size: smaller; color: darkblue'><i>(" +
                        formattedDate +
                        "</i>)</span></span></label>";
                    }

                    rtHtml = rtHtml + rtLabel;

                    var siteNoTemp = feature.attributes.Name;

                    if (dateInRange(valDate, startDate) == true) {
                      var nwisGraphUrl =
                        "https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=" +
                        siteNoTemp +
                        "&parm_cd=" +
                        variableCode +
                        "&begin_date=" +
                        startDate +
                        "&end_date=" +
                        todayDate; //+"&dd_nu="+param_dd[variableCode];

                      var nwisChart =
                        "<label>" +
                        variable +
                        "</label><img src='" +
                        nwisGraphUrl +
                        "'/>";

                      nwisHtml = nwisHtml + nwisChart;
                    }
                  }

                  //snapToFlood();
                });

                /*(var siteName = siteData.value.timeSeries[0].sourceInfo.siteName;

                                var template = new esri.InfoTemplate("<span class=''>" + siteName + "</span>",
                                    "<div id='rtInfo'>" + rtHtml + "</div>" +
                                    "<span>Most recent measurement(s) <span style='font-size: smaller; color: darkblue'><i>(local time)</i></span> - see <a target='_blank' href='https://waterdata.usgs.gov/nwis/uv?site_no=" + siteNo + "'>NWIS Site</a> for more details</span>" +
                                    "<div id='nwisCharts'>" + nwisHtml + "</div>");*/
              },
              error: function (error) {
                console.log("Error processing the JSON. The error is:" + error);
              },
            });
          },
          error: function (error) {
            console.log("Error processing the JSON. The error is:" + error);
          },
        });

        var stateCd = "";

        $.each(usStates, function (index, value) {
          if (value.name == attr["STATE"]) {
            stateCd = value.abbreviation;
          }
        });

        var historicalCall = $.ajax({
          dataType: "text",
          type: "GET",
          //url: proxyUrl + "site_no="+siteNo+"&hydroGet=true",
          //url: nwisUrl + siteNo,//siteNo + "," + siteNo_2,
          url:
            proxyUrl +
            "stateCd=" +
            stateCd +
            "&site_no=" +
            siteNo +
            "&historical=true",
          headers: { Accept: "*/*" },
        });

        var allHistoricFloods = [];
        var topTenFloods = [];
        var topTenDates = [];
        var topTenValues = [];

        if (siteAttr.MULTI_SITE == 0) {
          $(".ft-tab.ft-historic-tab,#ftHistorical").show();

          $.when(historicalCall) //)
            .done(function (historicalData) {
              var historicResult = historicalData;
              /*var dataSortField = new SortField();
                            var numericDataSort = new Sort();*/

              if (historicResult.match("No sites") != null) {
                //historicPeakResultIWant = false;
                console.log("No sites");
                $(".ft-tab.ft-historic-tab,#ftHistorical").hide();
              } else {
                //historicPeakResultIWant = true;

                //Parse result here........................
                var historicResultByLine = historicResult.split("\n");

                function dateAdjustment(inDate) {
                  var outDate;

                  var dateParts = inDate.split("-");
                  var month;
                  var day;

                  //month fix
                  if (dateParts[1] == "00") {
                    month = "01";
                  } else {
                    month = dateParts[1];
                  }
                  //day fix
                  if (dateParts[2] == "00") {
                    day = "01";
                  } else {
                    day = dateParts[2];
                  }

                  outDate = dateParts[0] + "-" + month + "-" + day;

                  return outDate;
                }

                for (var i = 0; i < historicResultByLine.length; i++) {
                  var currentLine = historicResultByLine[i];
                  if (
                    currentLine.match("#") == null &&
                    currentLine.match("USGS") != null
                  ) {
                    var lineSplit = currentLine.split("\t");
                    var dateFlood = dateAdjustment(lineSplit[3]);
                    var gageHeightFlood;
                    if (siteAttr.PCODE !== "00065") {
                      gageHeightFlood = Number(lineSplit[7]) + siteDatumInfo[0];
                    } else {
                      gageHeightFlood = lineSplit[7];
                    }
                    var codeFlood = lineSplit[8];
                    if (
                      !isNaN(new Date(dateFlood + "T00:00:00").getTime()) &&
                      gageHeightFlood != ""
                    ) {
                      allHistoricFloods.push([
                        new Date(dateFlood).getTime(),
                        parseFloat(gageHeightFlood),
                        codeFlood,
                      ]);
                    }
                  }
                }

                var floodPeakChartHeight = 300;
                var floodPeakChartWidth = 475;

                var yAxisText = "";

                if (siteAttr.PCODE == "00065") {
                  yAxisText = "Gage Height (ft)";
                } else if (siteAttr.PCODE == "62614") {
                  yAxisText = "Lake Water Level Elevation (ft)";
                } else if (siteAttr.PCODE == "62615") {
                  yAxisText = "Lake Water Level Elevation (ft)";
                } else if (siteAttr.PCODE == "63160") {
                  yAxisText = "Stream Water Level Elevation (ft)";
                } else if (siteAttr.PCODE == "72214") {
                  yAxisText = "Lake Water Level Elevation (ft)";
                }

                allAnnualChart = Highcharts.chart("allAnnualChart", {
                  chart: {
                    type: "column",
                    height: floodPeakChartHeight,
                    // width: floodPeakChartWidth
                  },
                  responsive: {
                    rules: [
                      {
                        condition: {
                          maxWidth: floodPeakChartWidth,
                        },
                      },
                    ],
                  },
                  title: {
                    text: "Annual Flood Peaks for " + siteAttr.COMMUNITY,
                  },
                  subtitle: {
                    text: "",
                  },
                  xAxis: {
                    type: "datetime",
                    tickInterval: "4",
                    labels: {
                      formatter: function () {
                        return Highcharts.dateFormat("%Y", this.value);
                      },
                    },
                  },
                  yAxis: {
                    min: 0,
                    max: null,
                    endOnTick: false,
                    resize: {
                      enabled: true,
                    },
                    title: {
                      text: yAxisText,
                    },
                  },
                  tooltip: {
                    valueSuffix: " ft",
                  },
                  plotOptions: {
                    series: {
                      color: "#000000",
                      events: {
                        click: function (event) {
                          snapToFlood(event.point.y, ".first-slider");
                        },
                      },
                    },
                    bar: {
                      dataLabels: {
                        enabled: true,
                      },
                    },
                  },
                  legend: {
                    enabled: false,
                  },
                  credits: {
                    enabled: false,
                  },
                  series: [
                    {
                      data: allHistoricFloods,
                      name: "Annual Flood Peaks",
                    },
                    {
                      data: allHistoricFloods,
                      name: "Annual Flood Peaks Points",
                      type: "scatter",
                      marker: {
                        type: "circle",
                        color: "#000000",
                        size: 10,
                      },
                    },
                  ],
                  tooltip: {
                    formatter: function () {
                      var elem = allHistoricFloods.find(
                        (element) =>
                          element[0] == this.x && element[1] == this.y
                      );
                      var code = elem[2];
                      var date = new Date(this.x);
                      var month = getMonth(date);
                      var dayOfMonth = date.getDate();
                      var year = date.getFullYear();
                      if (code != "") {
                        return (
                          "Peak: <b>" +
                          this.y +
                          " ft*</b><br/>" +
                          month +
                          " " +
                          dayOfMonth +
                          ", " +
                          year
                        );
                      } else {
                        return (
                          "Peak: <b>" +
                          this.y +
                          " ft</b><br/>" +
                          month +
                          " " +
                          dayOfMonth +
                          ", " +
                          year
                        );
                      }
                    },
                  },
                });

                //Sort array collection by top 10 descending and then get first 10 items

                var tempAllFloods = allHistoricFloods.sort(function (a, b) {
                  return b[1] - a[1];
                });

                var unorderedTopTenFloods = tempAllFloods.slice(0, 10);

                topTenFloods = unorderedTopTenFloods.sort(function (a, b) {
                  return a[0] - b[0];
                });

                topTenDates = ["Current Stage"];
                topTenValues = [
                  { y: Number($(".fts1 #floodGage").html()), color: "#000000" },
                ];

                $.each(topTenFloods, function (index, value) {
                  topTenDates.push(value[0]);
                  topTenValues.push(value[1]);
                });

                topTenChart = Highcharts.chart("topTenChart", {
                  chart: {
                    type: "column",
                    height: floodPeakChartHeight,
                    // width: floodPeakChartWidth
                  },
                  responsive: {
                    rules: [
                      {
                        condition: {
                          maxWidth: floodPeakChartWidth,
                        },
                      },
                    ],
                  },
                  title: {
                    text: "Top 10 Annual Flood Peaks for " + siteAttr.COMMUNITY,
                  },
                  subtitle: {
                    text: "",
                  },
                  xAxis: {
                    type: "datetime",
                    categories: topTenDates,
                    labels: {
                      formatter: function () {
                        if (isNaN(this.value)) {
                          return this.value;
                        } else {
                          return Highcharts.dateFormat("%b %e, %Y", this.value);
                        }
                      },
                    },
                  },
                  yAxis: {
                    min: 0,
                    max: null,
                    endOnTick: false,
                    resize: {
                      enabled: true,
                    },
                    title: {
                      text: yAxisText,
                    },
                  },
                  tooltip: {
                    valueSuffix: " ft",
                  },
                  plotOptions: {
                    series: {
                      events: {
                        click: function (event) {
                          snapToFlood(event.point.y, ".first-slider");
                        },
                      },
                    },
                    bar: {
                      dataLabels: {
                        enabled: true,
                      },
                    },
                  },
                  legend: {
                    enabled: false,
                  },
                  credits: {
                    enabled: false,
                  },
                  series: [
                    {
                      data: topTenValues,
                      name: "Top Ten Flood Peaks",
                    },
                  ],
                  tooltip: {
                    formatter: function () {
                      if (this.x != "Current Stage") {
                        var elem = allHistoricFloods.find(
                          (element) =>
                            element[0] == this.x && element[1] == this.y
                        );
                        var code = elem[2];
                      }
                      var date = new Date(this.x);
                      var month = getMonth(date);
                      var dayOfMonth = date.getDate();
                      var year = date.getFullYear();
                      if (this.x == "Current Stage") {
                        return "Current stage: <b>" + this.y + " ft</b>";
                      } else if (code != "") {
                        return (
                          "Peak: <b>" +
                          this.y +
                          " ft</b><br/>" +
                          month +
                          " " +
                          dayOfMonth +
                          ", " +
                          year
                        );
                      } else {
                        return (
                          "Peak: <b>" +
                          this.y +
                          " ft*</b><br/>" +
                          month +
                          " " +
                          dayOfMonth +
                          ", " +
                          year
                        );
                      }
                    },
                  },
                });

                $(".historicPeakStudyDate").html(
                  "Click on an historical flood to see the estimated extent. Due to changes in the channel" +
                    " and urbanization over time, these areas are only an estimate using " +
                    siteAttr.STUDY_DATE +
                    " modeled conditions. These numbers are" +
                    " provided for historical context only and are not reviewed inundation areas for the selected flood height."
                );
                $(".historicPeakDataLink").html(
                  "*Please visit the <a target='_blank' href='http://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no=" +
                    siteAttr.SITE_NO +
                    "'>USGS NWIS Flood Peaks Page</a>" +
                    " for more information on flagged peaks and the full flood peak record."
                );
              }
            })
            .fail(function () {
              //alert('there was an issue');
              floodToolsError();
            });
        } else {
          $(".ft-tab.ft-historic-tab,#ftHistorical").hide();
        }

        //call for observed (NWIS) hydro data
        var nwisCall = $.ajax({
          dataType: "text",
          type: "GET",
          //url: proxyUrl + "site_no="+siteNo+"&hydroGet=true",
          //url: nwisUrl + siteNo,//siteNo + "," + siteNo_2,
          url: nwisUrl + "&parameterCd=" + pcode + ",00060&sites=" + siteNo, //siteNo + "," + siteNo_2,
          headers: { Accept: "*/*" },
        });

        var nwsCall = $.ajax({
          dataType: "xml",
          type: "GET",
          url: proxyUrl + "ahpsID=" + ahpsID,
          headers: { Accept: "*/*" },
        });

        var nwisCall2Details = {
          dataType: "text",
          type: "GET",
          //url: proxyUrl + "site_no="+siteNo+"&hydroGet=true",
          url: ".", //siteNo + "," + siteNo_2,
          //url: nwisUrl + "&parameterCd=" + pcode_2 + ",00065&sites=" + siteNo,//siteNo + "," + siteNo_2,
          headers: { Accept: "*/*" },
        };

        if (siteNo_2 != undefined) {
          //nwisCall2Details.url = nwisUrl + siteNo_2//siteNo + "," + siteNo_2,
          nwisCall2Details.url =
            nwisUrl + "&parameterCd=" + pcode_2 + ",00060&sites=" + siteNo_2; //siteNo + "," + siteNo_2,
        }
        var nwisCall2 = $.ajax(nwisCall2Details);

        var nwsCall2Details = {
          dataType: "text",
          type: "GET",
          url: ".",
          headers: { Accept: "*/*" },
        };

        if (ahpsID_2 != undefined) {
          nwsCall2Details.dataType = "xml";
          nwsCall2Details.url = proxyUrl + "ahpsID=" + ahpsID_2;
        }
        var nwsCall2 = $.ajax(nwsCall2Details);

        var nwisCall3Details = {
          dataType: "text",
          type: "GET",
          //url: proxyUrl + "site_no="+siteNo+"&hydroGet=true",
          url: ".", //siteNo + "," + siteNo_2,
          //url: nwisUrl + "&parameterCd=" + pcode_3 + ",00065&sites=" + siteNo,//siteNo + "," + siteNo_2,
          headers: { Accept: "*/*" },
        };

        if (siteNo_3 != undefined) {
          //nwisCall3Details.url = nwisUrl + siteNo_3//siteNo + "," + siteNo_2,
          nwisCall3Details.url =
            nwisUrl + "&parameterCd=" + pcode_3 + ",00060&sites=" + siteNo_3; //siteNo + "," + siteNo_2,
        }
        var nwisCall3 = $.ajax(nwisCall3Details);

        var nwsCall3Details = {
          dataType: "text",
          type: "GET",
          url: ".",
          headers: { Accept: "*/*" },
        };
        if (ahpsID_3 != undefined) {
          nwsCall3Details.dataType = "xml";
          nwsCall3Details.url = proxyUrl + "ahpsID=" + ahpsID_3;
        }
        var nwsCall3 = $.ajax(nwsCall3Details);

        var instance = $("#floodToolsDiv").data("lobiPanel");
        var docHeight = $(document).height();
        var docWidth = $(document).width();
        var percentageOfScreen = 0.9;
        var floodToolsHeight = docHeight * percentageOfScreen;
        var floodToolsWidth = docWidth * percentageOfScreen;
        var highChartWidth = 405;
        var highChartHeight = 300;

        if (docHeight < 500) {
          $("#floodToolsDiv").height(floodToolsHeight);
          highChartHeight = $("#floodToolsDiv").height() - 50;
        }
        if (docWidth < 500) {
          $("#floodToolsDiv").width(floodToolsWidth);
          highChartWidth = $("#floodToolsDiv").width() - 50;
        }

        var instanceX = docWidth * 0.5 - $("#floodToolsDiv").width() * 0.5;
        var instanceY = docHeight * 0.5 - $("#floodToolsDiv").height() * 0.5;

        if (loadedInitialLibrary == false) {
          instance.setPosition(instanceX, instanceY);
        }

        if (instance.isPinned() == true) {
          instance.unpin();
        }

        loadedInitialLibrary = true;

        $("#floodToolsDiv").css("visibility", "visible");
        $("#minFT").removeClass("visible");
        //$(".fts2").show();
        //$(".fts3").css("visibility", "visible");

        var deferreds = [nwisCall, nwsCall];

        var hazusQuery = new esriQuery();
        hazusQuery.returnGeometry = false;
        hazusQuery.outFields = ["*"];
        hazusQuery.orderByFields = ["gridID ASC"];
        hazusQuery.where = "studyArea = '" + attr["SHORT_NAME"] + "'";

        // Using fim HAZUS url found in layers.js. edit there, if needed.
        var hazusQueryTask = new QueryTask(fimHazusUrlTest);
        hazusQueryTask.execute(hazusQuery, hazusResult);

        function hazusResult(featureSet) {
          //Variables to be populated with summed values for each GridID
          var gridTotalLoss = 0;
          var gridBldgLoss = 0;
          var gridContLoss = 0;
          var gridShelterNee = 0;
          var currentGrid;
          var hazusTableObj = [];
          if (featureSet.features.length > 0) {
            //This sums all the features for each gridID; Right now, it's not needed because I'm using pre-summed data
            //It works for data that doesn't come pre-summed, but QueryTask has a max feature limit of 1,000, which was causing trouble
            //Leaving in for now in case we figure out a way around the max count
            for (i = 0; i < featureSet.features.length; i++) {
              //Since the data are sorted by GridID, if the current ID doesn't match the previous, start summing again
              if (
                currentGrid !== featureSet.features[i].attributes.gridID &&
                i > 0
              ) {
                var tempFeature = {
                  gridID: currentGrid,
                  totalLoss: gridTotalLoss,
                  BldgLoss: gridBldgLoss,
                  ContLoss: gridContLoss,
                  ShelterNee: gridShelterNee,
                };
                hazusTableObj.push(tempFeature);
                gridTotalLoss = 0;
                gridBldgLoss = 0;
                gridContLoss = 0;
                gridShelterNee = 0;
              }
              gridTotalLoss += featureSet.features[i].attributes.TotalLoss;
              gridBldgLoss += featureSet.features[i].attributes.BldgLoss;
              gridContLoss += featureSet.features[i].attributes.ContLoss;
              gridShelterNee += featureSet.features[i].attributes.ShelterNee;

              currentGrid = featureSet.features[i].attributes.gridID;
            }
            var tempFeature = {
              gridID: currentGrid,
              totalLoss: gridTotalLoss,
              BldgLoss: gridBldgLoss,
              ContLoss: gridContLoss,
              ShelterNee: gridShelterNee,
            };
            hazusTableObj.push(tempFeature);

            // Site ID and Stage Label
            $("#hazusTableSiteLabel").html(
              featureSet.features[0].attributes["USGSID"]
            );

            $(".ft-hazus-tab").show();
            $("#hazusTable tbody").empty();
            // $("#hazusTable tr td").remove();
            for (var i = 0; i < hazusTableObj.length; i++) {
              var html =
                "<tr id='hazus" +
                hazusTableObj[i].gridID +
                "'><td>" +
                hazusTableObj[i].gridID +
                "</td><td>" +
                hazusTableObj[i].totalLoss +
                "</td><td>" +
                hazusTableObj[i].BldgLoss +
                "</td><td>" +
                hazusTableObj[i].ContLoss +
                "</td> + <td>" +
                hazusTableObj[i].ShelterNee +
                "</td></tr>";
              $("#hazusTable tbody").append(html);
            }

            // Fill in min and max hazus table info
            var hazusMax = featureSet.features.length - 1;
            console.log("HAZUS MAX:");
            console.log("HAZUS MAX:");
            console.log("HAZUS MAX:");
            console.log(hazusMax);
            $("#hazusMinLvl").html(featureSet.features[0].attributes["gridID"]);
            $("#hazusMaxLvl").html(
              featureSet.features[hazusMax].attributes["gridID"]
            );
          } else {
            $(".ft-hazus-tab").hide();
          }
        }

        var extentQuery = new esriQuery();
        extentQuery.returnGeometry = false;
        extentQuery.outFields = ["*"];
        switch (attr["MULTI_SITE"]) {
          case 0:
            var floodExtentsUrl = map.getLayer("fimExtents").url + "/0";
            extentQuery.orderByFields = ["STAGE ASC"];
            extentQuery.where = "USGSID = '" + attr["SITE_NO"] + "'";
            break;
          case 1:
            var floodExtentsUrl = map.getLayer("fimExtentsMulti").url + "/0";
            extentQuery.orderByFields = ["STAGE_1 ASC"];
            extentQuery.where =
              "USGSID_1 = '" +
              attr["SITE_NO"] +
              "' OR USGSID_2 = '" +
              attr["SITE_NO"] +
              "'";
            break;
          case 2:
            var floodExtentsUrl = map.getLayer("fimExtentsMulti").url + "/0";
            extentQuery.orderByFields = ["STAGE_1 ASC"];
            extentQuery.where =
              "USGSID_1 = '" +
              attr["SITE_NO"] +
              "' OR USGSID_2 = '" +
              attr["SITE_NO"] +
              "'";
            break;
          case 3:
            var floodExtentsUrl =
              map.getLayer("fimExtentsThreeSites").url + "/0";
            extentQuery.orderByFields = ["STAGE_1 ASC"];
            extentQuery.where =
              "USGSID_1 = '" +
              attr["SITE_NO"] +
              "' OR USGSID_2 = '" +
              attr["SITE_NO"] +
              "' OR USGSID_3 = '" +
              attr["SITE_NO"] +
              "'";
            break;
        }

        var extentQueryTask = new QueryTask(floodExtentsUrl);
        extentQueryTask.execute(extentQuery, extentResult);

        //code for getting extent of library and setting up for zoom button to go to full extent of library
        extentQuery.returnGeometry = true;
        extentQuery.num = 1;
        extentQuery.geometryPrecision = 0;

        switch (attr["MULTI_SITE"]) {
          case 0:
            extentQuery.orderByFields = ["STAGE DESC"];
            break;
          case 1:
            extentQuery.orderByFields = ["STAGE_1 DESC"];
            break;
          case 2:
            extentQuery.orderByFields = ["STAGE_1 DESC"];
            break;
          case 3:
            extentQuery.orderByFields = ["STAGE_1 DESC"];
            break;
        }

        var extentQueryTask = new QueryTask(floodExtentsUrl);
        extentQueryTask.execute(extentQuery, extentOnlyResult);

        function extentOnlyResult(featureSet) {
          libExtent = featureSet.features[0].geometry.getExtent();
          $("#zoomToLibExtent").on("click", function (event) {
            map.setExtent(libExtent, true);
            //$("#zoomToLibExtent").off();
            //event.preventDefault();
          });
        }
        //end of code for getting extent of library

        function extentResult(featureSet) {
          if (featureSet.features.length > 0) {
            results = featureSet.features;
            extentResults = results;

            sliderSetup(results);

            $("#floodToolsModalHeader").text(
              attr["STATE"] +
                ": " +
                attr["COMMUNITY"] +
                " (" +
                siteNo +
                (siteNo_2 ? " & " + siteNo_2 : "") +
                (siteNo_3 ? " & " + siteNo_3 : "") +
                ")"
            );

            $("#shareLink").click(function () {
              showShareModal();
            });

            var layerDefinitions = [];

            //REVISIT: set up for three sites
            map.getLayer("fimExtents").setVisibility(false);
            map.getLayer("fimBreach").setVisibility(false);
            map.getLayer("fimExtentsMulti").setVisibility(false);
            map.getLayer("fimBreachMulti").setVisibility(false);
            //map.getLayer("fimExtentsThreeSites").setVisibility(false);
            //map.getLayer("fimBreachThreeSites").setVisibility(false);

            switch (attr["MULTI_SITE"]) {
              case 0:
                layerDefinitions[0] =
                  "USGSID = '" +
                  attr["SITE_NO"] +
                  "' AND STAGE = " +
                  results[0].attributes["STAGE"];
                map
                  .getLayer("fimExtents")
                  .setLayerDefinitions(layerDefinitions);
                map.getLayer("fimBreach").setLayerDefinitions(layerDefinitions);
                map.getLayer("fimExtents").setVisibility(true);
                map.getLayer("fimBreach").setVisibility(true);
                break;
              case 1:
                layerDefinitions[0] =
                  "USGSID_1 = '" +
                  siteNo +
                  "' AND STAGE_1 = " +
                  gageValues[0].gageValue +
                  "AND USGSID_2 = '" +
                  siteNo_2 +
                  "' AND STAGE_2 = " +
                  gageValues2[0].gageValue;
                map
                  .getLayer("fimExtentsMulti")
                  .setLayerDefinitions(layerDefinitions);
                map
                  .getLayer("fimBreachMulti")
                  .setLayerDefinitions(layerDefinitions);
                map.getLayer("fimExtentsMulti").setVisibility(true);
                map.getLayer("fimBreachMulti").setVisibility(true);
                break;
              case 2:
                //placeholder
                break;
              case 3:
                layerDefinitions[0] =
                  "USGSID_1 = '" +
                  siteNo +
                  "' AND STAGE_1 = " +
                  gageValues[0].gageValue +
                  "AND USGSID_2 = '" +
                  siteNo_2 +
                  "' AND STAGE_2 = " +
                  gageValues2[0].gageValue +
                  " AND USGSID_3 = '" +
                  siteNo_3 +
                  "' AND STAGE_3 = " +
                  gageValues3[0].gageValue;
                map
                  .getLayer("fimExtentsThreeSites")
                  .setLayerDefinitions(layerDefinitions);
                //REVISIT: when breach is available for three site libraries
                //map.getLayer("fimBreachThreeSites").setLayerDefinitions(layerDefinitions);
                map.getLayer("fimExtentsThreeSites").setVisibility(true);
                //map.getLayer("fimBreachThreeSites").setVisibility(true);
                break;
            }

            //REVISIT: need to add logic for handling of grid infos for multi sites
            if (siteAttr["HAS_GRIDS"] == 1) {
              gridLayerIndexArrColl = [];

              if (siteAttr["MULTI_SITE"] == 0) {
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ]
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid ==
                      results[$(".fts1 #floodSlider")[0].value].attributes[
                        "GRIDID"
                      ] +
                        "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 1) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 == gageValues[0].gageValue &&
                    value.STAGE_2 == gageValues2[0].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  }
                }
              } else if (siteAttr["MULTI_SITE"] == 3) {
                var gridLayerID;
                $.each(gagePairs, function (index, value) {
                  if (
                    value.STAGE_1 == gageValues[0].gageValue &&
                    value.STAGE_2 == gageValues2[0].gageValue &&
                    value.STAGE_3 == gageValues3[0].gageValue
                  ) {
                    gridLayerID = value.GRIDID;
                  }
                });
                for (var i = 0; i < gridInfos.length; i++) {
                  if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    Number(gridInfos[i].gridid) == gridLayerID
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  } else if (
                    gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                    gridInfos[i].gridid == gridLayerID + "b" &&
                    $("#aouCheckBox").prop("checked") == true
                  ) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                  }
                }
              }

              //set grids layer definitions/choose the right layer here and in next input change function
              console.log("grid stuff");
              var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
              var gridVisLayer = [];
              gridVisLayer.push(gridLayerIndexArrColl);
              map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
              //map.getLayer(gridLayer).setVisibility(true);
            }

            $(".floodSlider").on("input", function () {
              gridLayerIndexArrColl = [];
              gridLayerIndex = [];
              if (results != null) {
                if (siteAttr["MULTI_SITE"] == 0) {
                  // Update Values
                  $(".fts1 .slider-min.update").text(
                    results[this.value].attributes["STAGE"]
                  );
                  $(".fts1 .slider-elev.update").text(
                    results[this.value].attributes["ELEV"].toFixed(2) || "N/A"
                  );
                  $(".fts1 .elevation-selected").text(
                    results[this.value].attributes["ELEV"].toFixed(2) || "N/A"
                  );
                  $(".fts1 .flood-discharge-selected").text(
                    results[this.value].attributes["QCFS"] || "N/A"
                  );

                  //Adjustments to hazus tab for slider change
                  $("#hazusTableSelectedStageLabel").text(
                    results[this.value].attributes["STAGE"] + " ft"
                  );
                  $("#hazusTable tr").removeClass("active");
                  $(
                    "#hazus" + results[this.value].attributes["STAGE"]
                  ).addClass("active");

                  // Show message if no hazus
                  // Data is avaolable at selected range
                  if (
                    $("#hazus" + results[this.value].attributes["STAGE"]).length
                  ) {
                    $("#hazusRangeInfo").hide();
                  } else {
                    $("#hazusRangeInfo").show();
                  }

                  var layerDefinitions = [];
                  layerDefinitions[0] =
                    "USGSID = '" +
                    attr["SITE_NO"] +
                    "' AND STAGE = " +
                    results[this.value].attributes["STAGE"];
                  map
                    .getLayer("fimExtents")
                    .setLayerDefinitions(layerDefinitions);
                  map
                    .getLayer("fimBreach")
                    .setLayerDefinitions(layerDefinitions);

                  if (siteAttr["HAS_GRIDS"] == 1) {
                    for (var i = 0; i < gridInfos.length; i++) {
                      if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        Number(gridInfos[i].gridid) ==
                          results[$(".fts1 #floodSlider")[0].value].attributes[
                            "GRIDID"
                          ]
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      } else if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        gridInfos[i].gridid ==
                          results[$(".fts1 #floodSlider")[0].value].attributes[
                            "GRIDID"
                          ] +
                            "b" &&
                        $("#aouCheckBox").prop("checked") == true
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      }
                    }

                    //set grids layer definitions/choose the right layer here and in next input change function
                    var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
                    var gridVisLayer = [];
                    gridVisLayer.push(gridLayerIndexArrColl);
                    map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
                    //map.getLayer(gridLayer).setVisibility(true);
                  }
                } else if (siteAttr["MULTI_SITE"] == 1) {
                  if ($(this).hasClass("first-slider")) {
                    $(".fts1 .slider-min.update").text(
                      gageValues[this.value].gageValue
                    );
                    $(".fts1 .slider-elev.update").text(
                      altitudeValues[this.value].altitudeValue || "N/A"
                    );
                    $(".fts1 .elevation-selected").text(
                      altitudeValues[this.value].altitudeValue || "N/A"
                    );
                    if (typeof dischargeValues[this.value] !== "undefined") {
                      $(".fts1 .flood-discharge-selected").text(
                        dischargeValues[this.value].dischargeValue || "N/A"
                      );
                    }
                  } else if ($(this).hasClass("second-slider")) {
                    $(".fts2 .slider-min.update").text(
                      gageValues2[this.value].gageValue
                    );
                    $(".fts2 .slider-elev.update").text(
                      altitudeValues2[this.value].altitudeValue || "N/A"
                    );
                    $(".fts2 .elevation-selected").text(
                      altitudeValues2[this.value].altitudeValue || "N/A"
                    );
                    if (typeof dischargeValues2[this.value] !== "undefined") {
                      $(".fts2 .flood-discharge-selected").text(
                        dischargeValues2[this.value].dischargeValue || "N/A"
                      );
                    }
                  }

                  // Code to determine next possible combination if current selections are not available as map in library
                  var tempPairValue = [];

                  if ($(this).hasClass("first-slider")) {
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_1 ==
                        gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                      ) {
                        tempPairValue.push({
                          pairStage: parseFloat(value.STAGE_2),
                        });
                      }
                    });

                    tempPairValue.sort((a, b) =>
                      Number(a.pairStage) > Number(b.pairStage)
                        ? 1
                        : Number(b.pairStage) > Number(a.pairStage)
                        ? -1
                        : 0
                    );

                    var currentSlider2Value = parseFloat(
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider2Value <
                      parseFloat(tempPairValue[0].pairStage)
                    ) {
                      for (var i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(tempPairValue[0].pairStage)
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          if (
                            dischargeValues2[
                              $(".fts2 #floodSlider")[0].value
                            ] != undefined
                          ) {
                            $(".fts2 .flood-discharge-selected").text(
                              dischargeValues2[$(".fts2 #floodSlider")[0].value]
                                .dischargeValue || "N/A"
                            );
                          }
                          break;
                        }
                      }
                    } else if (
                      currentSlider2Value >
                      parseFloat(
                        tempPairValue[tempPairValue.length - 1].pairStage
                      )
                    ) {
                      for (i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(
                            tempPairValue[tempPairValue.length - 1].pairStage
                          )
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          if (
                            dischargeValues2[
                              $(".fts2 #floodSlider")[0].value
                            ] != undefined
                          ) {
                            $(".fts2 .flood-discharge-selected").text(
                              dischargeValues2[$(".fts2 #floodSlider")[0].value]
                                .dischargeValue || "N/A"
                            );
                          }
                          //slideWarningShow();
                          break;
                        }
                      }
                    }
                  } else if ($(this).hasClass("second-slider")) {
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_2 ==
                        gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                      ) {
                        tempPairValue.push({
                          pairStage: parseFloat(value.STAGE_1),
                        });
                      }
                    });

                    tempPairValue.sort((a, b) =>
                      Number(a.pairStage) > Number(b.pairStage)
                        ? 1
                        : Number(b.pairStage) > Number(a.pairStage)
                        ? -1
                        : 0
                    );

                    var currentSlider1Value = parseFloat(
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider1Value <
                      parseFloat(tempPairValue[0].pairStage)
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(tempPairValue[0].pairStage)
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          // Update current slider value
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }
                          //slideWarningShow();
                          break;
                        }
                      }
                    } else if (
                      currentSlider1Value >
                      parseFloat(
                        tempPairValue[tempPairValue.length - 1].pairStage
                      )
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(
                            tempPairValue[tempPairValue.length - 1].pairStage
                          )
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          // Update current slider value
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }

                          //slideWarningShow();
                          break;
                        }
                      }
                    }
                  }

                  if (siteAttr["HAS_GRIDS"] == 1) {
                    var gridLayerID;
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_1 ==
                          gageValues[$(".fts1 #floodSlider")[0].value]
                            .gageValue &&
                        value.STAGE_2 ==
                          gageValues2[$(".fts2 #floodSlider")[0].value]
                            .gageValue
                      ) {
                        gridLayerID = value.GRIDID;
                      }
                    });
                    for (var i = 0; i < gridInfos.length; i++) {
                      if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        Number(gridInfos[i].gridid) == gridLayerID
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      } else if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        gridInfos[i].gridid == gridLayerID + "b" &&
                        $("#aouCheckBox").prop("checked") == true
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      }
                    }

                    var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
                    var gridVisLayer = [];
                    gridVisLayer.push(gridLayerIndexArrColl);
                    map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);

                    var layerDefinitions = [];
                    layerDefinitions[0] =
                      "USGSID_1 = '" +
                      siteNo +
                      "' AND STAGE_1 = " +
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue +
                      " AND USGSID_2 = '" +
                      siteNo_2 +
                      "' AND STAGE_2 = " +
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue;
                    map
                      .getLayer("fimExtentsMulti")
                      .setLayerDefinitions(layerDefinitions);
                    map
                      .getLayer("fimBreachMulti")
                      .setLayerDefinitions(layerDefinitions);
                  }
                } else if (siteAttr["MULTI_SITE"] == 3) {
                  if ($(this).hasClass("first-slider")) {
                    $(".fts1 .slider-min.update").text(
                      gageValues[this.value].gageValue
                    );
                    $(".fts1 .slider-elev.update").text(
                      altitudeValues[this.value].altitudeValue || "N/A"
                    );
                    $(".fts1 .elevation-selected").text(
                      altitudeValues[this.value].altitudeValue || "N/A"
                    );
                    $(".fts1 .flood-discharge-selected").text(
                      dischargeValues[this.value].dischargeValue || "N/A"
                    );
                  } else if ($(this).hasClass("second-slider")) {
                    $(".fts2 .slider-min.update").text(
                      gageValues2[this.value].gageValue
                    );
                    $(".fts2 .slider-elev.update").text(
                      altitudeValues2[this.value].altitudeValue || "N/A"
                    );
                    $(".fts2 .elevation-selected").text(
                      altitudeValues2[this.value].altitudeValue || "N/A"
                    );
                    $(".fts2 .flood-discharge-selected").text(
                      dischargeValues2[this.value].dischargeValue || "N/A"
                    );
                  } else if ($(this).hasClass("third-slider")) {
                    $(".fts3 .slider-min.update").text(
                      gageValues3[this.value].gageValue
                    );
                    $(".fts3 .slider-elev.update").text(
                      altitudeValues3[this.value].altitudeValue || "N/A"
                    );
                    $(".fts3 .elevation-selected").text(
                      altitudeValues3[this.value].altitudeValue || "N/A"
                    );
                    $(".fts3 .flood-discharge-selected").text(
                      dischargeValues3[this.value].dischargeValue || "N/A"
                    );
                  }

                  // Code to determine next possible combination if current selections are not available as map in library
                  var tempPairValue = [];

                  if ($(this).hasClass("first-slider")) {
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_1 ==
                        gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                      ) {
                        tempPairValue.push({
                          pairStage2: parseFloat(value.STAGE_2),
                          pairStage3: parseFloat(value.STAGE_3),
                        });
                      }
                    });

                    tempPairValue.sort((a, b) =>
                      Number(a.pairStage2) > Number(b.pairStage2)
                        ? 1
                        : Number(b.pairStage2) > Number(a.pairStage2)
                        ? -1
                        : 0
                    );

                    var currentSlider2Value = parseFloat(
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider2Value <
                      parseFloat(tempPairValue[0].pairStage2)
                    ) {
                      for (var i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(tempPairValue[0].pairStage2)
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .flood-discharge-selected").text(
                            dischargeValues2[$(".fts2 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          break;
                        }
                      }
                    } else if (
                      currentSlider2Value >
                      parseFloat(
                        tempPairValue[tempPairValue.length - 1].pairStage2
                      )
                    ) {
                      for (i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(
                            tempPairValue[tempPairValue.length - 1].pairStage2
                          )
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .flood-discharge-selected").text(
                            dischargeValues2[$(".fts2 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          break;
                        }
                      }
                    }

                    var newTempPair = [];
                    $.each(tempPairValue, function (index, value) {
                      if (
                        value.pairStage2 ==
                        gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                      ) {
                        newTempPair.push({ value });
                      }
                    });

                    newTempPair.sort((a, b) =>
                      Number(a.value.pairStage3) > Number(b.value.pairStage3)
                        ? 1
                        : Number(b.value.pairStage3) >
                          Number(a.value.pairStage3)
                        ? -1
                        : 0
                    );

                    var currentSlider3Value = parseFloat(
                      gageValues3[$(".fts3 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider3Value <
                      parseFloat(newTempPair[0].value.pairStage3)
                    ) {
                      for (var i = 0; i < gageValues3.length; i++) {
                        if (
                          gageValues3[i].gageValue ==
                          parseFloat(newTempPair[0].value.pairStage3)
                        ) {
                          $(".fts3 #floodSlider")[0].value = i;
                          $(".fts3 .slider-min.update").text(
                            gageValues3[$(".fts3 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts3 .slider-elev.update").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .elevation-selected").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .flood-discharge-selected").text(
                            dischargeValues3[$(".fts3 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          //slideWarningShow();
                          break;
                        }
                      }
                    } else if (
                      currentSlider3Value >
                      parseFloat(
                        newTempPair[newTempPair.length - 1].value.pairStage3
                      )
                    ) {
                      for (i = 0; i < gageValues3.length; i++) {
                        if (
                          gageValues3[i].gageValue ==
                          parseFloat(
                            newTempPair[newTempPair.length - 1].value.pairStage3
                          )
                        ) {
                          $(".fts3 #floodSlider")[0].value = i;
                          $(".fts3 .slider-min.update").text(
                            gageValues3[$(".fts3 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts3 .slider-elev.update").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .elevation-selected").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .flood-discharge-selected").text(
                            dischargeValues3[$(".fts3 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );

                          //slideWarningShow();
                          break;
                        }
                      }
                    }
                  } else if ($(this).hasClass("second-slider")) {
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_2 ==
                        gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                      ) {
                        tempPairValue.push({
                          pairStage1: parseFloat(value.STAGE_1),
                          pairStage3: parseFloat(value.STAGE_3),
                        });
                      }
                    });

                    tempPairValue.sort((a, b) =>
                      Number(a.pairStage1) > Number(b.pairStage1)
                        ? 1
                        : Number(b.pairStage1) > Number(a.pairStage1)
                        ? -1
                        : 0
                    );

                    var currentSlider1Value = parseFloat(
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider1Value <
                      parseFloat(tempPairValue[0].pairStage1)
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(tempPairValue[0].pairStage1)
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }
                          break;
                        }
                      }
                    } else if (
                      currentSlider1Value >
                      parseFloat(
                        tempPairValue[tempPairValue.length - 1].pairStage1
                      )
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(
                            tempPairValue[tempPairValue.length - 1].pairStage1
                          )
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }
                          break;
                        }
                      }
                    }

                    var newTempPair = [];
                    $.each(tempPairValue, function (index, value) {
                      if (
                        value.pairStage1 ==
                        gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                      ) {
                        newTempPair.push({ value });
                      }
                    });

                    newTempPair.sort((a, b) =>
                      Number(a.value.pairStage3) > Number(b.value.pairStage3)
                        ? 1
                        : Number(b.value.pairStage3) >
                          Number(a.value.pairStage3)
                        ? -1
                        : 0
                    );

                    var currentSlider3Value = parseFloat(
                      gageValues3[$(".fts3 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider3Value <
                      parseFloat(newTempPair[0].value.pairStage3)
                    ) {
                      for (var i = 0; i < gageValues3.length; i++) {
                        if (
                          gageValues3[i].gageValue ==
                          parseFloat(newTempPair[0].value.pairStage3)
                        ) {
                          $(".fts3 #floodSlider")[0].value = i;
                          $(".fts3 .slider-min.update").text(
                            gageValues3[$(".fts3 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts3 .slider-elev.update").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .elevation-selected").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .flood-discharge-selected").text(
                            dischargeValues3[$(".fts3 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );

                          //slideWarningShow();
                          break;
                        }
                      }
                    } else if (
                      currentSlider3Value >
                      parseFloat(
                        newTempPair[newTempPair.length - 1].value.pairStage3
                      )
                    ) {
                      for (i = 0; i < gageValues3.length; i++) {
                        if (
                          gageValues3[i].gageValue ==
                          parseFloat(
                            newTempPair[newTempPair.length - 1].value.pairStage3
                          )
                        ) {
                          $(".fts3 #floodSlider")[0].value = i;
                          $(".fts3 .slider-min.update").text(
                            gageValues3[$(".fts3 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts3 .slider-elev.update").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .elevation-selected").text(
                            altitudeValues3[$(".fts3 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts3 .flood-discharge-selected").text(
                            dischargeValues3[$(".fts3 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          //slideWarningShow();
                          break;
                        }
                      }
                    }
                  } else if ($(this).hasClass("third-slider")) {
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_3 ==
                        gageValues3[$(".fts3 #floodSlider")[0].value].gageValue
                      ) {
                        tempPairValue.push({
                          pairStage1: parseFloat(value.STAGE_1),
                          pairStage2: parseFloat(value.STAGE_2),
                        });
                      }
                    });

                    tempPairValue.sort((a, b) =>
                      Number(a.pairStage2) > Number(b.pairStage2)
                        ? 1
                        : Number(b.pairStage2) > Number(a.pairStage2)
                        ? -1
                        : 0
                    );

                    var currentSlider2Value = parseFloat(
                      gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider2Value <
                      parseFloat(tempPairValue[0].pairStage2)
                    ) {
                      for (var i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(tempPairValue[0].pairStage2)
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .flood-discharge-selected").text(
                            dischargeValues2[$(".fts2 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          //slideWarningShow();
                          break;
                        }
                      }
                    } else if (
                      currentSlider2Value >
                      parseFloat(
                        tempPairValue[tempPairValue.length - 1].pairStage2
                      )
                    ) {
                      for (i = 0; i < gageValues2.length; i++) {
                        if (
                          gageValues2[i].gageValue ==
                          parseFloat(
                            tempPairValue[tempPairValue.length - 1].pairStage2
                          )
                        ) {
                          $(".fts2 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts2 .slider-min.update").text(
                            gageValues2[$(".fts2 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts2 .slider-elev.update").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .elevation-selected").text(
                            altitudeValues2[$(".fts2 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts2 .flood-discharge-selected").text(
                            dischargeValues2[$(".fts2 #floodSlider")[0].value]
                              .dischargeValue || "N/A"
                          );
                          break;
                        }
                      }
                    }

                    var newTempPair = [];
                    $.each(tempPairValue, function (index, value) {
                      if (
                        value.pairStage2 ==
                        gageValues2[$(".fts2 #floodSlider")[0].value].gageValue
                      ) {
                        newTempPair.push({ value });
                      }
                    });

                    newTempPair.sort((a, b) =>
                      Number(a.value.pairStage1) > Number(b.value.pairStage1)
                        ? 1
                        : Number(b.value.pairStage1) >
                          Number(a.value.pairStage1)
                        ? -1
                        : 0
                    );

                    var currentSlider1Value = parseFloat(
                      gageValues[$(".fts1 #floodSlider")[0].value].gageValue
                    );
                    if (
                      currentSlider1Value <
                      parseFloat(newTempPair[0].value.pairStage1)
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(newTempPair[0].value.pairStage1)
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }
                          break;
                        }
                      }
                    } else if (
                      currentSlider1Value >
                      parseFloat(
                        newTempPair[newTempPair.length - 1].value.pairStage1
                      )
                    ) {
                      for (i = 0; i < gageValues.length; i++) {
                        if (
                          gageValues[i].gageValue ==
                          parseFloat(
                            newTempPair[newTempPair.length - 1].value.pairStage1
                          )
                        ) {
                          $(".fts1 #floodSlider")[0].value = i;
                          //slideWarningShow();
                          $(".fts1 .slider-min.update").text(
                            gageValues[$(".fts1 #floodSlider")[0].value]
                              .gageValue
                          );
                          $(".fts1 .slider-elev.update").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );
                          $(".fts1 .elevation-selected").text(
                            altitudeValues[$(".fts1 #floodSlider")[0].value]
                              .altitudeValue || "N/A"
                          );

                          if (
                            typeof dischargeValues[
                              $(".fts1 #floodSlider")[0].value
                            ] !== "undefined"
                          ) {
                            $(".fts1 .flood-discharge-selected").text(
                              dischargeValues[$(".fts1 #floodSlider")[0].value]
                                .dischargeValue
                            );
                          } else {
                            $(".fts1 .flood-discharge-selected").text("N/A");
                          }
                          break;
                        }
                      }
                    }
                  }

                  if (siteAttr["HAS_GRIDS"] == 1) {
                    var gridLayerID;
                    $.each(gagePairs, function (index, value) {
                      if (
                        value.STAGE_1 ==
                          gageValues[$(".fts1 #floodSlider")[0].value]
                            .gageValue &&
                        value.STAGE_2 ==
                          gageValues2[$(".fts2 #floodSlider")[0].value]
                            .gageValue &&
                        value.STAGE_3 ==
                          gageValues3[$(".fts3 #floodSlider")[0].value]
                            .gageValue
                      ) {
                        gridLayerID = value.GRIDID;
                      }
                    });
                    for (var i = 0; i < gridInfos.length; i++) {
                      if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        Number(gridInfos[i].gridid) == gridLayerID
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      } else if (
                        gridInfos[i].shortname == siteAttr.SHORT_NAME &&
                        gridInfos[i].gridid == gridLayerID + "b" &&
                        $("#aouCheckBox").prop("checked") == true
                      ) {
                        gridLayerIndexArrColl.push(gridInfos[i].index);
                        gridLayerIndex = gridInfos[i].index;
                      }
                    }

                    var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
                    var gridVisLayer = [];
                    gridVisLayer.push(gridLayerIndexArrColl);
                    map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
                  }

                  var layerDefinitions = [];
                  layerDefinitions[0] =
                    "USGSID_1 = '" +
                    siteNo +
                    "' AND STAGE_1 = " +
                    gageValues[$(".fts1 #floodSlider")[0].value].gageValue +
                    " AND USGSID_2 = '" +
                    siteNo_2 +
                    "' AND STAGE_2 = " +
                    gageValues2[$(".fts2 #floodSlider")[0].value].gageValue +
                    " AND USGSID_3 = '" +
                    siteNo_3 +
                    "' AND STAGE_3 = " +
                    gageValues3[$(".fts3 #floodSlider")[0].value].gageValue;
                  map
                    .getLayer("fimExtentsThreeSites")
                    .setLayerDefinitions(layerDefinitions);
                  //REVISIT: when using breach service for three sites
                  //map.getLayer("fimBreachThreeSites").setLayerDefinitions(layerDefinitions);
                }
              }
            });

            /*$(".desktop").on("input change", function() 
                            if (results != null) {
                                $("#selectedValue").text(results[$(".fts1 #floodSlider")[0].value].attributes["STAGE"]);
                                var layerDefinitions = [];
                                layerDefinitions[0] = "USGSID = '" + attr["SITE_NO"] + "' AND STAGE = " + results[$(".fts1 #floodSlider")[0].value].attributes["STAGE"];
                                map.getLayer("fimExtents").setLayerDefinitions(layerDefinitions);
                                map.getLayer("fimBreach").setLayerDefinitions(layerDefinitions);

                                for (var i=0; i < gridInfos.length; i++) {
                                    if (gridInfos[i].shortname == siteAttr.SHORT_NAME && Number(gridInfos[i].gridid) == results[$(".fts1 #floodSlider")[0].value].attributes["GRIDID"]) {
                                        gridLayerIndexArrColl.push(gridInfos[i].index);
                                        gridLayerIndex = gridInfos[i].index;
                                    } else if (gridInfos[i].shortname == siteAttr.SHORT_NAME && gridInfos[i].gridid == results[$(".fts1 #floodSlider")[0].value].attributes["GRIDID"]+'b') {
                                        gridLayerIndexArrColl.push(gridInfos[i].index);
                                        gridLayerIndex = gridInfos[i].index;
                                    }
                                }

                                //set grids layer definitions/choose the right layer here and in next input change function
                                var gridLayer = "fimGrid" + siteAttr.GRID_SERV;
                                var gridVisLayer = [];
                                gridVisLayer.push(gridLayerIndex);
                                map.getLayer(gridLayer).setVisibleLayers(gridVisLayer);
                                //map.getLayer(gridLayer).setVisibility(true);
                                
                            }
                        });*/

            var instanceX = docWidth * 0.5 - $("#floodToolsDiv").width() * 0.5;
            var instanceY =
              docHeight * 0.5 - $("#floodToolsDiv").height() * 0.5;

            $.when(nwisCall, nwsCall, nwisCall2, nwsCall2, nwisCall3, nwsCall3) //)
              .done(function (
                nwisData,
                nwsData,
                nwisData2 = null,
                nwsData2 = null,
                nwisData3 = null,
                nwsData3 = null
              ) {
                //}) {

                //NWIS data handling
                var siteData = $.parseJSON(nwisData[0]);
                var siteData2;
                var siteData3;

                var gageIndex;
                var dischargeIndex;
                pcodeAbbr = null;
                $.each(siteData.data, function (key, value) {
                  console.log(key);
                  if (siteData.data[key].parameter_cd == "00065") {
                    gageIndex = key;
                    pcodeAbbr = "gh";
                  } else if (siteData.data[key].parameter_cd == "00060") {
                    dischargeIndex = key;
                  } else if (siteData.data[key].parameter_cd == "62614") {
                    gageIndex = key;
                    pcodeAbbr = "ngvd29_lake";
                  } else if (siteData.data[key].parameter_cd == "62615") {
                    gageIndex = key;
                    pcodeAbbr = "navd88_lake";
                  } else if (siteData.data[key].parameter_cd == "63160") {
                    gageIndex = key;
                    pcodeAbbr = "navd88_stream";
                  } else if (siteData.data[key].parameter_cd == "72214") {
                    gageIndex = key;
                    pcodeAbbr = "igld";
                  }
                });

                var hydroChartYAxisLabel;

                // Adjust labels for value changed by slider here
                switch (pcodeAbbr) {
                  case "gh":
                    $(".ghselected").show();
                    $("#sliderSelected").show();
                    $(".slider-min.update").show();
                    $("#sliderSelected").html(
                      "<small>Selected Gage Height (" +
                        siteDatumInfo[1] +
                        "):</small>"
                    );
                    $(".slider-elev-label").hide();
                    $(".slider-elev.update").hide();
                    $("#currentValue").text(
                      "Gage Height (" + siteDatumInfo[1] + ")"
                    );
                    $("#selectedElevValue").text(
                      "Elevation (" + siteDatumInfo[1] + ")"
                    );
                    hydroChartYAxisLabel =
                      "Gage height (" + siteDatumInfo[1] + ")";
                    break;
                  case "ngvd29_lake":
                    $(".ghselected").hide();
                    $("#sliderSelected").hide();
                    $(".slider-min.update").hide();
                    //$("#sliderSelected").html("<small>Selected Lake Water Level Elevation (NGVD29):</small>");
                    $(".slider-elev-label").show();
                    $(".slider-elev-label").html(
                      "<small>Selected Lake Water Level Elevation (NGVD29):</small>"
                    );
                    $(".slider-elev.update").show();
                    $("#currentValue").text(
                      "Lake Water Level Elevation (NGVD29)"
                    );
                    $("#selectedElevValue").text(
                      "Lake Water Level Elevation (NGVD29)"
                    );
                    hydroChartYAxisLabel =
                      "Lake Water Level Elevation (NGVD29)";
                    break;
                  case "navd88_lake":
                    $(".ghselected").hide();
                    $("#sliderSelected").hide();
                    $(".slider-min.update").hide();
                    //$("#sliderSelected").html("<small>Selected Lake Water Level Elevation (NAVD88):</small>");
                    $(".slider-elev-label").show();
                    $(".slider-elev-label").html(
                      "<small>Selected Lake Water Level Elevation (" +
                        siteDatumInfo[1] +
                        "):</small>"
                    );
                    $(".slider-elev.update").show();
                    $("#currentValue").text(
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    $("#selectedElevValue").text(
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    hydroChartYAxisLabel =
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")";
                    break;
                  case "navd88_stream":
                    $(".ghselected").hide();
                    $("#sliderSelected").hide();
                    $(".slider-min.update").hide();
                    //$("#sliderSelected").html("<small>Selected Stream Water Level Elevation (NAVD88):</small>");
                    $(".slider-elev-label").show();
                    $(".slider-elev-label").html(
                      "<small>Selected Stream Water Level Elevation (" +
                        siteDatumInfo[1] +
                        "):</small>"
                    );
                    $(".slider-elev.update").show();
                    $("#currentValue").text(
                      "Stream Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    $("#selectedElevValue").text(
                      "Stream Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    hydroChartYAxisLabel =
                      "Stream Water Level Elevation (" + siteDatumInfo[1] + ")";
                    break;
                  case "igld":
                    $(".ghselected").hide();
                    $("#sliderSelected").hide();
                    $(".slider-min.update").hide();
                    //$("#sliderSelected").html("<small>Selected Stream Water Level Elevation (NAVD88):</small>");
                    $(".slider-elev-label").show();
                    $(".slider-elev-label").html(
                      "<small>Selected Lake Water Level Elevation (" +
                        siteDatumInfo[1] +
                        "):</small>"
                    );
                    $(".slider-elev.update").show();
                    $("#currentValue").text(
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    $("#selectedElevValue").text(
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")"
                    );
                    hydroChartYAxisLabel =
                      "Lake Water Level Elevation (" + siteDatumInfo[1] + ")";
                    break;
                  case "igld":
                    $(".ghselected").hide();
                    $("#sliderSelected").hide();
                    $(".slider-min.update").hide();
                    //$("#sliderSelected").html("<small>Selected Stream Water Level Elevation (NAVD88):</small>");
                    $(".slider-elev-label").show();
                    $(".slider-elev-label").html(
                      "<small>Selected Lake Water Level Elevation (IGLD):</small>"
                    );
                    $(".slider-elev.update").show();
                    $("#currentValue").text(
                      "Lake Water Level Elevation (IGLD)"
                    );
                    $("#selectedElevValue").text(
                      "Lake Water Level Elevation (IGLD)"
                    );
                    hydroChartYAxisLabel = "Lake Water Level Elevation (IGLD)";
                    break;
                  default:
                    $(".ghselected").show();
                    $("#sliderSelected").show();
                    $(".slider-min.update").show();
                    $("#sliderSelected").html(
                      "<small>Selected Gage Height:</small>"
                    );
                    $(".slider-elev-label").hide();
                    $(".slider-elev.update").hide();
                    $("#currentValue").text("Gage Height");
                    $("#selectedElevValue").text("Elevation");
                    hydroChartYAxisLabel = "Gage height";
                }

                var values = siteData.data[gageIndex].time_series_data;

                // var finalNWISDataArray = finalNWISDataArrayBuild(siteData.data[0].time_series_data);
                // var finalNWSDataArray = finalNWSDataArrayBuild(nwsData[0]);
                var finalNWISDataArray = finalNWISDataArrayBuild(values);
                var finalNWSDataArray = finalNWSDataArrayBuild(nwsData[0]);

                var finalNWISDataArray2 = [];
                var finalNWSDataArray2 = [];
                var finalNWISDataArray3 = [];
                var finalNWSDataArray3 = [];

                var gageIndex2;
                var gageIndex3;
                var dischargeIndex2;
                var dischargeIndex3;

                if (nwisData2[0].search('{"site') != -1) {
                  siteData2 = $.parseJSON(nwisData2[0]);
                  if (siteData2) {
                    $.each(siteData2.data, function (key, value) {
                      console.log(key);
                      if (siteData2.data[key].parameter_cd == "00065") {
                        gageIndex2 = key;
                      } else if (siteData2.data[key].parameter_cd == "00060") {
                        dischargeIndex2 = key;
                      }
                    });
                  }
                  finalNWISDataArray2 = finalNWISDataArrayBuild(
                    siteData2.data[gageIndex2].time_series_data
                  );
                }
                if (nwisData3[0].search('{"site') != -1) {
                  siteData3 = $.parseJSON(nwisData3[0]);
                  if (siteData3) {
                    $.each(siteData3.data, function (key, value) {
                      console.log(key);
                      if (siteData3.data[key].parameter_cd == "00065") {
                        gageIndex3 = key;
                      } else if (siteData3.data[key].parameter_cd == "00060") {
                        dischargeIndex3 = key;
                      }
                    });
                  }
                  finalNWISDataArray3 = finalNWISDataArrayBuild(
                    siteData3.data[gageIndex3].time_series_data
                  );
                }

                function finalNWISDataArrayBuild(values) {
                  var finalDataArray = [];
                  $.each(values, function (key, value) {
                    if (value[0] !== undefined) {
                      var time = value[0];
                      var value = value[1];

                      finalDataArray.push([time, value]);
                    }
                  });
                  return finalDataArray;
                }

                console.log("current gage height here");

                // ======================================================
                // ======================================================
                // Set current Gage Height and Discharge Values
                // ======================================================
                // ======================================================
                // Reset Vals
                $("#floodGage").text("N/A");
                $("#floodDischarge").text("N/A");
                // Site One
                if (finalNWISDataArray.length > 0) {
                  var val =
                    finalNWISDataArray[finalNWISDataArray.length - 1][1];
                  if (gageValues[0] && val > gageValues[0].gageValue) {
                    $(".floodSlider.first-slider").value = val;
                  } else {
                    console.log("Current height lower");
                  }
                  $(".fts1 #floodGage").text(val);
                  if (topTenValues.length != topTenDates.length) {
                    topTenValues.unshift(
                      Number({ y: Number(val), color: "#000000" })
                    );
                  } else if (
                    topTenValues.length > 0 &&
                    topTenValues.length == topTenDates.length
                  ) {
                    topTenValues[0] = { y: Number(val), color: "#000000" };
                    topTenChart.series[0].update({
                      data: topTenValues,
                      name: "Top Ten Flood Peaks",
                    });
                    //topTenChart.redraw();
                  }
                }
                // Site One Discharge
                if (
                  dischargeIndex != null &&
                  siteData.data[dischargeIndex].time_series_data.length > 0 &&
                  siteData.data[dischargeIndex].time_series_data[
                    siteData.data[dischargeIndex].time_series_data.length - 1
                  ][1] != null
                ) {
                  $(".fts1 #floodDischarge").text(
                    siteData.data[dischargeIndex].time_series_data[
                      siteData.data[dischargeIndex].time_series_data.length - 1
                    ][1]
                  );
                } else if (
                  dischargeIndex != null &&
                  siteData.data[dischargeIndex].time_series_data.length > 0
                ) {
                  $(".fts1 #floodDischarge").text(
                    "N/A (" +
                      siteData.data[dischargeIndex].time_series_data[
                        siteData.data[dischargeIndex].time_series_data.length -
                          1
                      ][2] +
                      ")"
                  );
                } else {
                  $(".fts1 #floodDischarge").text("N/A");
                }
                // Site Two
                if (finalNWISDataArray2.length > 0) {
                  var val =
                    finalNWISDataArray2[finalNWISDataArray2.length - 1][1];
                  if (val > gageValues2[0].gageValue) {
                    $(".floodSlider.second-slider").value = val;
                  } else {
                    console.log("Current height lower");
                  }
                  $(".fts2 #floodGage").text(val);
                }
                // Site Two Discharge
                if (
                  dischargeIndex2 != null &&
                  siteData2 &&
                  siteData2.data[dischargeIndex2].time_series_data.length > 0 &&
                  siteData2.data[dischargeIndex2].time_series_data[
                    siteData2.data[dischargeIndex2].time_series_data.length - 1
                  ][1] != null
                ) {
                  $(".fts2 #floodDischarge").text(
                    siteData2.data[dischargeIndex2].time_series_data[
                      siteData2.data[dischargeIndex2].time_series_data.length -
                        1
                    ][1]
                  );
                } else if (
                  dischargeIndex2 != null &&
                  siteData2 &&
                  siteData2.data[dischargeIndex2].time_series_data.length > 0 &&
                  siteData2.data[dischargeIndex2].time_series_data[
                    siteData2.data[dischargeIndex2].time_series_data.length - 1
                  ].length > 2
                ) {
                  $(".fts2 #floodDischarge").text(
                    "N/A (" +
                      siteData2.data[dischargeIndex2].time_series_data[
                        siteData2.data[dischargeIndex2].time_series_data
                          .length - 1
                      ][2] +
                      ")"
                  );
                } else {
                  $(".fts2 #floodDischarge").text("N/A");
                }
                // Site Three
                if (finalNWISDataArray3.length > 0) {
                  var val =
                    finalNWISDataArray3[finalNWISDataArray3.length - 1][1];
                  if (val > gageValues3[0].gageValue) {
                    $(".floodSlider.third-slider").value = val;
                  } else {
                    console.log("Current height lower");
                  }
                  $(".fts3 #floodGage").text(val);
                }
                // Site Three Discharge
                if (
                  dischargeIndex3 != null &&
                  siteData3 &&
                  siteData3.data[dischargeIndex3].time_series_data.length > 0 &&
                  siteData3.data[dischargeIndex3].time_series_data[
                    siteData3.data[dischargeIndex3].time_series_data.length - 1
                  ][1] != null
                ) {
                  $(".fts3 #floodDischarge").text(
                    siteData3.data[dischargeIndex3].time_series_data[
                      siteData3.data[dischargeIndex3].time_series_data.length -
                        1
                    ][1]
                  );
                } else if (
                  dischargeIndex3 != null &&
                  siteData3 &&
                  siteData3.data[dischargeIndex3].time_series_data.length > 0 &&
                  siteData3.data[dischargeIndex3].time_series_data[
                    siteData3.data[dischargeIndex3].time_series_data.length - 1
                  ].length > 2
                ) {
                  $(".fts3 #floodDischarge").text(
                    "N/A (" +
                      siteData3.data[dischargeIndex3].time_series_data[
                        siteData3.data[dischargeIndex3].time_series_data
                          .length - 1
                      ][2] +
                      ")"
                  );
                } else {
                  $(".fts3 #floodDischarge").text("N/A");
                }

                if (
                  nwsData2[0].children &&
                  nwsData2[0].children[0].children[0].textContent !=
                    "no nws data"
                ) {
                  finalNWSDataArray2 = finalNWSDataArrayBuild(nwsData2[0]);
                }
                if (
                  nwsData3[0].children &&
                  nwsData3[0].children[0].children[0].textContent !=
                    "no nws data"
                ) {
                  finalNWSDataArray3 = finalNWSDataArrayBuild(nwsData3[0]);
                }

                //REVISIT: fix after getting single site data to work
                function finalNWSDataArrayBuild(values) {
                  var finalDataArray = [];
                  var nwsIndex = getNwsForecastIndex(
                    values.children[0].children
                  );
                  if (
                    values.children[0].children[nwsIndex] &&
                    values.children[0].children[nwsIndex].children.length > 0
                  ) {
                    var nwsValues =
                      values.children[0].children[nwsIndex].children;
                  }
                  if (nwsValues && nwsValues.length > 0) {
                    var nwsDatum =
                      nwsValues[0].children[1].attributes.name.value == "Stage"
                        ? 1
                        : 2;
                    $.each(nwsValues, function (key, value) {
                      if (value.children[0].textContent !== "") {
                        var time = dateFix(
                          value.children[0].textContent,
                          "nws"
                        );
                        var value = Number(
                          value.children[nwsDatum].textContent
                        );

                        finalDataArray.push([time, value]);
                      }
                    });
                  }
                  return finalDataArray;
                }

                // ========================================================================

                // Get Site Locations
                // Get Site Locations
                // Get Site Locations
                // ========================================================================
                function getSiteLocation(siteNo) {
                  var foundSiteName = "";
                  // Getting multi site location
                  $.each(
                    map.getLayer("fimSites").graphics,
                    function (index, value) {
                      if (siteNo === value.attributes.SITE_NO) {
                        console.log(
                          "Multi Site: " +
                            value.attributes.STATE +
                            ": " +
                            value.attributes.COMMUNITY
                        );
                        foundSiteName =
                          value.attributes.STATE +
                          ": " +
                          value.attributes.COMMUNITY;
                      }
                    }
                  );
                  return foundSiteName;
                }

                // ========================================================================
                // ========================================================================
                // Get Flood Stages
                // Get Flood Stages
                // Get Flood Stages
                // ========================================================================
                // ========================================================================

                function getFloodStages(data, siteNo) {
                  console.log("Get Flood Stages");
                  console.log(data);

                  // If NWS Data does not exist
                  if (
                    data[0].toString().startsWith(" <!") ||
                    data[0].toString().startsWith("<!") ||
                    data[0].getElementsByTagName("response")[0]
                  ) {
                    console.log("NWS Data Not Available");
                    $(".fts" + siteNo + " .nws-data-req").addClass(
                      "nws-data-hidden"
                    );

                    floodToolsError("nws");

                    var levels = new Object();
                    levels.action = 0;
                    levels.flood = 0;
                    levels.moderate = 0;
                    levels.major = 0;
                    levels.top_curve = 0;

                    console.log("Empty Flood Stages");
                    return levels;
                  } else {
                    // If NWS Data DOES exist

                    $(".nws-data-hidden").removeClass("nws-data-hidden");
                    var levels = new Object();
                    levels.action =
                      data[0].getElementsByTagName("action")[0].childNodes
                        .length > 0
                        ? data[0].getElementsByTagName("action")[0]
                            .childNodes[0].nodeValue
                        : null;
                    levels.flood =
                      data[0].getElementsByTagName("flood")[0].childNodes
                        .length > 0
                        ? data[0].getElementsByTagName("flood")[0].childNodes[0]
                            .nodeValue
                        : null;
                    levels.moderate =
                      data[0].getElementsByTagName("moderate")[0].childNodes
                        .length > 0
                        ? data[0].getElementsByTagName("moderate")[0]
                            .childNodes[0].nodeValue
                        : null;

                    var tempMajor =
                      data[0].getElementsByTagName("major")[0].childNodes
                        .length > 0
                        ? data[0].getElementsByTagName("major")[0].childNodes[0]
                            .nodeValue
                        : null;
                    var tempCurve = siteAttr.TOP_CURVE;

                    // console.log("tempMajor");
                    // console.log(tempMajor);
                    // console.log("tempRecord");
                    // console.log(tempRecord);

                    if (tempCurve != null && tempCurve > tempMajor) {
                      levels.major = tempMajor;
                      levels.top_curve = siteAttr.TOP_CURVE;
                    } else {
                      levels.major = tempMajor;
                      levels.top_curve = null;
                    }

                    console.log("Flood stages");
                    console.log(levels);
                    return levels;
                  }
                }

                // ===============================================================
                // ===============================================================
                // Create Flood Stage Bands
                // Create Flood Stage Bands
                // Create Flood Stage Bands
                // ===============================================================
                // ===============================================================
                var createFloodStageBand = function (sliderStages, sliderMax) {
                  var stage = sliderStages;

                  var max = sliderMax;

                  if (stage.major == null) {
                    stage.major = max;
                  }
                  if (stage.moderate == null) {
                    stage.moderate = stage.major;
                  }
                  if (stage.flood == null) {
                    stage.flood = stage.moderate;
                  }

                  var band = new Array();

                  if (
                    (stage.flood == null &&
                      stage.moderate == null &&
                      stage.major == null) ||
                    (stage.flood == 0 &&
                      stage.moderate == 0 &&
                      stage.major == 0)
                  ) {
                    // Empty fs bands with missing data
                    band.push({
                      color: "#fff",
                      from: 0,
                      to: 0,
                      label: { text: "" },
                    });
                    band.push({
                      color: "#fff",
                      from: 0,
                      to: 0,
                      label: { text: "" },
                    });
                    band.push({
                      color: "#fff",
                      from: 0,
                      to: 0,
                      label: { text: "" },
                    });
                    band.push({
                      color: "#fff",
                      from: 0,
                      to: 0,
                      label: { text: "" },
                    });
                    band.push({
                      color: "#fff",
                      from: 0,
                      to: Number(max) + 1,
                      label: { text: "" },
                    });
                  } else {
                    band.push({
                      color: "#D8E1EE",
                      from: 0,
                      to: stage.action,
                      label: { text: "Below Action" },
                    });
                    band.push({
                      color: "#FDFB51",
                      from: stage.action,
                      to: stage.flood,
                      label: { text: "Action" },
                    });
                    band.push({
                      color: "#FAA629",
                      from: stage.flood,
                      to: stage.moderate,
                      label: { text: "Minor Flooding" },
                    });
                    band.push({
                      color: "#FC0D1B",
                      from: stage.moderate,
                      to: stage.major,
                      label: { text: "Moderate Flooding" },
                    });
                    // If Top Curve Exists
                    // Add Band for Extended Rating
                    if (stage.top_curve != null && stage.top_curve != 0) {
                      band.push({
                        color: "#C326FB",
                        from: stage.major,
                        to: stage.top_curve,
                        label: { text: "Major Flooding" },
                      });
                      band.push({
                        color: "#35445b",
                        from: stage.top_curve,
                        to: max,
                        label: { text: "Extended Rating" },
                      });
                    } else if (stage.major != 0) {
                      band.push({
                        color: "#C326FB",
                        from: stage.major,
                        to: max,
                        label: { text: "Major Flooding" },
                      });
                    }
                  }

                  return band;
                };

                // ===============================================================
                // ===============================================================
                // Slider & Current Values
                // Slider & Current Values
                // Slider & Current Values
                // ===============================================================
                // ===============================================================

                var sliderStages = getFloodStages(nwsData, 1);

                var sliderMax1;
                if (pcodeAbbr == "gh") {
                  if (gageValues.length > 0) {
                    sliderMax1 = gageValues[gageValues.length - 1].gageValue;
                  }
                } else {
                  if (altitudeValues.length > 0) {
                    sliderMax1 =
                      altitudeValues[altitudeValues.length - 1].altitudeValue;
                  }
                }

                // Create Flood Stage Bands
                var floodStageBands = createFloodStageBand(
                  sliderStages,
                  sliderMax1
                );

                // Set slider values
                // Set slider values
                // Set slider values
                $(".fts1 .floodSlider").attr({
                  min: 0,
                  max: gageValues.length - 1,
                });
                // If Two Sites
                if (siteAttr["MULTI_SITE"] >= 1) {
                  $(".fts2 .floodSlider").attr({
                    min: 0,
                    max: gageValues2.length - 1,
                  });
                  // If Three Sites
                  if (siteAttr["MULTI_SITE"] >= 2) {
                    $(".fts3 .floodSlider").attr({
                      min: 0,
                      max: gageValues3.length - 1,
                    });
                  }
                }

                // Calculate slider color heights
                // Calculate slider color heights
                // Calculate slider color heights
                function heightFractionGet(lowEnd, highEnd, gages) {
                  var fraction;
                  var values = [Number(lowEnd), Number(highEnd)];
                  var lowi = -1;
                  var highi = -1;
                  var lowSolved = false;
                  var highSolved = false;

                  var gageValuesStages = new Array();
                  if (pcodeAbbr == "gh") {
                    gages.forEach(function (object) {
                      gageValuesStages.push({
                        stage: Number(object.gageValue),
                      });
                    });
                  } else {
                    gages.forEach(function (object) {
                      gageValuesStages.push({
                        stage: Number(object.altitudeValue),
                      });
                    });
                  }

                  values.forEach(function (value) {
                    if (lowSolved == false) {
                      lowi = -1;
                    }
                    if (highSolved == false) {
                      highi = -1;
                    }
                    for (i = 1; i < gageValuesStages.length; i++) {
                      if (lowSolved == false || highSolved == false) {
                        if (value == gageValuesStages[i - 1].stage) {
                          if (value == lowEnd && lowSolved == false) {
                            lowi = i - 1;
                            lowSolved = true;
                          } else if (value == highEnd && highSolved == false) {
                            highi = i - 1;
                            highSolved = true;
                          }
                        } else if (
                          value > gageValuesStages[i - 1].stage &&
                          value < gageValuesStages[i].stage
                        ) {
                          if (value == lowEnd && lowSolved == false) {
                            lowi = i - 0.5;
                            lowSolved = true;
                          } else if (value == highEnd && highSolved == false) {
                            highi = i - 0.5;
                            highSolved = true;
                          }
                        } else if (value == gageValuesStages[i].stage) {
                          if (value == lowEnd && lowSolved == false) {
                            lowi = i;
                            lowSolved = true;
                          } else if (value == highEnd && highSolved == false) {
                            highi = i;
                            highSolved = true;
                          }
                        } else if (value < gageValuesStages[i - 1].stage) {
                          if (value == lowEnd && lowSolved == false) {
                            lowi = 0;
                            lowSolved = true;
                          } else if (value == highEnd && highSolved == false) {
                            highi = 0;
                            highSolved = true;
                          }
                        } else if (
                          value > gageValuesStages[i].stage &&
                          i == gageValuesStages.length - 1
                        ) {
                          if (value == lowEnd && lowSolved == false) {
                            lowi = i;
                            lowSolved = true;
                            highSolved = true;
                          } else if (value == highEnd && highSolved == false) {
                            highi = i;
                            highSolved = true;
                          }
                        }
                      }
                    }
                  });

                  var iDiff = highi - lowi;

                  fraction = iDiff / gageValuesStages.length;

                  if (fraction < 0) {
                    fraction = 0;
                  }

                  return fraction;
                } // End heightFractionGett

                if (gageValues[0]) {
                  // Flood levels near slider - Site 1
                  if (pcodeAbbr == "gh") {
                    $(".fts1 .slider-min").text(gageValues[0].gageValue);
                    $(".fts1 .slider-max").text(
                      gageValues[gageValues.length - 1].gageValue
                    );
                  } else {
                    $(".fts1 .slider-min").text(
                      altitudeValues[0].altitudeValue
                    );
                    $(".fts1 .slider-max").text(
                      altitudeValues[altitudeValues.length - 1].altitudeValue
                    );
                  }

                  // Calculate slider band heights
                  if (pcodeAbbr == "gh") {
                    var flMax1 = gageValues[gageValues.length - 1].gageValue;
                    var flMin1 = gageValues[0].gageValue;
                    var flDiff1 = flMax1 - flMin1;

                    var whiteVal =
                      heightFractionGet(0, sliderStages.action, gageValues) *
                      100;
                    var actionVal =
                      heightFractionGet(0, sliderStages.flood, gageValues) *
                      100;
                    var minorVal =
                      heightFractionGet(0, sliderStages.moderate, gageValues) *
                      100;
                    var moderateVal =
                      heightFractionGet(0, sliderStages.major, gageValues) *
                      100;
                    var majorVal;
                    var extendedVal;
                  } else {
                    var flMax1 =
                      altitudeValues[altitudeValues.length - 1].altitudeValue;
                    var flMin1 = altitudeValues[0].altitudeValue;
                    var flDiff1 = flMax1 - flMin1;

                    var whiteVal =
                      heightFractionGet(
                        0,
                        sliderStages.action,
                        altitudeValues
                      ) * 100;
                    var actionVal =
                      heightFractionGet(0, sliderStages.flood, altitudeValues) *
                      100;
                    var minorVal =
                      heightFractionGet(
                        0,
                        sliderStages.moderate,
                        altitudeValues
                      ) * 100;
                    var moderateVal =
                      heightFractionGet(0, sliderStages.major, altitudeValues) *
                      100;
                    var majorVal;
                    var extendedVal;
                  }

                  $(".fts1 .sliderWhiteSpace").css("width", whiteVal + "%");
                  $(".fts1 .sliderActionLevel").css("width", actionVal + "%");
                  $(".fts1 .sliderMinorLevel").css("width", minorVal + "%");
                  $(".fts1 .sliderModerateLevel").css(
                    "width",
                    moderateVal + "%"
                  );

                  // If "Top Curve" / Extended exists
                  if (sliderStages.top_curve != null && pcodeAbbr == "gh") {
                    // Check if Extended starts at top of slider
                    // if so, don't show it
                    if (
                      sliderStages.top_curve ==
                      gageValues[gageValues.length - 1].gageValue
                    ) {
                      $(".fts1 .sliderMajorLevel").css("width", "100%");
                      $(".fts1 .sliderExtendedLevel").css("width", "0%");
                    } else {
                      // Show extended rating
                      majorVal =
                        heightFractionGet(
                          0,
                          sliderStages.top_curve,
                          gageValues
                        ) * 100;
                      $(".fts1 .sliderMajorLevel").css("width", majorVal + "%");
                      $(".fts1 .sliderExtendedLevel").css("width", "100%");
                    }
                  } else {
                    $(".fts1 .sliderMajorLevel").css("width", "100%");
                    $(".fts1 .sliderExtendedLevel").css("width", "0%");
                  }

                  // Hide all levels if all equal zero
                  if (
                    sliderStages.action == 0 &&
                    sliderStages.flood == 0 &&
                    sliderStages.moderate == 0 &&
                    sliderStages.major == 0
                  ) {
                    $(".fts1 .slider-levels").css("opacity", "0.07");
                  } else {
                    $(".fts1 .slider-levels").css("opacity", "1");
                  }

                  // Log
                  console.log("Flood stage bands");
                  console.log(floodStageBands);
                } else {
                  console.log("Gage values not loaded?");
                  console.log(gageValues);
                  floodToolsError();
                }

                // Single Site Check
                if (attr["MULTI_SITE"] == 0) {
                  console.log("Single Site: Site 1 NWS Data");
                  console.log(nwsData);
                } else if (attr["MULTI_SITE"] > 0) {
                  console.log("Multi Site: Site 2 NWS Data");
                  console.log(nwsData2);

                  // Get site location name
                  $(".fts1 #siteName").text(getSiteLocation(siteNo));
                  $(".fts2 #siteName").text(getSiteLocation(siteNo_2));

                  // Change flood tools header to site numbers
                  $("#floodToolsModalHeader").text(
                    "Site Numbers " + siteNo + " & " + siteNo_2
                  );

                  var sliderStages2 = getFloodStages(nwsData2, 2);
                  var sliderMax2;
                  if (pcodeAbbr == "gh") {
                    if (gageValues2.length > 0) {
                      sliderMax2 =
                        gageValues2[gageValues2.length - 1].gageValue;
                    }
                  } else {
                    if (altitudeValues2.length > 0) {
                      sliderMax2 =
                        altitudeValues2[altitudeValues2.length - 1]
                          .altitudeValue;
                    }
                  }

                  // Second Site Flood Bands
                  if (typeof nwsData2[0] !== "string") {
                    // Create Flood Stage Bands
                    var floodStageBands2 = createFloodStageBand(
                      sliderStages2,
                      sliderMax2
                    );
                  }

                  // Second Site
                  if (gageValues2.length > 0) {
                    // Flood levels near slider - Site 2
                    if (pcodeAbbr == "gh") {
                      $(".fts2 .slider-min").text(gageValues2[0].gageValue);
                      $(".fts2 .slider-max").text(
                        gageValues2[gageValues2.length - 1].gageValue
                      );
                    } else {
                      $(".fts2 .slider-min").text(
                        altitudeValues2[0].altitudeValue
                      );
                      $(".fts2 .slider-max").text(
                        altitudeValues2[altitudeValues2.length - 1]
                          .altitudeValue
                      );
                    }

                    // Calculate slider band heights
                    if (pcodeAbbr == "gh") {
                      var flMax2 =
                        gageValues2[gageValues2.length - 1].gageValue;
                      var flMin2 = gageValues2[0].gageValue;
                      var flDiff2 = flMax2 - flMin2;

                      var whiteVal =
                        heightFractionGet(
                          0,
                          sliderStages2.action,
                          gageValues2
                        ) * 100;
                      var actionVal =
                        heightFractionGet(0, sliderStages2.flood, gageValues2) *
                        100;
                      var minorVal =
                        heightFractionGet(
                          0,
                          sliderStages2.moderate,
                          gageValues2
                        ) * 100;
                      var moderateVal =
                        heightFractionGet(0, sliderStages2.major, gageValues2) *
                        100;
                      var majorVal;
                      var extendedVal;
                    } else {
                      var flMax2 =
                        altitudeValues2[altitudeValues2.length - 1]
                          .altitudeValue;
                      var flMin2 = altitudeValues2[0].altitudeValue;
                      var flDiff2 = flMax2 - flMin2;

                      var whiteVal =
                        heightFractionGet(
                          0,
                          sliderStages2.action,
                          altitudeValues2
                        ) * 100;
                      var actionVal =
                        heightFractionGet(
                          0,
                          sliderStages2.flood,
                          altitudeValues2
                        ) * 100;
                      var minorVal =
                        heightFractionGet(
                          0,
                          sliderStages2.moderate,
                          altitudeValues2
                        ) * 100;
                      var moderateVal =
                        heightFractionGet(
                          0,
                          sliderStages2.major,
                          altitudeValues2
                        ) * 100;
                      var majorVal;
                      var extendedVal;
                    }

                    $(".fts2 .sliderWhiteSpace").css("width", whiteVal + "%");
                    $(".fts2 .sliderActionLevel").css("width", actionVal + "%");
                    $(".fts2 .sliderMinorLevel").css("width", minorVal + "%");
                    $(".fts2 .sliderModerateLevel").css(
                      "width",
                      moderateVal + "%"
                    );

                    // If "Top Curve" / Extended exists
                    if (sliderStages2.top_curve != null && pcodeAbbr == "gh") {
                      // Check if Extended starts at top of slider
                      // if so, don't show it
                      if (
                        sliderStages2.top_curve ==
                        gageValues2[gageValues2.length - 1].gageValue
                      ) {
                        $(".fts2 .sliderMajorLevel").css("width", "100%");
                        $(".fts2 .sliderExtendedLevel").css("width", "0%");
                      } else {
                        // Show extended rating
                        majorVal =
                          heightFractionGet(
                            0,
                            sliderStages2.top_curve,
                            gageValues
                          ) * 100;
                        $(".fts2 .sliderMajorLevel").css(
                          "width",
                          majorVal + "%"
                        );
                        $(".fts2 .sliderExtendedLevel").css("width", "100%");
                      }
                    } else {
                      $(".fts2 .sliderMajorLevel").css("width", "100%");
                      $(".fts2 .sliderExtendedLevel").css("width", "0%");
                    }

                    // Hide all levels if all equal zero
                    if (
                      sliderStages2.action == 0 &&
                      sliderStages.flood == 0 &&
                      sliderStages.moderate == 0 &&
                      sliderStages.major == 0
                    ) {
                      $(".fts2 .slider-levels").css("opacity", "0.07");
                    } else {
                      $(".fts2 .slider-levels").css("opacity", "1");
                    }
                  }
                }
                // Third Site
                if (attr["MULTI_SITE"] > 1) {
                  console.log("Triple site: Site 3 NWS Data");
                  console.log(nwsData3);
                  // Change flood tools header to site numbers
                  $("#floodToolsModalHeader").text(
                    "Site Numbers " +
                      siteNo +
                      " & " +
                      siteNo_2 +
                      " & " +
                      siteNo_3
                  );

                  // Get site location name
                  $(".fts3 #siteName").text(getSiteLocation(siteNo_3));

                  var sliderStages3 = getFloodStages(nwsData3, 3);
                  var sliderMax3;
                  if (gageValues3.length > 0) {
                    sliderMax3 = gageValues3[gageValues3.length - 1].gageValue;
                  }

                  if (pcodeAbbr == "gh") {
                    if (gageValues3.length > 0) {
                      sliderMax3 =
                        gageValues3[gageValues3.length - 1].gageValue;
                    }
                  } else {
                    if (altitudeValues3.length > 0) {
                      sliderMax3 =
                        altitudeValues3[altitudeValues3.length - 1]
                          .altitudeValue;
                    }
                  }

                  // Third Site Flood Bands
                  if (typeof nwsData2[0] !== "string") {
                    // Create Flood Stage Bands
                    var floodStageBands3 = createFloodStageBand(
                      sliderStages3,
                      sliderMax3
                    );
                  }

                  // Flood levels near slider - Site 3
                  if (pcodeAbbr == "gh") {
                    $(".fts3 .slider-min").text(gageValues3[0].gageValue);
                    $(".fts3 .slider-max").text(
                      gageValues3[gageValues3.length - 1].gageValue
                    );
                  } else {
                    $(".fts3 .slider-min").text(
                      altitudeValues3[0].altitudeValue
                    );
                    $(".fts3 .slider-max").text(
                      altitudeValues3[altitudeValues3.length - 1].altitudeValue
                    );
                  }

                  // Calculate slider band heights
                  if (pcodeAbbr == "gh") {
                    var flMax3 = gageValues3[gageValues3.length - 1].gageValue;
                    var flMin3 = gageValues3[0].gageValue;
                    var flDiff3 = flMax3 - flMin3;

                    var whiteVal =
                      heightFractionGet(0, sliderStages3.action, gageValues3) *
                      100;
                    var actionVal =
                      heightFractionGet(0, sliderStages3.flood, gageValues3) *
                      100;
                    var minorVal =
                      heightFractionGet(
                        0,
                        sliderStages3.moderate,
                        gageValues3
                      ) * 100;
                    var moderateVal =
                      heightFractionGet(0, sliderStages3.major, gageValues3) *
                      100;
                    var majorVal;
                    var extendedVal;
                  } else {
                    var flMax3 =
                      altitudeValues3[altitudeValues3.length - 1].altitudeValue;
                    var flMin3 = altitudeValues3[0].altitudeValue;
                    var flDiff3 = flMax3 - flMin3;

                    var whiteVal =
                      heightFractionGet(
                        0,
                        sliderStages3.action,
                        altitudeValues3
                      ) * 100;
                    var actionVal =
                      heightFractionGet(
                        0,
                        sliderStages3.flood,
                        altitudeValues3
                      ) * 100;
                    var minorVal =
                      heightFractionGet(
                        0,
                        sliderStages3.moderate,
                        altitudeValues3
                      ) * 100;
                    var moderateVal =
                      heightFractionGet(
                        0,
                        sliderStages3.major,
                        altitudeValues3
                      ) * 100;
                    var majorVal;
                    var extendedVal;
                  }

                  $(".fts3 .sliderWhiteSpace").css("width", whiteVal + "%");
                  $(".fts3 .sliderActionLevel").css("width", actionVal + "%");
                  $(".fts3 .sliderMinorLevel").css("width", minorVal + "%");
                  $(".fts3 .sliderModerateLevel").css(
                    "width",
                    moderateVal + "%"
                  );

                  // If "Top Curve" / Extended exists
                  if (sliderStages3.top_curve != null && pcodeAbbr == "gh") {
                    // Check if Extended starts at top of slider
                    // if so, don't show it
                    if (
                      sliderStages3.top_curve ==
                      gageValues3[gageValues3.length - 1].gageValue
                    ) {
                      $(".fts3 .sliderMajorLevel").css("width", "100%");
                      $(".fts3 .sliderExtendedLevel").css("width", "0%");
                    } else {
                      // Show extended rating
                      majorVal =
                        heightFractionGet(
                          0,
                          sliderStages3.top_curve,
                          gageValues
                        ) * 100;
                      $(".fts3 .sliderMajorLevel").css("width", majorVal + "%");
                      $(".fts3 .sliderExtendedLevel").css("width", "100%");
                    }
                  } else {
                    $(".fts3 .sliderMajorLevel").css("width", "100%");
                    $(".fts3 .sliderExtendedLevel").css("width", "0%");
                  }

                  // Hide all levels if all equal zero
                  if (
                    sliderStages3.action == 0 &&
                    sliderStages3.flood == 0 &&
                    sliderStages3.moderate == 0 &&
                    sliderStages3.major == 0
                  ) {
                    $(".fts3 .slider-levels").css("opacity", "0.07");
                  } else {
                    $(".fts3 .slider-levels").css("opacity", "1");
                  }
                }

                // ===============================================================
                // ===============================================================
                // Hydrographs
                // Hydrographs
                // Hydrographs
                // ===============================================================
                // ===============================================================

                // Hide all charts to start
                $("#hydroChart").hide();
                $("#hydroChart2").hide();
                $("#hydroChart3").hide();
                $(".no-hydro").show();

                var getChartOptions = function (
                  siteNo,
                  finalNWISDataArray,
                  finalNWSDataArray,
                  sliderMax1,
                  floodStageBands,
                  slider
                ) {
                  var opts = new Object();

                  //Calculate the minimum value for y-axis to find negative values. Use 0 if no negative values
                  var yMin = 0;
                  var lowestVal;

                  var graph_title = "";
                  // Get community for hydrograph label
                  $.each(
                    map.getLayer("fimSites").graphics,
                    function (index, value) {
                      if (siteNo === value.attributes.SITE_NO) {
                        graph_title =
                          value.attributes.STATE +
                          ": " +
                          value.attributes.COMMUNITY +
                          " (" +
                          siteNo +
                          ")";
                      }
                    }
                  );

                  $.each(finalNWISDataArray, function (key, value) {
                    //Code to determine yMin value if under zero
                    if (value[1] < 0 && value[1] < yMin) {
                      yMin = value[1];
                    }
                    //Code to determine smallest value on the hydrograph
                    if (key == 0) {
                      lowestVal = value[1];
                    } else if (value[1] < lowestVal) {
                      lowestVal = value[1];
                    }
                  });

                  $.each(finalNWSDataArray, function (key, value) {
                    if (value[1] < 0 && value[1] < yMin) {
                      yMin = value[1];
                    }
                    if (key == 0 && value[1] < lowestVal) {
                      lowestVal = value[1];
                    } else if (value[1] < lowestVal) {
                      lowestVal = value[1];
                    }
                  });

                  if (lowestVal > 10) {
                    yMin = lowestVal - (lowestVal % 10);
                  }

                  opts.chart = {
                    type: "line",
                    height: highChartHeight,
                    // width: highChartWidth,
                    events: {
                      load: function () {
                        this.credits.element.onclick = function () {
                          window.open("http://www.highcharts.com", "_blank");
                        };
                      },
                    },
                  };

                  opts.responsive = {
                    rules: [
                      {
                        condition: {
                          maxWidth: highChartWidth,
                        },
                      },
                    ],
                  };

                  opts.title = {
                    text: graph_title,
                  };
                  opts.plotOptions = {
                    series: {
                      cursor: "pointer",
                      events: {
                        click: function (event) {
                          snapToFlood(event.point.y, slider);
                        },
                      },
                    },
                  };
                  opts.series = [
                    {
                      data: finalNWISDataArray,
                      name: "NWIS Observed",
                      color: "black",
                      marker: {
                        enabled: false,
                      },
                    },
                    {
                      data: finalNWSDataArray,
                      name: "NWS Predicted",
                      color: "black",
                      marker: {
                        enabled: true,
                        symbol: "circle",
                        fillColor: "white",
                        lineColor: "black",
                        lineWidth: 1.25,
                      },
                    },
                  ];
                  opts.xAxis = {
                    type: "datetime",
                    tickInterval: 24 * 3600 * 1000,
                  };
                  (opts.yAxis = {
                    min: yMin,
                    max: sliderMax1,
                    endOnTick: false,
                    resize: {
                      enabled: true,
                    },
                    labels: {
                      format: "{value} ft",
                    },
                    title: {
                      text: hydroChartYAxisLabel,
                    },
                    plotBands: floodStageBands,
                  }),
                    (opts.tooltip = {
                      formatter: function () {
                        var date = new Date(this.x);
                        var dayOfWeek = getDay(date);
                        var month = getMonth(date);
                        var dayOfMonth = date.getDate();
                        var hours = date.getHours().toString();
                        var minutes = date.getMinutes().toString();
                        if (hours.length == 1) {
                          hours = "0" + hours;
                        }
                        if (minutes.length == 1) {
                          minutes = "0" + minutes;
                        }
                        return (
                          dayOfWeek +
                          ", " +
                          month +
                          " " +
                          dayOfMonth +
                          ", " +
                          hours +
                          ":" +
                          minutes +
                          "" +
                          this.series.name +
                          ": <b>" +
                          this.y +
                          " ft</b>"
                        );
                      },
                    });

                  // Return options
                  return opts;
                };

                // ===============================================================
                // ===============================================================
                // Create Hydrograph
                // Create Hydrograph
                // Create Hydrograph
                // ===============================================================
                // ===============================================================
                if (
                  finalNWISDataArray.length > 0 ||
                  finalNWSDataArray.length > 0
                ) {
                  $("#hydroChart").show();
                  // Get options
                  var chartOneOptions = getChartOptions(
                    siteNo,
                    finalNWISDataArray,
                    finalNWSDataArray,
                    sliderMax1,
                    floodStageBands,
                    ".first-slider"
                  );

                  // Cerate Chart
                  var hydroChart = new Highcharts.Chart(
                    "hydroChart",
                    chartOneOptions,
                    function (hydroChart) {
                      console.log("Chart One Loaded");
                      if (floodStageBands[5]) {
                        var chartYMax = parseInt(floodStageBands[5].to);
                      } else {
                        var chartYMax = parseInt(floodStageBands[4].to);
                      }
                      hydroChart.yAxis[0].setExtremes(null, chartYMax);
                    }
                  );
                  // Hide if Hydrograph unavailable
                  $(".no-hydro").hide();
                }

                // Multisite Two
                if (siteData2 != undefined || finalNWSDataArray2.length > 0) {
                  $("#hydroChart2").show();
                  // Get options
                  var chartTwoOptions = getChartOptions(
                    siteNo_2,
                    finalNWISDataArray2,
                    finalNWSDataArray2,
                    sliderMax2,
                    floodStageBands2,
                    ".second-slider"
                  );
                  // Create Chart
                  var hydroChart2 = new Highcharts.Chart(
                    "hydroChart2",
                    chartTwoOptions,
                    function (hydroChart2) {
                      console.log("Chart Two Loaded");
                      if (floodStageBands2[5]) {
                        var chartYMax = parseInt(floodStageBands2[5].to);
                      } else {
                        var chartYMax = parseInt(floodStageBands2[4].to);
                      }
                      hydroChart2.yAxis[0].setExtremes(null, chartYMax);
                    }
                  );
                  $(".no-hydro").hide();
                }

                // Multisite Three
                if (siteData3 != undefined || finalNWSDataArray3.length > 0) {
                  $("#hydroChart3").show();
                  // Get options
                  var chartThreeOptions = getChartOptions(
                    siteNo_3,
                    finalNWISDataArray3,
                    finalNWSDataArray3,
                    sliderMax3,
                    floodStageBands3,
                    ".third-slider"
                  );
                  // Create Chart
                  var hydroChart3 = new Highcharts.Chart(
                    "hydroChart3",
                    chartThreeOptions,
                    function (hydroChart3) {
                      console.log("Chart Three Loaded");
                      if (floodStageBands3[5]) {
                        var chartYMax = parseInt(floodStageBands3[5].to);
                      } else {
                        var chartYMax = parseInt(floodStageBands3[4].to);
                      }
                      hydroChart3.yAxis[0].setExtremes(null, chartYMax);
                    }
                  );
                  $(".no-hydro").hide();
                }

                // ===============================================================
                // ===============================================================
                // Done Loading
                // Done Loading
                // Done Loading
                // ===============================================================
                // ===============================================================

                // Set Default Tab
                // Default to More info tab, then Hydro,
                // If unavailable, default to main
                if ($(".ft-more-info-tab").is(":visible")) {
                  $(".ft-more-info-tab").click();
                } else if ($(".ft-hydro-tab").hasClass("nws-data-hidden")) {
                  // If hydro unavailable, open main
                  $(".ft-main-tab").click();
                } else {
                  // Else default to hydro if available
                  $(".ft-hydro-tab").click();
                }

                $("#floodToolsDiv .panel-heading").removeClass("loading-hide");
                $("#floodToolsDiv .panel-body").removeClass("loading-hide");
                $("#floodToolsDiv").removeClass("loading-background");
                $("#printExecuteButton").prop("disabled", false);
                $(".printWarning").hide();

                snapToFlood();
              })
              .fail(function () {
                //alert('there was an issue');
                floodToolsError();
              });
          }
        }
      };

      map.getLayer("fimSites").on("click", siteClick);
    } else if (
      layer == "fimGrid1" ||
      layer == "fimGrid2" ||
      layer == "fimGrid3" ||
      layer == "fimGrid4"
    ) {
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
        case "fimGrid4":
          grid4Infos = map.getLayer(layer).layerInfos;
          break;
      }
    } else if (layer == "noflood") {
      var ahpsQueryCount = new esriQuery();
      ahpsQueryCount.where =
        "Status = 'normal' OR Status = 'no_flooding' OR Status = 'minor' OR Status = 'moderate' OR Status = 'major' OR Status = 'old' OR Status = 'action'";
      ahpsQueryCount.outFields = ["status"];
      ahpsQueryCount.returnGeometry = false;
      var ahpsQueryTask = new QueryTask(map.getLayer("ahpsSites").url + "/1");
      ahpsQueryTask.execute(ahpsQueryCount, ahpsCountResult, queryFault);
    }

    function sliderSetup(results) {
      if (siteAttr["MULTI_SITE"] == 0) {
        $.each(results, function (index, value) {
          var i;
          var flag = false;

          for (i = 0; i < gageValues.length; i++) {
            if (
              gageValues[i]["gageValue"] == value.attributes.STAGE.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues.push({ gageValue: value.attributes.STAGE.toFixed(2) });
          }

          flag = false;

          for (i = 0; i < altitudeValues.length; i++) {
            if (
              altitudeValues[i]["altitudeValue"] ==
              value.attributes.ELEV.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues.push({
              altitudeValue: value.attributes.ELEV.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < dischargeValues.length; i++) {
            if (dischargeValues[i]["dischargeValue"] == value.attributes.QCFS) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues.push({ dischargeValue: value.attributes.QCFS });
          }
        });

        gageValues.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );

        altitudeValues.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );

        dischargeValues.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );
      } else if (siteAttr["MULTI_SITE"] == 1) {
        $.each(results, function (index, value) {
          //var graphicID = siteNo + floodGraphic.attributes.STAGE_1.toFixed(2) + floodGraphic.attributes.STAGE_2.toFixed(2) + floodGraphic.attributes.GRIDID;
          gagePairs.push({
            STAGE_1: value.attributes.STAGE_1.toFixed(2),
            STAGE_2: value.attributes.STAGE_2.toFixed(2),
            GRIDID: value.attributes.GRIDID,
          });

          var i;
          var flag = false;

          for (i = 0; i < gageValues.length; i++) {
            if (
              gageValues[i]["gageValue"] == value.attributes.STAGE_1.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues.push({ gageValue: value.attributes.STAGE_1.toFixed(2) });
          }

          flag = false;

          for (i = 0; i < altitudeValues.length; i++) {
            if (
              altitudeValues[i]["altitudeValue"] ==
              value.attributes.ELEV_1.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues.push({
              altitudeValue: value.attributes.ELEV_1.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < dischargeValues.length; i++) {
            if (
              dischargeValues[i]["dischargeValue"] == value.attributes.QCFS_1
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues.push({ dischargeValue: value.attributes.QCFS_1 });
          }

          flag = false;

          for (i = 0; i < gageValues2.length; i++) {
            if (
              gageValues2[i]["gageValue"] == value.attributes.STAGE_2.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues2.push({
              gageValue: value.attributes.STAGE_2.toFixed(2),
            });
          }
          flag = false;

          for (i = 0; i < altitudeValues2.length; i++) {
            if (
              altitudeValues2[i]["altitudeValue"] ==
              value.attributes.ELEV_2.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues2.push({
              altitudeValue: value.attributes.ELEV_2.toFixed(2),
            });
          }
          flag = false;

          for (i = 0; i < dischargeValues2.length; i++) {
            if (
              dischargeValues2[i]["dischargeValue"] == value.attributes.QCFS_2
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues2.push({ dischargeValue: value.attributes.QCFS_2 });
          }
        });

        gageValues.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );
        gageValues2.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );

        altitudeValues.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );
        altitudeValues2.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );

        dischargeValues.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );
        dischargeValues2.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );

        console.log("stopping point");
      } else if (siteAttr["MULTI_SITE"] == 3) {
        $.each(results, function (index, value) {
          //var graphicID = siteNo + floodGraphic.attributes.STAGE_1.toFixed(2) + floodGraphic.attributes.STAGE_2.toFixed(2) + floodGraphic.attributes.GRIDID;
          gagePairs.push({
            STAGE_1: value.attributes.STAGE_1.toFixed(2),
            STAGE_2: value.attributes.STAGE_2.toFixed(2),
            STAGE_3: value.attributes.STAGE_3.toFixed(2),
            GRIDID: value.attributes.GRIDID,
          });

          var i;
          var flag = false;

          for (i = 0; i < gageValues.length; i++) {
            if (
              gageValues[i]["gageValue"] == value.attributes.STAGE_1.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues.push({ gageValue: value.attributes.STAGE_1.toFixed(2) });
          }

          flag = false;

          for (i = 0; i < altitudeValues.length; i++) {
            if (
              altitudeValues[i]["altitudeValue"] ==
              value.attributes.ELEV_1.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues.push({
              altitudeValue: value.attributes.ELEV_1.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < dischargeValues.length; i++) {
            if (
              dischargeValues[i]["dischargeValue"] == value.attributes.QCFS_1
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues.push({ dischargeValue: value.attributes.QCFS_1 });
          }

          flag = false;

          for (i = 0; i < gageValues2.length; i++) {
            if (
              gageValues2[i]["gageValue"] == value.attributes.STAGE_2.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues2.push({
              gageValue: value.attributes.STAGE_2.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < altitudeValues2.length; i++) {
            if (
              altitudeValues2[i]["altitudeValue"] ==
              value.attributes.ELEV_2.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues2.push({
              altitudeValue: value.attributes.ELEV_2.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < dischargeValues2.length; i++) {
            if (
              dischargeValues2[i]["dischargeValue"] == value.attributes.QCFS_2
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues2.push({ dischargeValue: value.attributes.QCFS_2 });
          }

          flag = false;

          for (i = 0; i < gageValues3.length; i++) {
            if (
              gageValues3[i]["gageValue"] == value.attributes.STAGE_3.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            gageValues3.push({
              gageValue: value.attributes.STAGE_3.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < altitudeValues3.length; i++) {
            if (
              altitudeValues3[i]["altitudeValue"] ==
              value.attributes.ELEV_3.toFixed(2)
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            altitudeValues3.push({
              altitudeValue: value.attributes.ELEV_3.toFixed(2),
            });
          }

          flag = false;

          for (i = 0; i < dischargeValues3.length; i++) {
            if (
              dischargeValues3[i]["dischargeValue"] == value.attributes.QCFS_3
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            dischargeValues3.push({ dischargeValue: value.attributes.QCFS_3 });
          }
        });

        gageValues.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );
        gageValues2.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );
        gageValues3.sort((a, b) =>
          Number(a.gageValue) > Number(b.gageValue)
            ? 1
            : Number(b.gageValue) > Number(a.gageValue)
            ? -1
            : 0
        );

        altitudeValues.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );
        altitudeValues2.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );
        altitudeValues2.sort((a, b) =>
          Number(a.altitudeValue) > Number(b.altitudeValue)
            ? 1
            : Number(b.altitudeValue) > Number(a.altitudeValue)
            ? -1
            : 0
        );

        dischargeValues.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );
        dischargeValues2.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );
        dischargeValues3.sort((a, b) =>
          Number(a.dischargeValue) > Number(b.dischargeValue)
            ? 1
            : Number(b.dischargeValue) > Number(a.dischargeValue)
            ? -1
            : 0
        );
      }
    }

    function ahpsCountResult(featureSet) {
      console.log(featureSet.features.length);
      var i;
      for (i = 0; i < featureSet.features.length - 1; i++) {
        if (featureSet.features[i].attributes.status == "major") {
          if (majorCount == undefined) {
            majorCount = 0;
          }
          majorCount += 1;
        } else if (featureSet.features[i].attributes.status == "moderate") {
          if (moderateCount == undefined) {
            moderateCount = 0;
          }
          moderateCount += 1;
        } else if (featureSet.features[i].attributes.status == "minor") {
          if (minorCount == undefined) {
            minorCount = 0;
          }
          minorCount += 1;
        } else if (featureSet.features[i].attributes.status == "action") {
          if (actionCount == undefined) {
            actionCount = 0;
          }
          actionCount += 1;
        } else if (featureSet.features[i].attributes.status == "no_flooding") {
          if (nofloodCount == undefined) {
            nofloodCount = 0;
          }
          nofloodCount += 1;
        }
      }

      //var text = 'test';
      var majorText = "Major flooding (" + majorCount + ")";
      var moderateText = "Moderate flooding (" + moderateCount + ")";
      var minorText = "Minor flooding (" + minorCount + ")";
      var actionText = "Action flooding (" + actionCount + ")";
      var nofloodText = "No flooding (" + nofloodCount + ")";

      $("#majorFloodingLabel")[0].textContent = majorText;
      $("#moderateFloodingLabel")[0].textContent = moderateText;
      $("#minorFloodingLabel")[0].textContent = minorText;
      $("#nearFloodLabel")[0].textContent = actionText;
      $("#noFloodingLabel")[0].textContent = nofloodText;
    } //

    function queryFault(evt) {
      console.log("error: " + evt);
    }
  });

  function snapToFlood(stage = null, slider = null) {
    if (gageValues != null) {
      var checkLength;
      var stageValues = [];
      var slidersToAdjust = [];
      var gageValuesToCheck;
      var stage1;
      var stage2;
      var stage3;

      if (stage == null) {
        stage1 = Number($(".fts1 #floodGage")[0].textContent);
        stage2 = Number($(".fts2 #floodGage")[0].textContent);
        stage3 = Number($(".fts3 #floodGage")[0].textContent);

        stageValues = [stage1, stage2, stage3];
        slidersToAdjust = [
          $(".first-slider"),
          $(".second-slider"),
          $(".third-slider"),
        ];
        if (pcodeAbbr == "gh") {
          gageValuesToCheck = [gageValues, gageValues2, gageValues3];
        } else {
          gageValuesToCheck = [
            altitudeValues,
            altitudeValues2,
            altitudeValues3,
          ];
        }

        switch (siteAttr.MULTI_SITE) {
          case 0:
            checkLength = 1;
            break;
          case 1:
            checkLength = 2;
            break;
          case 2:
            checkLength = 3;
            break;
          case 3:
            checkLength = 3;
            break;
        }
      } else {
        checkLength = 1;
        stageValues = [stage];
        slidersToAdjust = [$(slider)];
        if (pcodeAbbr == "gh") {
          if (slider == ".first-slider") {
            gageValuesToCheck = [gageValues];
          } else if (slider == ".second-slider") {
            gageValuesToCheck = [gageValues2];
          } else if (slider == ".third-slider") {
            gageValuesToCheck = [gageValues3];
          }
        } else {
          if (slider == ".first-slider") {
            gageValuesToCheck = [altitudeValues];
          } else if (slider == ".second-slider") {
            gageValuesToCheck = [altitudeValues2];
          } else if (slider == ".third-slider") {
            gageValuesToCheck = [altitudeValues3];
          }
        }
      }

      for (var ind = 0; ind < checkLength; ind++) {
        var closestNum;
        var closestArrayItem;
        var tempNum;

        for (var i = 0; i < gageValuesToCheck[ind].length; i++) {
          tempNum = Math.abs(
            gageValuesToCheck[ind][i]["gageValue"] - stageValues[ind]
          );

          if (i == 0 || tempNum < closestNum) {
            closestNum = tempNum;
            closestArrayItem = i;
          }
        }
        slidersToAdjust[ind].val(closestArrayItem);
        slidersToAdjust[ind].trigger("input");
      }
    }
  }

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
      case 4:
        gridServ = grid4Infos;
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
        var tempGridInfo = gridServ[i].name.split("_");
        shortName = tempGridInfo[0];
        gridID = tempGridInfo[1];
        id = gridServ[i].id;
        if (shortName == siteAttr.SHORT_NAME) {
          /*var tempName:String = fimi_grids.layerInfos[i].name;
                     var tempGage:String = tempGridInfo[1] + '.' + tempGridInfo[2];
                     var tempGageNumber:Number = parseFloat(tempGage);
                     gridInfos.addItem({index: id, name: tempName, gage: tempGageNumber.toFixed(2)});*/
          gridInfos.push({ index: id, shortname: shortName, gridid: gridID });
          console.log("gridInfos", gridInfos);
        }
      }
    }
  }

  map.on("click", function (evt) {
    //$("[id*='fimExtents'] .esriLegendLayerLabel").hide();
    var identifyParameters = new IdentifyParameters();
    if (
      siteAttr != null &&
      siteAttr.HAS_GRIDS == 1 &&
      (map.getLayer("fimExtents").visible == true ||
        map.getLayer("fimGrid" + siteAttr.GRID_SERV).visible == true ||
        map.getLayer("fimExtentsMulti").visible == true ||
        map.getLayer("fimGrid" + siteAttr.GRID_SERV).visible == true ||
        map.getLayer("fimExtentsThreeSites").visible == true ||
        map.getLayer("fimGrid" + siteAttr.GRID_SERV).visible == true) &&
      evt.target.localName != "image"
    ) {
      //come back to this to deal with grid clicks

      //getGridLayerIndex();
      var grid_serv = siteAttr.GRID_SERV;
      identifyParameters.layerIds = [];
      /*gridLayerIndexArrColl = [];

            for (var i=0; i < gridInfos.length; i++) {
                if (gridInfos[i].shortname == siteAttr.SHORT_NAME && Number(gridInfos[i].gridid) == results[$(".fts1 #floodSlider")[0].value].attributes["GRIDID"]) {
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                } else if (gridInfos[i].shortname == siteAttr.SHORT_NAME && gridInfos[i].gridid == results[$(".fts1 #floodSlider")[0].value].attributes["GRIDID"]+'b') {
                    identifyParameters.layerIds.push([gridInfos[i].index]);
                    gridLayerIndexArrColl.push(gridInfos[i].index);
                    gridLayerIndex = gridInfos[i].index;
                }
            }*/

      identifyParameters.layerIds = gridLayerIndexArrColl;
      identifyParameters.layerOption = "visible";
      identifyParameters.width = map.width;
      identifyParameters.height = map.height;
      identifyParameters.geometry = evt.mapPoint;
      identifyParameters.tolerance = 1;
      identifyParameters.mapExtent = map.extent;
      identifyParameters.spatialReference = map.spatialReference;

      var identifyTask = new IdentifyTask(
        "https://fimnew.wim.usgs.gov/server/rest/services/FIMMapper/grids_" +
          grid_serv +
          "/MapServer"
      );
      identifyTask.showBusyCursor = true;

      var deferredResult = identifyTask.execute(identifyParameters);

      deferredResult.addCallback(function (response) {
        //map.infoWindow.hide();
        for (var i = 0; i < response.length; i++) {
          if (response[i].feature.attributes["Pixel Value"] != "NoData") {
            var depthRange = siteAttr.DEPTH_RANG;
            if (depthRange == null) {
              depthRange = 1;
            }

            var factor = (Number(depthRange) / 2) % 0.5;
            if (factor == 0) {
              //second half of OR only to handle libraries without depth range even though it is a required field
              factor = 0.5;
            }

            var gridAttr = response[i].feature.attributes["Pixel Value"];
            var rndGridValue = roundToNearest(factor, gridAttr);

            var lowValue = rndGridValue - Number(depthRange) / 2;
            var highValue = rndGridValue + Number(depthRange) / 2;

            //code to adjust value so range falls on .0s and .5s
            var roundingRemainder =
              (rndGridValue + Number(depthRange) / 2) % 0.5;
            if (roundingRemainder != 0) {
              var diff = rndGridValue - gridAttr;
              if (diff > 0) {
                lowValue = Number(
                  (rndGridValue - Number(depthRange) / 2 - factor).toFixed(1)
                );
                highValue = Number(
                  (rndGridValue + Number(depthRange) / 2 - factor).toFixed(1)
                );
              } else {
                lowValue = Number(
                  (rndGridValue - Number(depthRange) / 2 + factor).toFixed(1)
                );
                highValue = Number(
                  (rndGridValue + Number(depthRange) / 2 + factor).toFixed(1)
                );
              }
            }

            //check for negative values of lowValue
            if (lowValue < 0) {
              lowValue = 0;
            }

            //using depth range value in site file
            var range = lowValue.toString() + " - " + highValue.toString();

            var template;
            if (siteAttr.REP_LINK != "NONE") {
              template = new esri.InfoTemplate(
                "Water depth <a alt='Water depth is the elevation difference between the modeled water surface and the measured land surface. A range is shown to reflect the accuracy of the modeling and measurements. Depth ranges in the channel area may reflect a higher level of inaccuracy due to challenges in estimating channel depths. Please the full report for more information (found in Services & Data).' title='Water depth is the elevation difference between the modeled water surface and the measured land surface. A range is shown to reflect the accuracy of the modeling and measurements. Depth ranges in the channel area may reflect a higher level of inaccuracy due to challenges in estimating channel depths. Please the full report for more information (found in Services & Data).'><i style='color: white; opacity: 0.8;' class='fa fa-question-circle'></a>",
                "<b>Range:</b> " + range + " ft"
              );
            } else {
              template = new esri.InfoTemplate(
                "Water depth",
                "<b>Range:</b> " + range + " ft"
              );
            }

            var feature = response[i].feature;
            feature.setInfoTemplate(template);

            map.infoWindow.setFeatures([feature]);
            map.infoWindow.resize(175, 125);
            map.infoWindow.show(evt.mapPoint);
          }
        }
      });
    }
  });

  function roundToNearest(roundTo, value) {
    return Math.round(value / roundTo) * roundTo;
  }

  function getNwsForecastIndex(obj) {
    var index;
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].nodeName == "forecast") {
        index = i;
      }
      if (i == obj.length - 1 && obj[i].nodeName != "forecast") {
        index = null;
      }
    }
    return index;
  }

  function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    return today;
  }

  function dateInRange(valDate, startDate) {
    var inRange = false;

    var valDateSub = valDate.substring(0, 10);

    var valDateSubSplit = valDateSub.split("-");
    var startDateSplit = startDate.split("-");

    var val = new Date(
      valDateSubSplit[0],
      valDateSubSplit[1] - 1,
      valDateSubSplit[2]
    ); //Year, Month, Date
    var start = new Date(
      startDateSplit[0],
      startDateSplit[1] - 1,
      startDateSplit[2]
    );

    if (val >= start) {
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

  function dateFix(date, series) {
    var outDate;

    var dateSplit = date.split("T");
    var YMD = dateSplit[0].split("-");
    if (series == "nwis") {
      var HMS = dateSplit[1].split(".")[0].split(":");
    } else if (series == "nws") {
      var HMS = dateSplit[1].split("-")[0].split(":");
    }

    var year = Number(YMD[0]);
    var month = Number(YMD[1]) - 1;
    var day = Number(YMD[2]);
    var hour = Number(HMS[0]);
    var minute = Number(HMS[1]);
    var second = Number(HMS[2]);

    outDate = Date.UTC(year, month, day, hour, minute, second);

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
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }
    return month;
  }

  // create search_api widget in element "geosearch"
  search_api.create("geosearch", {
    on_result: function (o) {
      // what to do when a location is found
      // o.result is geojson point feature of location with properties

      // zoom to location
      require(["esri/geometry/Extent"], function (Extent) {
        var noExtents = ["GNIS_MAJOR", "GNIS_MINOR", "ZIPCODE", "AREACODE"];
        var noExtentCheck = noExtents.indexOf(o.result.properties["Source"]);
        if (noExtentCheck == -1) {
          map.setExtent(
            new esri.geometry.Extent({
              xmin: o.result.properties.LonMin,
              ymin: o.result.properties.LatMin,
              xmax: o.result.properties.LonMax,
              ymax: o.result.properties.LatMax,
              spatialReference: { wkid: 4326 },
            }),
            true
          );
        } else {
          //map.setCenter();
          require(["esri/geometry/Point"], function (Point) {
            map.centerAndZoom(
              new Point(o.result.properties.Lon, o.result.properties.Lat),
              12
            );
            $("#geosearchModal").modal("hide");
          });
        }
      });
    },
    include_usgs_sw: true,
    include_usgs_gw: true,
    include_usgs_sp: true,
    include_usgs_at: true,
    include_usgs_ot: true,
    include_huc2: true,
    include_huc4: true,
    include_huc6: true,
    include_huc8: true,
    include_huc10: true,
    include_huc12: true,
  });

  // Printing
  // Printing
  // Printing

  var printerations = 0;
  var page1name = "";
  var page2name = "";

  function printMap() {
    //create some kind of config object to print jobs. maybe can use job number to identify site number used for intial print

    //var page1InfoUrl = 'https://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/FIMpage1design/MapServer/1/query?where=USGSID+LIKE+%27%25' + siteNo + '%25%27&outFields=*&returnGeometry=true&f=json';
    var page1InfoUrl =
      "https://fimnew.wim.usgs.gov/fim-page-one?siteno=" + siteNo;

    $.ajax({
      dataType: "json",
      type: "GET",
      url: page1InfoUrl,
      headers: { Accept: "*/*" },
      success: function (data) {
        var siteNo_print = siteNo;
        var siteNo_2_print = siteNo_2;
        var siteNo_3_print = siteNo_3;

        var site_no_for_print = siteAttr["SITE_NO"];

        var no_page_one;

        var printAttr;

        var userTitle = $("#printTitle").val();

        //if (data.features.length > 0) {
        if (data.hassite == true) {
          //printAttr = data.features[0].attributes;
          printAttr = data;

          var printParams = new PrintParameters();
          printParams.map = map;

          var template = new PrintTemplate();
          template.format = "PDF";
          template.layout = "FIMpage1design";

          template.preserveScale = false;

          var series_num;
          if (siteAttr.SERIES_NUM.match("-") != null) {
            var seriesNumArray = siteAttr.SERIES_NUM.split("-");
            series_num = seriesNumArray[0] + "-" + seriesNumArray[1];
          } else {
            series_num = siteAttr.SERIES_NUM;
          }

          var titleText;
          if (userTitle != "") {
            titleText = userTitle;
          }

          function textMarkUp(text) {
            var rawText = text;

            var textWithMarkUp = rawText.replace("mi2", "mi<sup>2</sup>");

            return textWithMarkUp;
          }

          template.layoutOptions = {
            titleText: titleText,
            authorText: "Flood Inundation Mapping",
            copyrightText: "This page was produced by the FIM and the WIM",
            customTextElements: [
              { mapTitle: printAttr.TITLE },
              { mapSeries: printAttr.REP_SER_NUM },
              {
                uncertainty:
                  "Although the flood-inundation maps represent the " +
                  "boundaries of inundated areas with a distinct line, " +
                  "some uncertainty is associated with these maps. The " +
                  "flood boundaries shown were estimated based on gage " +
                  "heights at selected USGS streamgages. Water-surface " +
                  "elevations along the stream reaches were estimated by " +
                  "steady-state hydraulic modeling, assuming unobstructed " +
                  "flow and using discharges and hydrologic conditions " +
                  "anticipated at the USGS streamgage(s). The hydraulic " +
                  "model reflects the land-cover characteristics of any " +
                  "bridge, dam, levee, or other hydraulic structure existing " +
                  "in " +
                  printAttr.PUB_DATE +
                  ". Unique meteorological factors " +
                  "(timing and distribution of precipitation) may cause " +
                  "actual discharges along the modeled reach to vary from " +
                  "assumed conditions during a flood and lead to deviations " +
                  "in the water-surface elevations and inundation boundaries " +
                  "shown. Additional areas may be flooded due to " +
                  "unanticipated backwater from major tributaries along " +
                  "the main stem or from localized debris or ice jams.",
              },
              { studyArea: textMarkUp(printAttr.STUDY_AREA) },
              { purpose: textMarkUp(printAttr.PURPOSE_SCOPE) },
              {
                mapSources:
                  'Detailed source data for this map series can be found in "' +
                  printAttr.TITLE +
                  " (" +
                  printAttr.PUB_DATE +
                  ')" at: ' +
                  printAttr.URL,
              },
              {
                suggestedCitation:
                  siteAttr.AUTHORS +
                  ", " +
                  siteAttr.REP_DATE +
                  ", " +
                  siteAttr.TITLE +
                  ": " +
                  siteAttr.REP_SERIES +
                  " " +
                  series_num +
                  ", " +
                  siteAttr.ADD_INFO,
              },
              { hydroData: textMarkUp(printAttr.HYDRO_STEADY) },
              { hydraulicModel: textMarkUp(printAttr.MODEL_CALIB) },
              { surfaceProfile: textMarkUp(printAttr.WATER_PROFILE) },
              { floodMaps: textMarkUp(printAttr.PROD_ACC) },
            ],
            legendLayers: null, //[sitesLegendLayer]
          };

          var docTitle = template.layoutOptions.titleText;
          printParams.template = template;
          var printMap = new PrintTask(
            "https://fimnew.wim.usgs.gov/server/rest/services/FIMPrint/ExportWebMap/GPServer/Export%20Web%20Map"
          );

          if (page1name == "") {
            printMap.execute(
              printParams,
              printPage1Done,
              printPage1Error,
              "page1"
            );
            console.log("executed page 1");
          }

          function printPage1Done(event) {
            console.log("page 1 done");

            page1name = event.url.split("gpserver/")[1];
            console.log("page 1: " + page1name);

            if (page2name != null && page2name != "") {
              pdfMerge();
              printerations = 0;
            }
          }

          function printPage1Error(event) {
            console.log("page 1 error");
            $("#printExecuteButton").button("reset");
            alert(
              "Sorry, an unclear print error occurred. Try refreshing the application to fix the problem"
            );
          }
        } else {
          no_page_one = true;
        }

        var page2PrintParams = new PrintParameters();
        page2PrintParams.map = map;

        var template = new PrintTemplate();
        /*template.exportOptions = {
                    width: 500,
                    height: 400,
                    dpi: 300
                };*/
        template.format = "PDF";
        template.layout = "FIMpage2design";

        if (map.getScale() < 18000) {
          template.layout = "FIMpage2design";
        } else if (map.getScale() >= 18000 && map.getScale() < 36000) {
          template.layout = "FIMpage2design_18k";
        } else if (map.getScale() >= 36000 && map.getScale() < 72000) {
          template.layout = "FIMpage2design_36k";
        } else if (map.getScale() >= 72000 && map.getScale() < 288000) {
          template.layout = "FIMpage2design_72k";
        } else if (map.getScale() >= 288000) {
          template.layout = "FIMpage2design_288k";
        }

        template.preserveScale = false;

        var siteDefExp = "";

        if (siteAttr.MULTI_SITE == "0") {
          siteDefExp = "SITE_NO = '" + siteNo_print + "'";
          //siteToGage = "Map corresponding to a Gage Height of " + currentStage + " feet and an Elevation of " + currentElev + " feet (NAVD 88)";
        }

        //check for sites without site datum info

        if (siteDatumInfo[1] == "" && siteAttr.PCODE == "62614") {
          siteDatumInfo[1] = "NGVD29";
        }

        var page2MapTitle = "";
        var page2MapSubtitle = "";
        if (siteAttr.MULTI_SITE == 0) {
          page2MapTitle =
            "Flood-Inundation Map for " +
            siteAttr.COMMUNITY +
            ", " +
            siteAttr.STATE;
          /*+ "\n<FNT size='8'>Map corresponding to a Gage Height of " + 
                        gageValues[$(".fts1 #floodSlider")[0].value].gageValue + " feet and an Elevation of " + 
                        altitudeValues[$(".fts1 #floodSlider")[0].value].altitudeValue + " feet (" + siteDatumInfo[1] + ")</FNT>";*/
          page2MapSubtitle =
            "Map corresponding to a Gage Height of " +
            gageValues[$(".fts1 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues[$(".fts1 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_print;
        } else if (siteAttr.MULTI_SITE == 1) {
          page2MapTitle =
            "Flood-Inundation Map for multiple streamgages around " +
            siteAttr.COMMUNITY +
            ", " +
            siteAttr.STATE;
          page2MapSubtitle =
            "Map corresponding to a Gage Height of " +
            gageValues[$(".fts1 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues[$(".fts1 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_print +
            "and " +
            gageValues2[$(".fts2 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues2[$(".fts2 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_2_print;
        } else if (siteAttr.MULTI_SITE == 2 || siteAttr.MULTI_SITE == 3) {
          page2MapTitle =
            "Flood-Inundation Map for multiple streamgages around " +
            siteAttr.COMMUNITY +
            ", " +
            siteAttr.STATE;
          page2MapSubtitle =
            "Map corresponding to a Gage Height of " +
            gageValues[$(".fts1 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues[$(".fts1 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_print +
            " and " +
            gageValues2[$(".fts2 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues2[$(".fts2 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_2_print +
            " and " +
            gageValues3[$(".fts3 #floodSlider")[0].value].gageValue +
            " feet and an Elevation of " +
            altitudeValues3[$(".fts3 #floodSlider")[0].value].altitudeValue +
            " feet (" +
            siteDatumInfo[1] +
            ") for Streamgage Number " +
            siteNo_3_print;
        }

        template.layoutOptions = {
          titleText: titleText,
          authorText: "Flood Inundation Mapping",
          copyrightText: "This page was produced by the FIM and the WIM",
          customTextElements: [
            { mapTitle: page2MapTitle },
            { mapSubTitle: page2MapSubtitle },
            { mapSeries: printAttr ? printAttr.REP_SER_NUM : "" },
          ],
          legendLayers: null, //[sitesLegendLayer]
        };

        //"legendLayers": [legendLayer]
        var docTitle = template.layoutOptions.titleText;
        page2PrintParams.template = template;
        var printMap = new PrintTask(
          "https://fimnew.wim.usgs.gov/server/rest/services/FIMPrint/ExportWebMap/GPServer/Export%20Web%20Map"
        );

        var layerIDs = map.layerIds;
        var graphicLayerIDs = map.graphicsLayerIds;

        var layersToCheck = layerIDs.concat(graphicLayerIDs);

        var layersToReturn = [];
        for (var i = 0; i < layersToCheck.length - 1; i++) {
          if (map.getLayer(layersToCheck[i]).visible == false) {
            var layer = map.getLayer(layersToCheck[i]);
            map.removeLayer(layersToCheck[i]);
            layersToReturn.push(layer);
            //console.log("removed " + layersToCheck[i]);
          }
        }

        printMap.execute(
          page2PrintParams,
          printPage2Done,
          printPage2Error,
          "page2"
        );
        console.log("executed page 2");

        for (var j = 0; j < layersToReturn.length; j++) {
          map.addLayer(layersToReturn[j]);
          //console.log("added " + layersToReturn[j]);
        }

        function printPage2Done(event) {
          console.log("page 2 done");

          page2name = event.url.split("gpserver/")[1];
          console.log("page 2: " + page2name);

          if (page1name != null && page1name != "") {
            pdfMerge();
            var times = printerations + 1;
            console.log("It took " + times + " attempts(s).");
            printerations = 0;
          } else if (no_page_one == true) {
            var mergedTitle = "Map for site number " + siteNo_print;
            if (siteNo_2_print != undefined) {
              mergedTitle =
                "Map for site numbers " +
                siteNo_print +
                " and " +
                siteNo_2_print;
            }
            if (siteNo_3_print != undefined) {
              mergedTitle =
                "Map for site numbers " +
                siteNo_print +
                ", " +
                siteNo_2_print +
                ", and " +
                siteNo_3_print;
            }
            if (userTitle != "") {
              mergedTitle = userTitle;
            }
            printCount++;
            //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
            var printJob = $(
              "<p><label>" +
                printCount +
                ': </label><a href="' +
                event.url +
                '" target="_blank"> ' +
                mergedTitle +
                " </a></p>"
            );
            //$("#print-form").append(printJob);
            $("#printJobsDiv").find("p.toRemove").remove();
            $("#printModalBody").append(printJob);
            $("#printTitle").val("");
            $("#printExecuteButton").button("reset");
            printerations = 0;
            page1name = "";
            page2name = "";
          }
        }

        function pdfMerge() {
          $.ajax({
            dataType: "json",
            crossDomain: true,
            type: "GET",
            referer: "fimnew.wim.usgs.gov",
            url:
              "https://fimnew.wim.usgs.gov/fim-pdf-merge?page1name=" +
              page1name +
              "&page2name=" +
              page2name,
            headers: { Accept: "*/*" },
            success: function (data) {
              var mergedTitle = "Map for site number " + siteNo_print;
              if (siteNo_2_print != undefined) {
                mergedTitle =
                  "Map for site numbers " +
                  siteNo_print +
                  " and " +
                  siteNo_2_print;
              }
              if (siteNo_3_print != undefined) {
                mergedTitle =
                  "Map for site numbers " +
                  siteNo_print +
                  ", " +
                  siteNo_2_print +
                  ", and " +
                  siteNo_3_print;
              }
              if (userTitle != "") {
                mergedTitle = userTitle;
              }
              printCount++;
              //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
              var printJob = $(
                "<p><label>" +
                  printCount +
                  ':&nbsp;</label><a href="https://fimnew.wim.usgs.gov/pdf/' +
                  data.filename +
                  '" target="_blank">' +
                  mergedTitle +
                  " </a></p>"
              );
              //$("#print-form").append(printJob);
              $("#printJobsDiv").find("p.toRemove").remove();
              $("#printModalBody").append(printJob);
              $("#printTitle").val("");
              $("#printExecuteButton").button("reset");
              page1name = "";
              page2name = "";
            },
          });
        }
      },
    });
  }

  function printPage2Error(event) {
    console.log("page 2 error");
    if (printerations < 5) {
      printerations++;
      /************************************
            
            Put in some code somewhere around here to handle cases where a page 1 is done, 
            so only need to iterate on page 2 until there is a good one

            */
      console.log(
        "trying print again (" + (printerations + 1).toString() + " attempts)"
      );
      printMap();
    } else {
      $("#printExecuteButton").button("reset");
      alert(
        "Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"
      );
      printerations = 0;
      page1name = "";
      page2name = "";
    }
  }

  // Show modal dialog; handle legend sizing (both on doc ready)
  $(document).ready(function () {
    function showSearchModal() {
      $("#geosearchModal").modal("show");
    }
    // Geosearch nav menu is selected
    $("#geosearchNav").click(function () {
      showSearchModal();
    });

    function showAboutModal() {
      $("#aboutModal").modal("show");
    }
    $("#aboutNav").click(function () {
      showAboutModal();
      $("#aboutTab").trigger("click");
    });
    function showUserGuideModal() {
      $("#userGuideModal").modal("show");
    }
    $("#userGuideNav").click(function () {
      showUserGuideModal();
    });

    $("#html").niceScroll();
    $("#sidebar").niceScroll();
    $("#sidebar").scroll(function () {
      $("#sidebar").getNiceScroll().resize();
    });

    $("#legendDiv").niceScroll();
  });

  require([
    "esri/dijit/Legend",
    "esri/tasks/locator",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/graphicsUtils",
    "esri/geometry/Point",
    "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/SpatialReference",
    "esri/layers/WMSLayer",
    "esri/layers/WMSLayerInfo",
    "dijit/form/CheckBox",
    "dijit/form/RadioButton",
    "dojo/query",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/on",
  ], function (
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

    $.each(allLayers, function (index, group) {
      console.log("processing: ", group.groupHeading);

      //sub-loop over layers within this groupType
      $.each(group.layers, function (layerName, layerDetails) {
        //check for exclusiveGroup for this layer
        var exclusiveGroupName = "";
        if (layerDetails.wimOptions.exclusiveGroupName) {
          exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
        }

        if (layerDetails.wimOptions.layerType === "agisFeature") {
          var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
          var legendLayerName;
          //check if include in legend is true
          if (
            layerDetails.wimOptions &&
            layerDetails.wimOptions.includeLegend == true
          ) {
            if (layerDetails.wimOptions.legendTitle) {
              legendLayerName = layerDetails.wimOptions.legendTitle;
            } else {
              legendLayerName = layerName;
            }
            if (layerDetails.wimOptions.legendPlacement) {
              legendLayers.splice(layerDetails.wimOptions.legendPlacement, 0, {
                layer: layer,
                title: legendLayerName,
              });
            } else {
              legendLayers.push({ layer: layer, title: legendLayerName });
            }
          }
          /*if (layerDetails.wimOptions.renderer !== undefined) {
                        layer.setRenderer(layerDetails.wimOptions.renderer);
                    }*/
          addLayer(
            group.groupHeading,
            group.showGroupHeading,
            layer,
            layerName,
            exclusiveGroupName,
            layerDetails.options,
            layerDetails.wimOptions
          );
          //addMapServerLegend(layerName, layerDetails);
        } else if (layerDetails.wimOptions.layerType === "agisWMS") {
          var layer = new WMSLayer(
            layerDetails.url,
            {
              resourceInfo: layerDetails.options.resourceInfo,
              visibleLayers: layerDetails.options.visibleLayers,
            },
            layerDetails.options
          );
          //check if include in legend is true
          if (
            layerDetails.wimOptions &&
            layerDetails.wimOptions.includeLegend == true
          ) {
            legendLayers.push({ layer: layer, title: layerName });
          }
          //map.addLayer(layer);
          addLayer(
            group.groupHeading,
            group.showGroupHeading,
            layer,
            layerName,
            exclusiveGroupName,
            layerDetails.options,
            layerDetails.wimOptions
          );
          //addMapServerLegend(layerName, layerDetails);
        } else if (layerDetails.wimOptions.layerType === "agisDynamic") {
          var layer = new ArcGISDynamicMapServiceLayer(
            layerDetails.url,
            layerDetails.options
          );
          //check if include in legend is true
          if (
            layerDetails.wimOptions &&
            layerDetails.wimOptions.layerDefinitions
          ) {
            var layerDefs = layerDetails.wimOptions.layerDefinitions;
            /*$.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                            layerDefs[index] = def;
                        });*/
            layer.setLayerDefinitions(layerDefs);
          }
          if (layerDetails.visibleLayers) {
            layer.setVisibleLayers(layerDetails.visibleLayers);
          }
          var legendLayerName;
          //check if include in legend is true
          if (
            layerDetails.wimOptions &&
            layerDetails.wimOptions.includeLegend == true
          ) {
            if (layerDetails.wimOptions.legendTitle) {
              legendLayerName = layerDetails.wimOptions.legendTitle;
            } else {
              legendLayerName = layerName;
            }
            if (
              layerDetails.wimOptions.legendPlacement != null &&
              layerDetails.wimOptions.legendPlacement >= 0
            ) {
              legendLayers.splice(layerDetails.wimOptions.legendPlacement, 0, {
                layer: layer,
                title: legendLayerName,
              });
            } else {
              legendLayers.push({ layer: layer, title: legendLayerName });
            }
          }
          //map.addLayer(layer);
          addLayer(
            group.groupHeading,
            group.showGroupHeading,
            layer,
            layerName,
            exclusiveGroupName,
            layerDetails.options,
            layerDetails.wimOptions
          );
          //addMapServerLegend(layerName, layerDetails);
        }
      });
    });

    function addLayer(
      groupHeading,
      showGroupHeading,
      layer,
      layerName,
      exclusiveGroupName,
      options,
      wimOptions
    ) {
      //layer.addTo(map);
      if (wimOptions.layerIndex !== undefined) {
        map.addLayer(layer, wimOptions.layerIndex);
      } else {
        map.addLayer(layer);
      }

      if (wimOptions.legendLabel == false) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML =
          "[id*=" + layer.id + "] .esriLegendLayerLabel { display: none; }";
        document.getElementsByTagName("head")[0].appendChild(style);
      }

      //add layer to layer list
      mapLayers.push([exclusiveGroupName, camelize(layerName), layer]);

      //check if its an exclusiveGroup item
      if (exclusiveGroupName) {
        if (!$("#" + camelize(exclusiveGroupName)).length) {
          var exGroupRoot = $(
            '<div id="' +
              camelize(exclusiveGroupName + " Root") +
              '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>' +
              exclusiveGroupName +
              "</button> </div>"
          );
          exGroupRoot.click(function (e) {
            exGroupRoot
              .find("i.glyphspan")
              .toggleClass("fa-check-square fa-square");

            $.each(mapLayers, function (index, currentLayer) {
              var tempLayer = map.getLayer(currentLayer[2].id);

              if (currentLayer[0] == exclusiveGroupName) {
                if (
                  $("#" + currentLayer[1])
                    .find("i.glyphspan")
                    .hasClass("fa-dot-circle-o") &&
                  exGroupRoot.find("i.glyphspan").hasClass("fa-check-square")
                ) {
                  console.log("adding layer: ", currentLayer[1]);
                  map.addLayer(currentLayer[2]);
                  var tempLayer = map.getLayer(currentLayer[2].id);
                  tempLayer.setVisibility(true);
                } else if (
                  exGroupRoot.find("i.glyphspan").hasClass("fa-square")
                ) {
                  console.log("removing layer: ", currentLayer[1]);
                  map.removeLayer(currentLayer[2]);
                }
              }
            });
          });

          var exGroupDiv = $(
            '<div id="' +
              camelize(exclusiveGroupName) +
              '" class="btn-group-vertical" data-toggle="buttons"></div>'
          );
          $("#toggle").append(exGroupDiv);
        }

        //create radio button
        //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
        if (layer.visible) {
          var button = $(
            '<div id="' +
              camelize(layerName) +
              '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' +
              camelize(exclusiveGroupName) +
              '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' +
              camelize(exclusiveGroupName) +
              '"></i>' +
              layerName +
              "</label> </div>"
          );
        } else {
          var button = $(
            '<div id="' +
              camelize(layerName) +
              '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' +
              camelize(exclusiveGroupName) +
              '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' +
              camelize(exclusiveGroupName) +
              '"></i>' +
              layerName +
              "</label> </div>"
          );
        }

        $("#" + camelize(exclusiveGroupName)).append(button);

        //click listener for radio button
        button.click(function (e) {
          if ($(this).find("i.glyphspan").hasClass("fa-circle-o")) {
            $(this)
              .find("i.glyphspan")
              .toggleClass("fa-dot-circle-o fa-circle-o");

            var newLayer = $(this)[0].id;

            $.each(mapLayers, function (index, currentLayer) {
              if (currentLayer[0] == exclusiveGroupName) {
                if (
                  currentLayer[1] == newLayer &&
                  $("#" + camelize(exclusiveGroupName + " Root"))
                    .find("i.glyphspan")
                    .hasClass("fa-check-square")
                ) {
                  console.log("adding layer: ", currentLayer[1]);
                  map.addLayer(currentLayer[2]);
                  var tempLayer = map.getLayer(currentLayer[2].id);
                  tempLayer.setVisibility(true);
                  //$('#' + camelize(currentLayer[1])).toggle();
                } else if (
                  currentLayer[1] == newLayer &&
                  $("#" + camelize(exclusiveGroupName + " Root"))
                    .find("i.glyphspan")
                    .hasClass("fa-square")
                ) {
                  console.log("groud heading not checked");
                } else {
                  console.log("removing layer: ", currentLayer[1]);
                  map.removeLayer(currentLayer[2]);
                  if (
                    $("#" + currentLayer[1])
                      .find("i.glyphspan")
                      .hasClass("fa-dot-circle-o")
                  ) {
                    $("#" + currentLayer[1])
                      .find("i.glyphspan")
                      .toggleClass("fa-dot-circle-o fa-circle-o");
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
        //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>' + layerName + '</div>');
        if (
          layer.visible &&
          wimOptions.hasOpacitySlider !== undefined &&
          wimOptions.hasOpacitySlider == true &&
          wimOptions.hasZoomto !== undefined &&
          wimOptions.hasZoomto == true
        ) {
          //opacity icon and zoomto icon; button selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-check-square"></i><b>' +
              layerName +
              '</b><span id="opacity' +
              camelize(layerName) +
              '" class="fas fa-adjust opacity"></span><span class="fas fa-search zoomto"></span></button></div>'
          );
        } else if (
          !layer.visible &&
          wimOptions.hasOpacitySlider !== undefined &&
          wimOptions.hasOpacitySlider == true &&
          wimOptions.hasZoomto !== undefined &&
          wimOptions.hasZoomto == true
        ) {
          //opacity icon and zoomto icon; button not selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-square"></i><b>' +
              layerName +
              '</b><span id="opacity' +
              camelize(layerName) +
              '" class="fas fa-adjust opacity"></span><span class="fas fa-search zoomto"></span></button></div>'
          );
        } else if (
          layer.visible &&
          wimOptions.hasOpacitySlider !== undefined &&
          wimOptions.hasOpacitySlider == true
        ) {
          //opacity icon only; button selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-check-square"></i><b>' +
              layerName +
              '</b><span id="opacity' +
              camelize(layerName) +
              '" class="fas fa-adjust opacity"></button></div>'
          );
        } else if (
          !layer.visible &&
          wimOptions.hasOpacitySlider !== undefined &&
          wimOptions.hasOpacitySlider == true
        ) {
          //opacity icon only; button not selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-square"></i><b>' +
              layerName +
              '</b><span id="opacity' +
              camelize(layerName) +
              '" class="fas fa-adjust opacity"></button></div>'
          );
        } else if (
          layer.visible &&
          wimOptions.hasOpacitySlider == false &&
          wimOptions.hasZoomto !== undefined &&
          wimOptions.hasZoomto == true
        ) {
          //zoomto icon only; button selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-check-square"></i><b>' +
              layerName +
              '</b><span class="fas fa-search zoomto"></span></button></span></div>'
          );
        } else if (
          !layer.visible &&
          wimOptions.hasOpacitySlider == false &&
          wimOptions.hasZoomto !== undefined &&
          wimOptions.hasZoomto == true
        ) {
          //zoomto icon only; button not selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-square"></i><b>' +
              layerName +
              '</b><span class="fas fa-search zoomto"></span></button></span></div>'
          );
        } else if (layer.visible) {
          //no icons; button selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" aria-pressed="true"><i class="far fa-check-square"></i><b>' +
              layerName +
              "</b></button></span></div>"
          );
        } else {
          //no icons; button not selected
          var button = $(
            '<div class="sidebar-layers-item" data-toggle="buttons"><button id="' +
              layer.id +
              '"type="button" class="ahpsCheck" aria-pressed="true"><i class="far fa-square"></i><b id="' +
              camelize(layerName) +
              'Label" class="ahpsLabel">' +
              layerName +
              "</b></button></div>"
          );
        }

        //click listener for regular
        button.click(function (e) {
          //toggle checkmark
          $(this).find("i.far").toggleClass("fa-square fa-check-square");
          $(this).find("button").button("toggle");

          e.preventDefault();
          e.stopPropagation();

          $("#" + camelize(layerName)).toggle();

          //layer toggle
          if (layer.visible) {
            layer.setVisibility(false);
          } else {
            layer.setVisibility(true);
          }

          if (wimOptions.otherLayersToggled) {
            $.each(wimOptions.otherLayersToggled, function (key, value) {
              var lyr = map.getLayer(value);
              if (lyr.visible != layer.visible) {
                $("#" + lyr.id)
                  .find("i.far")
                  .toggleClass("fa-check-square fa-square");
                $("#" + lyr.id)
                  .find("button")
                  .button("toggle");
                lyr.setVisibility(layer.visible);
              }
              if (layer.visible) {
                $("#ahpsLegend").show();
              } else {
                $("#ahpsLegend").hide();
              }
            });
          }

          var isLayer = false;
          $.each($(".ahpsCheck"), function (key, value) {
            if (map.getLayer(this.id).visible) {
              $("#ahpsLegend").show();
              isLayer = true;
            }
            if (isLayer == false) {
              $("#ahpsLegend").hide();
            }
          });

          // Google Analytics
          var dimensionValue = layerName + "";
          ga("send", "event", "layer", "click", "layer toggle", {
            dimension2: dimensionValue,
          });
          // End Google Analytics
        });
      }

      //group heading logic
      if (showGroupHeading) {
        //camelize it for divID
        var groupDivID = camelize(groupHeading);

        //check to see if this group already exists
        if (!$("#" + groupDivID).length) {
          //if it doesn't add the header
          var groupDiv = $(
            '<div id="' +
              groupDivID +
              '"><div class="alert alert-info" role="alert"><strong>' +
              groupHeading +
              "</strong></div></div>"
          );
          $("#toggle").append(groupDiv);
        }

        //if it does already exist, append to it

        if (exclusiveGroupName) {
          //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
          $("#" + groupDivID).append(exGroupRoot);
          $("#" + groupDivID).append(exGroupDiv);
          if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
            var id = "#info" + camelize(exclusiveGroupName);
            var moreinfo = $(id);
            moreinfo.click(function (e) {
              window.open(wimOptions.moreinfo, "_blank");
              e.preventDefault();
              e.stopPropagation();
            });
          }
          if ($("#opacity" + camelize(exclusiveGroupName)).length > 0) {
            var id = "#opacity" + camelize(exclusiveGroupName);
            var opacity = $(id);
            opacity.click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              $(".opacitySlider").remove();
              var currOpacity = map.getLayer(options.id).opacity;
              var slider = $(
                '<div class="opacitySlider"><label id="opacityValue">Opacity: ' +
                  currOpacity +
                  '</label><label class="opacityClose"><i class="far fa-times"></i></label><input id="slider" type="range"></div>'
              );
              $("body").append(slider);
              $("#slider")[0].value = currOpacity * 100;
              $(".opacitySlider").css("left", event.clientX - 180);
              $(".opacitySlider").css("top", event.clientY - 50);

              $(".opacitySlider").mouseleave(function () {
                $(".opacitySlider").remove();
              });

              $(".opacityClose").click(function () {
                $(".opacitySlider").remove();
              });
              $("#slider").change(function (event) {
                //get the value of the slider with this call
                var o = $("#slider")[0].value / 100;
                console.log("o: " + o);
                $("#opacityValue").html("Opacity: " + o);
                map.getLayer(options.id).setOpacity(o);

                if (wimOptions.otherLayersToggled) {
                  $.each(wimOptions.otherLayersToggled, function (key, value) {
                    var lyr = map.getLayer(value);
                    lyr.setOpacity(o);
                  });
                }
                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                //var e = '#' + $(this).attr('data-wjs-element');
                //$(e).css('opacity', o)
              });
            });
          }
        } else {
          $("#" + groupDivID).append(button);
          if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
            var id = "#info" + camelize(layerName);
            var moreinfo = $(id);
            moreinfo.click(function (e) {
              window.open(wimOptions.moreinfo, "_blank");
              e.preventDefault();
              e.stopPropagation();
            });
          }
          if ($("#opacity" + camelize(layerName)).length > 0) {
            $("#opacity" + camelize(layerName)).click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              $(".opacitySlider").remove();
              var currOpacity = map.getLayer(options.id).opacity;
              var slider = $(
                '<div class="opacitySlider"><label id="opacityValue">Opacity: ' +
                  currOpacity +
                  '</label><label class="opacityClose"><i class="far fa-times"></i></label><input id="slider" type="range"></div>'
              );
              $("body").append(slider);
              [0];

              $("#slider")[0].value = currOpacity * 100;
              $(".opacitySlider").css("left", event.clientX - 180);
              $(".opacitySlider").css("top", event.clientY - 50);

              $(".opacitySlider").mouseleave(function () {
                $(".opacitySlider").remove();
              });

              $(".opacityClose").click(function () {
                $(".opacitySlider").remove();
              });
              $("#slider").change(function (event) {
                //get the value of the slider with this call
                var o = $("#slider")[0].value / 100;
                console.log("o: " + o);
                $("#opacityValue").html("Opacity: " + o);
                map.getLayer(options.id).setOpacity(o);

                if (wimOptions.otherLayersToggled) {
                  $.each(wimOptions.otherLayersToggled, function (key, value) {
                    var lyr = map.getLayer(value);
                    lyr.setOpacity(o);
                  });
                }
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
            var zoomDialog = $(
              '<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>'
            );

            $("body").append(zoomDialog);

            $(".zoomDialog").css("left", event.clientX - 80);
            $(".zoomDialog").css("top", event.clientY - 5);

            $(".zoomDialog").mouseleave(function () {
              $(".zoomDialog").remove();
            });

            $(".zoomClose").click(function () {
              $(".zoomDialog").remove();
            });

            $("#zoomscale").click(function (e) {
              //logic to zoom to layer scale
              var layerMinScale = map.getLayer(layerToChange).minScale;
              map.setScale(layerMinScale);
            });

            $("#zoomcenter").click(function (e) {
              //logic to zoom to layer center
              //var layerCenter = map.getLayer(layerToChange).fullExtent.getCenter();
              //map.centerAt(layerCenter);
              var dataCenter = new Point(
                defaultMapCenter,
                new SpatialReference({ wkid: 4326 })
              );
              map.centerAt(dataCenter);
            });

            $("#zoomextent").click(function (e) {
              //logic to zoom to layer extent
              var layerExtent = map.getLayer(layerToChange).fullExtent;
              map.setExtent(layerExtent);
            });
          });
          //end zoomto logic
        }
      } else {
        //otherwise append
        $("#toggle").append(button);
        if (
          wimOptions.hasOpacitySlider !== undefined &&
          wimOptions.hasOpacitySlider == true
        ) {
          if ($("#opacity" + camelize(layerName)).length > 0) {
            $("#opacity" + camelize(layerName)).click(function (e) {
              e.preventDefault();
              e.stopPropagation();
              $(".opacitySlider").remove();
              var currOpacity = map.getLayer(options.id).opacity;
              var slider = $(
                '<div class="opacitySlider"><label id="opacityValue">Opacity: ' +
                  currOpacity +
                  '</label><label class="opacityClose"><i class="far fa-times"></i></label><input id="slider" type="range"></div>'
              );
              $("body").append(slider);
              [0];

              $("#slider")[0].value = currOpacity * 100;
              $(".opacitySlider").css("left", event.clientX - 180);
              $(".opacitySlider").css("top", event.clientY - 50);

              $(".opacitySlider").mouseleave(function () {
                $(".opacitySlider").remove();
              });

              $(".opacityClose").click(function () {
                $(".opacitySlider").remove();
              });
              $("#slider").change(function (event) {
                //get the value of the slider with this call
                var o = $("#slider")[0].value / 100;
                console.log("o: " + o);
                $("#opacityValue").html("Opacity: " + o);
                map.getLayer(options.id).setOpacity(o);

                if (wimOptions.otherLayersToggled) {
                  $.each(wimOptions.otherLayersToggled, function (key, value) {
                    var lyr = map.getLayer(value);
                    lyr.setOpacity(o);
                  });
                }
                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                //var e = '#' + $(this).attr('data-wjs-element');
                //$(e).css('opacity', o)
              });
            });
          }
        }
      }
    }

    //get visible and non visible layer lists
    function addMapServerLegend(layerName, layerDetails) {
      if (layerDetails.wimOptions.layerType === "agisFeature") {
        //for feature layer since default icon is used, put that in legend
        var legendItem = $(
          '<div align="left" id="' +
            camelize(layerName) +
            '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>' +
            layerName +
            "</strong></div>"
        );
        $("#legendDiv").append(legendItem);
      } else if (layerDetails.wimOptions.layerType === "agisWMS") {
        //for WMS layers, for now just add layer title
        var legendItem = $(
          '<div align="left" id="' +
            camelize(layerName) +
            '"><img alt="Legend Swatch" src="https://placehold.it/25x41" /><strong>' +
            layerName +
            "</strong></div>"
        );
        $("#legendDiv").append(legendItem);
      } else if (layerDetails.wimOptions.layerType === "agisDynamic") {
        //create new legend div
        var legendItemDiv = $(
          '<div align="left" id="' +
            camelize(layerName) +
            '"><strong>' +
            layerName +
            "</strong></div>"
        );
        $("#legendDiv").append(legendItemDiv);

        //get legend REST endpoint for swatch
        $.getJSON(
          layerDetails.url + "/legend?f=json",
          function (legendResponse) {
            console.log(layerName, "legendResponse", legendResponse);

            //make list of layers for legend
            if (layerDetails.options.layers) {
              // console.log(layerName, 'has visisble layers property')
              //if there is a layers option included, use that
              var visibleLayers = layerDetails.options.layers;
            } else {
              //console.log(layerName, 'no visible layers property',  legendResponse)

              //create visibleLayers array with everything
              var visibleLayers = [];
              $.grep(legendResponse.layers, function (i, v) {
                visibleLayers.push(v);
              });
            }

            //loop over all map service layers
            $.each(legendResponse.layers, function (i, legendLayer) {
              //var legendHeader = $('<strong>' + legendLayer.layerName + '</strong>');
              //$('#' + camelize(layerName)).append(legendHeader);

              //sub-loop over visible layers property
              $.each(visibleLayers, function (i, visibleLayer) {
                //console.log(layerName, 'visibleLayer',  visibleLayer);

                if (visibleLayer == legendLayer.layerId) {
                  console.log(
                    layerName,
                    visibleLayer,
                    legendLayer.layerId,
                    legendLayer
                  );

                  //console.log($('#' + camelize(layerName)).find('<strong>' + legendLayer.layerName + '</strong></br>'))

                  var legendHeader = $(
                    "<strong>" + legendLayer.layerName + "</strong>"
                  );
                  $("#" + camelize(layerName)).append(legendHeader);

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
                      var legendFeature = $(
                        '<img alt="Legend Swatch" src="data:image/png;base64,' +
                          this.imageData +
                          '" /><small>' +
                          this.label.replace("<", "").replace(">", "") +
                          "</small>"
                      );

                      $("#" + camelize(layerName)).append(legendFeature);
                    }
                  });
                  /*
                                 }
                                 //single features
                                 else {
                                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>' + legendLayer.layerName + '</small></br>');

                                 //$('#legendDiv').append(legendItem);
                                 $('#' + camelize(layerName)).append(legendFeature);

                                 }
                                 */
                }
              }); //each visible layer
            }); //each legend item
          }
        ); //get legend json
      }
    }
    /* parse layers.js */

    var legend = new Legend(
      {
        map: map,
        layerInfos: legendLayers,
      },
      "legendDiv"
    );
    legend.startup();
  }); //end of require statement containing legend building code
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
$("body").text($("body").text().replace("●", ""));

// Flood Tools Error
// Flood Tools Error
// Flood Tools Error
var floodToolsError = function (type) {
  if (type == "nws" && ahpsID != "NONE") {
    $("#floodToolsErrorMessageText").text(
      "Some data not available at this site."
    );
    $("#floodToolsErrorMessage").show();
  } else if (type != "nws") {
    $("#floodToolsErrorMessageText").text(
      "There was an error retrieving the data at this time. Please try again later."
    );
    $("#floodToolsErrorMessage").show();
  }

  $("#floodToolsDiv .panel-heading").removeClass("loading-hide");
  $("#floodToolsDiv .panel-body").removeClass("loading-hide");
  $("#floodToolsDiv").removeClass("loading-background");

  // $("#floodToolsDiv").css("visibility", "hidden");
};
