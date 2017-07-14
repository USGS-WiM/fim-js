function addCommas(e){e+="";for(var t=e.split("."),i=t[0],a=t.length>1?"."+t[1]:"",s=/(\d+)(\d{3})/;s.test(i);)i=i.replace(s,"$1,$2");return i+a}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var parseXml;parseXml=window.DOMParser?function(e){return(new window.DOMParser).parseFromString(e,"text/xml")}:"undefined"!=typeof window.ActiveXObject&&new window.ActiveXObject("Microsoft.XMLDOM")?function(e){var t=new window.ActiveXObject("Microsoft.XMLDOM");return t.async="false",t.loadXML(e),t}:function(){return null};var allLayers;require(["esri/geometry/Extent","esri/InfoTemplate","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,i,a){allLayers=[{groupHeading:"available layers",showGroupHeading:!1,includeInLayerList:!0,layers:{"FIM Sites":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",options:{id:"fimSites",opacity:1,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"Public = 1 AND MULTI_SITE = 0",visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!1}},"Flood-inundation area":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtents/MapServer",options:{id:"fimExtents",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0,legendLabel:!1}},"Area of uncertainty (where applicable)":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/breach/MapServer",options:{id:"fimBreach",opacity:.35,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0,legendLabel:!1}},"Supplemental layers":{url:"https://gis.wim.usgs.gov/arcgis/rest/services/FIMMapper/suppLyrs/MapServer",options:{id:"fimSuppLyrs",opacity:1,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}},"National Weather Service Radar":{url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",options:{id:"nwsRadar",opacity:.65,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!1}},"Flood Watches and Warnings":{url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",visibleLayers:[1],options:{id:"floodWatchWarn",opacity:.65,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!1,legendLabel:!1,layerDefinitions:{1:"prod_type LIKE '%Flood%'"}}},"AHPS Forecast Sites":{url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",visibleLayers:[0],options:{id:"ahpsSites",opacity:.65,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0}},"USGS FIM Sites (NWS forecast category)":{url:"https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/fimi_sites_for_legend/MapServer",options:{id:"fimSitesLegend",opacity:1,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!1,includeLegend:!0,layerIndex:0,legendLabel:!1}},grids1:{url:"https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_1/MapServer",options:{id:"fimGrid1",opacity:1,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!1,includeLegend:!0}},grids2:{url:"https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_2/MapServer",options:{id:"fimGrid2",opacity:0,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!1,includeLegend:!0}},grids3:{url:"https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_3/MapServer",options:{id:"fimGrid3",opacity:0,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!1,includeLegend:!0}}}}]});var map,dialog,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!1,defaultMapCenter=[-95.6,38.6],printCount=0,siteAttr,results,fimiMoreInfoUrl="https://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/fim_add_info/MapServer/1",ahpsForecastUrl="https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/0",nwisUrl="https://waterservices.usgs.gov/nwis/iv/?format=nwjson&period=P7D&parameterCd=00065&sites=",proxyUrl="https://services.wim.usgs.gov/proxies/httpProxy/Default.aspx?",gridInfos=[],grid1Infos,grid2Infos,grid3Infos,gridLayerIndex,gridLayerIndexArrColl=[],siteClick;require(["esri/arcgis/utils","esri/Color","esri/map","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/PopupTemplate","esri/dijit/Scalebar","esri/geometry/Multipoint","esri/geometry/Point","esri/geometry/screenUtils","esri/geometry/webMercatorUtils","esri/graphic","esri/lang","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/FeatureLayer","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleFillSymbol","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/query","esri/tasks/QueryTask","dijit/popup","dijit/TooltipDialog","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/on","dojo/domReady!"],function(e,t,i,a,s,r,o,n,l,c,d,p,u,g,m,y,h,f,v,b,w,S,L,I,x,T,D,M,k,O,_,N,A,E,C){function G(){$("#printModal").modal("show")}function F(){$("#shareModal").modal("show");var e="?site_no="+siteAttr.SITE_NO,t=document.location.href;t=t.split("?")[0];var i=t+e;$("#siteURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> site link</span><code>'+i+"</code>")}function z(){M.close(dialog)}function P(){var e=null;switch(siteAttr.GRID_SERV){case 1:e=grid1Infos;break;case 2:e=grid2Infos;break;case 3:e=grid3Infos;break;case null:e=null}if(null!=e)for(var t,i,a,s=0;s<e.length;s++){var r=e[s].name.split("_");i=r[0],a=r[1],t=e[s].id,i==siteAttr.SHORT_NAME&&gridInfos.push({index:t,shortname:i,gridid:a})}}function R(e,t){return Math.round(t/e)*e}function H(e){for(var t,i=0;i<e.length;i++)"forecast"==e[i].nodeName&&(t=i),i==e.length-1&&"forecast"!=e[i].nodeName&&(t=null);return t}function j(){var e=new Date,t=e.getDate(),i=e.getMonth()+1,a=e.getFullYear();return 10>t&&(t="0"+t),10>i&&(i="0"+i),e=a+"-"+i+"-"+t}function U(e,t){var i=!1,a=e.substring(0,10),s=a.split("-"),r=t.split("-"),o=new Date(s[0],s[1]-1,s[2]),n=new Date(r[0],r[1]-1,r[2]);return o>=n&&(i=!0),i}function W(e){var t="",i=e.split("T"),a=i[0]+" "+i[1].split(".")[0]+" UTC",s=new Date(a).toString();return t=i[0]+" "+s.split(" ")[4]}function B(e,t){var i,a=e.split("T"),s=a[0].split("-");if("nwis"==t)var r=a[1].split(".")[0].split(":");else if("nws"==t)var r=a[1].split("-")[0].split(":");var o=Number(s[0]),n=Number(s[1])-1,l=Number(s[2]),c=Number(r[0]),d=Number(r[1]),p=Number(r[2]);return i=Date.UTC(o,n,l,c,d,p)}function q(e){var t;switch(e.getDay()){case 0:t="Sunday";break;case 1:t="Monday";break;case 2:t="Tuesday";break;case 3:t="Wednesday";break;case 4:t="Thursday";break;case 5:t="Friday";break;case 6:t="Saturday"}return t}function V(e){var t;switch(e.getMonth()){case 0:t="January";break;case 1:t="February";break;case 2:t="March";break;case 3:t="April";break;case 4:t="May";break;case 5:t="June";break;case 6:t="July"}return t}function Y(){function e(e){printCount++;var t=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+o+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(t),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function t(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var i=map.getLayer("fimSites");i.setVisibility(!1);var a=new I;a.map=map;var s=new x;s.format="PDF",s.layout="FIMpage2design",s.preserveScale=!1;var r=$("#printTitle").val();""==r?s.layoutOptions={titleText:"FIM",authorText:"Flood Inundation Mapping",copyrightText:"This page was produced by the FIM and the WiM",customTextElements:[{mapTitle:"Flood-Inundation Map for the Wabash River at Terre Haute, Indiana at the U.S. Geological Survey Streamgage Number "+siteAttr.SITE_NO},{mapSeries:siteAttr.REPORT}]}:s.layoutOptions={titleText:r,authorText:"Flood Inundation Mapping",copyrightText:"This page was prgit pulloduced by the FIM and the WiM",customTextElements:[{mapTitle:"Flood-Inundation Map for the "+siteAttr.COMMUNITY+" at the U.S. Geological Survey Streamgage Number "+siteAttr.SITE_NO},{mapSeries:siteAttr.REPORT}]};var o=s.layoutOptions.titleText;a.template=s;var n=new L("https://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");n.execute(a,e,t),i.setVisibility(!0)}esriConfig.defaults.io.corsEnabledServers.push("fim.wim.usgs.gov"),esriConfig.defaults.io.corsEnabledServers.push("gis.wim.usgs.gov"),esri.config.defaults.io.proxyUrl=proxyUrl;var Z=[{level:0,resolution:156543.03392800014,scale:591657527.591555},{level:1,resolution:78271.51696399994,scale:295828763.795777},{level:2,resolution:39135.75848200009,scale:147914381.897889},{level:3,resolution:19567.87924099992,scale:73957190.948944},{level:4,resolution:9783.93962049996,scale:36978595.474472},{level:5,resolution:4891.96981024998,scale:18489297.737236},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.992452562495,scale:4622324.434309},{level:8,resolution:611.4962262813797,scale:2311162.217155},{level:9,resolution:305.74811314055756,scale:1155581.108577},{level:10,resolution:152.87405657041106,scale:577790.554289},{level:11,resolution:76.43702828507324,scale:288895.277144},{level:12,resolution:38.21851414253662,scale:144447.638572},{level:13,resolution:19.10925707126831,scale:72223.819286},{level:14,resolution:9.554628535634155,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.388657133974685,scale:9027.977411},{level:17,resolution:1.1943285668550503,scale:4513.988705}];map=i("mapDiv",{basemap:"gray",center:defaultMapCenter,logo:!1,lods:Z,zoom:5});var X=new s({map:map},"homeButton");X.startup();var J=new r({map:map},"locateButton");J.startup();var K=(new n({map:map,scalebarUnit:"dual"}),window.location),Q="";if(void 0!=K.search){var ee=K.search;-1!=ee.search("site_no")&&(Q=ee.split("site_no=")[1])}$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#aboutModal").modal("show"),$("#disclaimerTab").trigger("click"),$("#printNavButton").click(function(){G()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),Y()}),$("#shareLink").click(function(){F()}),dialog=new k({id:"tooltipDialog",style:"position: absolute; font: normal normal normal 10pt Helvetica;z-index:100"}),dialog.startup(),C(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=p.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),1==dragInfoWindows){var i=_(".title",map.infoWindow.domNode)[0],a=new O(map.infoWindow.domNode,{handle:i});C(a,"FirstMove",function(){var e=_(".outerPointer",map.infoWindow.domNode)[0];A.add(e,"hidden");var e=_(".pointer",map.infoWindow.domNode)[0];A.add(e,"hidden")}.bind(this))}map.infoWindow.set("highlight",!0),$('[class^="scalebar"]').attr("bottom","40px")}),C(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),C(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=p.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),C(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var te=new m("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");C(N.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(te)}),C(N.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(te)}),C(N.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(te)}),C(N.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(te)}),C(N.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(te)}),C(N.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(te)}),C(N.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(te)}),C(N.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(te)}),C(N.byId("btnNatlMap"),"click",function(){map.addLayer(te)}),map.on("basemap-change",function(e){map.reorderLayer(map.getLayer("fimSitesLegend"),0)}),$("#floodToolsDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:500}),$("#floodToolsDiv .dropdown").prepend("<div id='floodClose' title='close'><b>X</b></div>"),$("#floodToolsDiv .dropdown").prepend("<div id='floodMin' title='collapse'><b>_</b></div>"),$("#floodMin").click(function(){$("#floodToolsDiv").css("visibility","hidden"),$("#flood-tools-alert").slideDown(250)}),$("#floodClose").click(function(){$("#floodToolsDiv").css("visibility","hidden"),map.getLayer("fimExtents").setVisibility(!1),map.getLayer("fimBreach").setVisibility(!1),map.getLayer("fimSuppLyrs").setVisibility(!1),map.infoWindow.hide()}),$("#floodToolsOpen").click(function(){$("#floodToolsDiv").css("visibility","visible"),$("#flood-tools-alert").slideUp(250)}),$("#waterAlertLink").click(function(){$("#waterAlertLink").attr("href","https://water.usgs.gov/wateralert/subscribe/?fim=1&intro=1&site_no="+siteAttr.SITE_NO+"&agency_cd=USGS&type_cd=st&parms=00065:"+results[$("#floodSlider")[0].value].attributes.STAGE),$("#waterAlertLink").click()}),$("#disclaimerLink").click(function(){$("#aboutModal").modal("show"),$("#disclaimerTab").trigger("click")}),map.on("layer-add",function(e){var t=e.layer.id;e.layer;if("fimSites"==t){var i=map.getLayer(t).on("update-end",function(e){C(e.target,"mouse-out",z),C(e.target,"mouse-over",function(e){var t="${STATE}: ${COMMUNITY}",i=g.substitute(e.graphic.attributes,t);dialog.setContent(i),M.open({popup:dialog,x:e.pageX,y:e.pageY})});var s=[],r=e.target.graphics;$.each(r,function(e,t){null!=t.attributes.AHPS_ID&&s.push("'"+t.attributes.AHPS_ID.toUpperCase()+"'")}),$.ajax({dataType:"json",type:"GET",url:ahpsForecastUrl+"/query?returnGeometry=false&where=GaugeLID%20in%20%28"+s+"%29&outFields=status%2Cgaugelid&f=json",headers:{Accept:"*/*"},success:function(e){var s,o=e.features;for(s=0;s<o.length;s++)for(var n=0;n<r.length;n++)map.getLayer(t).graphics[n].attributes.AHPS_ID==o[s].attributes.gaugelid.toLowerCase()&&(map.getLayer(t).graphics[n].attributes.FLOOD_CONDITION=o[s].attributes.status);var l=13.44,c=11,d=new f("./images/default.png",l,c),p=new f("./images/action.png",l,c),u=new f("./images/major.png",l,c),g=new f("./images/minor.png",l,c),m=new f("./images/moderate.png",l,c),y=new f("./images/no_flooding.png",l,c),v=new h(d,"FLOOD_CONDITION");if(v.addValue("action",p),v.addValue("major",u),v.addValue("minor",g),v.addValue("moderate",m),v.addValue("no_flooding",y),map.getLayer(t).setRenderer(v),map.getLayer(t).redraw(),i.remove(),""!=Q){var b=map.getLayer(t).graphics;$.each(b,function(e,t){if(void 0!=t.attributes&&t.attributes.SITE_NO==Q){var i=t;i._shape.rawNode.id=Q,$("#"+Q).on("click",a),$("#"+Q).trigger("click")}})}},error:function(e){console.log("Error processing the JSON. The error is:"+e)}})}),a=function(e){function t(e){if(e.features.length>0){results=e.features,$("#floodToolsPanelHeader").html(a.STATE+": "+a.COMMUNITY+" <span id='shareLink'>(<span class='glyphicon glyphicon glyphicon-share'></span> Share)</span>"),$("#shareLink").click(function(){F()}),$("#siteNumber").text(a.SITE_NO),$("#floodSlider").attr({min:0,max:results.length-1}),$("#floodSlider")[0].value=0,$("#selectedValue").text(results[0].attributes.STAGE),$("#floodMinSelectedGage").text(results[0].attributes.STAGE),$(".slider-min").text(results[0].attributes.STAGE),$(".slider-max").text(results[results.length-1].attributes.STAGE);var t=[];t[0]="USGSID = '"+a.SITE_NO+"' AND STAGE = "+results[0].attributes.STAGE,map.getLayer("fimExtents").setLayerDefinitions(t),map.getLayer("fimBreach").setLayerDefinitions(t),$("#slider").on("input change",function(){$("#selectedValue").text(results[$("#floodSlider")[0].value].attributes.STAGE),$("#floodMinSelectedGage").text(results[$("#floodSlider")[0].value].attributes.STAGE);var e=[];e[0]="USGSID = '"+a.SITE_NO+"' AND STAGE = "+results[$("#floodSlider")[0].value].attributes.STAGE,map.getLayer("fimExtents").setLayerDefinitions(e),map.getLayer("fimBreach").setLayerDefinitions(e)});var i=.5*y-.5*$("#floodToolsDiv").width(),s=.5*m-.5*$("#floodToolsDiv").height();g.setPosition(i,s),1==g.isPinned()&&g.unpin()}}var i;i=void 0!=e.graphic?e.graphic:e.currentTarget.e_graphic;var a=i.attributes;siteAttr=a,results=null,P(),$("#downloadData").attr("href",siteAttr.DATA_LINK),$("#reportCover").attr("src",siteAttr.REP_THUMB),$("#reportCover").off("click").click(function(){window.open(siteAttr.REP_LINK)}),$("#downloadReport").attr("href",siteAttr.REP_LINK),$("#mapsCreatedBy").empty(),$("#mapsReviewedBy").empty(),$("#logos").empty(),$.ajax({dataType:"json",type:"GET",url:map.getLayer("fimSites").url+"/queryRelatedRecords?objectIds="+siteAttr.OBJECTID+"&relationshipId=0&outFields=*&definitionExpression=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnZ=false&returnM=false&gdbVersion=&f=json",headers:{Accept:"*/*"},success:function(e){if(e.relatedRecordGroups[0].relatedRecords.length>0){var t=e.relatedRecordGroups[0].relatedRecords,i=!1;$.each(t,function(e,t){"C"==t.attributes.TYPE?$("#mapsCreatedBy").append("<a target='_blank' href='"+t.attributes.URL+"'>"+t.attributes.ENTITY+"</a><br/>"):"R"==t.attributes.TYPE?$("#mapsReviewedBy").append("<a target='_blank' href='"+t.attributes.URL+"'>"+t.attributes.ENTITY+"</a><br/>"):"L"==t.attributes.TYPE?$("#logos").append("<img src='https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/"+t.attributes.ENTITY+"'/>"):"F"==t.attributes.TYPE&&($("#recordsLogo").attr("src","https://s3.amazonaws.com/wimcloud.usgs.gov/FIM/logos/"+t.attributes.ENTITY),i=!0)}),1==i?($("#usgsDefaultLogo").hide(),$("#recordsLogo").show()):0==i&&($("#usgsDefaultLogo").show(),$("#recordsLogo").hide())}},error:function(e){console.log("Error processing the JSON. The error is:"+e)}});var s=siteAttr.SITE_NO,r=siteAttr.AHPS_ID,o=siteAttr.STATE,n=siteAttr.COMMUNITY;map.getLevel()<12&&map.centerAndZoom(i.geometry,13);var l=s+", "+o+", "+n;ga("send","event","Map","click","Site Clicked",{dimension1:l}),map.getLayer("fimExtents").setVisibility(!0),map.getLayer("fimBreach").setVisibility(!0);var c=map.getLayer("fimSuppLyrs"),d=[];d[0]="USGSID = '"+s+"'",d[1]="USGSID = '"+s+"'",c.setLayerDefinitions(d),c.setVisibility(!0),$("[id*='Tab']").parents("li").removeClass("active"),$(".nav-tabs #floodToolsTab").tab("show"),$("#usgsSiteNoMin").text(s),$("#usgsSiteNoMin").attr("href","https://waterdata.usgs.gov/nwis/uv?site_no="+s),$("#nwsSiteIDMin").text(i.attributes.AHPS_ID),$("#nwsSiteIDMin").attr("href","https://water.weather.gov/ahps2/hydrograph.php?gage="+i.attributes.AHPS_ID),$("#usgsSiteNoMax").text(s),$("#usgsSiteNoMax").attr("href","https://waterdata.usgs.gov/nwis/uv?site_no="+s),$("#nwsSiteIDMax").text(i.attributes.AHPS_ID),$("#nwsSiteIDMax").attr("href","https://water.weather.gov/ahps2/hydrograph.php?gage="+i.attributes.AHPS_ID),1==a.HAS_GRIDS?$("#gridLabel").show():$("#gridLabel").hide(),$.ajax({dataType:"json",type:"GET",url:fimiMoreInfoUrl+"/query?where=USGSID%20%3D%20"+s+"&outFields=ADD_INFO&f=json",headers:{Accept:"*/*"},success:function(e){e.features.length>0?($("#moreInfo").text(e.features[0].attributes.ADD_INFO),$("#moreInfoTab").show(),$(".nav-tabs a[href='#moreInfoTabPane']").tab("show")):($("#moreInfo").text("Loading..."),$("#moreInfoTab").hide())},error:function(e){console.log("Error processing the JSON. The error is:"+e)}}),$.ajax({dataType:"text",type:"GET",url:proxyUrl+"site_no="+s+"&site_info=true",headers:{Accept:"*/*"},success:function(e){var t="",r="",o="https://waterservices.usgs.gov/nwis/iv/?format=json&sites="+a.SITE_NO+"&parameterCd=00060,00065";$.ajax({dataType:"json",type:"GET",url:o,headers:{Accept:"*/*"},success:function(e){var a=e,o="",n="";$.each(a.value.timeSeries,function(e,a){n=a.variable.variableCode[0].value;var s=a.variable.unit.unitAbbreviation,l="";if(a.values[0].value.length>0){var l=a.values[0].value[0].value;switch(n){case"00060":o="Discharge";break;case"00065":o="Gage height";break;case"00010":o="Temperature, water";break;case"00300":o="Dissolved oxygen";break;case"00400":o="pH";break;case"00095":o="Specific cond at 25C";break;case"32283":o="Chlorophyll, in situ";break;case"63680":o="Turbidity, Form Neph";break;case"99133":o="NO3+NO2,water,insitu"}var c=j(),d=j(),p=a.values[0].value[0].dateTime,u=W(p);"Discharge"==o?($("#floodMaxDischarge").text(l),$("#floodMinDischarge").text(l)):"Gage height"==o&&($("#floodMaxGage").text(l),$("#floodMinGage").text(l));var g="";g="-999999"==l?"<label class='paramLabel'>"+o+": <span style='font-weight: normal'>N/A</span></label><br/>":"<label class='paramLabel'>"+o+": <span style='font-weight: normal'>"+l+" "+s+" <span style='font-size: smaller; color: darkblue'><i>("+u+"</i>)</span></span></label><br/>",t+=g;var m=i.attributes.Name;if(1==U(p,c)){var y="https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no="+m+"&parm_cd="+n+"&begin_date="+c+"&end_date="+d,h="<br/><br/><label>"+o+"</label><br/><img src='"+y+"'/>";r+=h}}});var l=a.value.timeSeries[0].sourceInfo.siteName;new esri.InfoTemplate("<span class=''>"+l+"</span>","<div id='rtInfo'>"+t+"</div><br/><span>Most recent measurement(s) <span style='font-size: smaller; color: darkblue'><i>(local time)</i></span> - see <a target='_blank' href='https://waterdata.usgs.gov/nwis/uv?site_no="+s+"'>NWIS Site</a> for more details</span><div id='nwisCharts'>"+r+"</div>")},error:function(e){console.log("Error processing the JSON. The error is:"+e)}})},error:function(e){console.log("Error processing the JSON. The error is:"+e)}});var p=$.ajax({dataType:"text",type:"GET",url:nwisUrl+s,headers:{Accept:"*/*"}}),u=$.ajax({dataType:"xml",type:"GET",url:proxyUrl+"ahpsID="+r,headers:{Accept:"*/*"}});$("#floodToolsDiv").css("visibility","visible");var g=$("#floodToolsDiv").data("lobiPanel"),m=$(document).height(),y=$(document).width(),h=.9,f=m*h,v=y*h,b=600,w=325;500>m&&($("#floodToolsDiv").height(f),w=$("#floodToolsDiv").height()-50),500>y&&($("#floodToolsDiv").width(v),b=$("#floodToolsDiv").width()-50),$.when(p,u).done(function(e,t){var i=$.parseJSON(e[0]),a=i.data[0].time_series_data,s=[],r=[];if($.each(a,function(e,t){if(void 0!==t[0]){var i=t[0],t=t[1];s.push([i,t])}}),"no nws data"!=t[0].children[0].children[0].textContent){var o=H(t[0].children[0].children),n=t[0].children[0].children[o].children;if(n.length>0){var l="Stage"==n[0].children[1].attributes.name.value?1:2;$.each(n,function(e,t){if(""!==t.children[0].textContent){var i=B(t.children[0].textContent,"nws"),t=Number(t.children[l].textContent);r.push([i,t])}})}}new Highcharts.Chart("hydroChart",{chart:{type:"line",height:w,width:b},title:{text:""},series:[{data:s,name:"NWIS Observed",color:"black",marker:{enabled:!1}},{data:r,name:"NWS Predicted",color:"black",marker:{enabled:!0,symbol:"circle",fillColor:"white",lineColor:"black",lineWidth:1.25}}],xAxis:{type:"datetime",tickInterval:864e5},yAxis:{labels:{format:"{value} ft"},title:{text:"Gage height"}},tooltip:{formatter:function(){var e=new Date(this.x),t=q(e),i=V(e),a=e.getDate(),s=e.getHours().toString(),r=e.getMinutes().toString();return 1==s.length&&(s="0"+s),1==r.length&&(r="0"+r),t+", "+i+" "+a+", "+s+":"+r+"<br/>"+this.series.name+": <b>"+this.y+" ft</b>"}}})}).fail(function(){alert("there was an issue")});var S=map.getLayer("fimExtents").url+"/0",L=new T;L.returnGeometry=!1,L.outFields=["*"],L.orderByFields=["STAGE ASC"],L.where="USGSID = '"+a.SITE_NO+"'";var I=new D(S);I.execute(L,t)};map.getLayer("fimSites").on("click",a)}else if("fimGrid1"==t||"fimGrid2"==t||"fimGrid3"==t){switch(t){case"fimGrid1":grid1Infos=map.getLayer(t).layerInfos;break;case"fimGrid2":grid2Infos=map.getLayer(t).layerInfos;break;case"fimGrid3":grid3Infos=map.getLayer(t).layerInfos}}}),map.on("click",function(e){var t=new b;if(null!=siteAttr&&1==siteAttr.HAS_GRIDS&&1==map.getLayer("fimExtents").visible&&"image"!=e.target.localName){var i=siteAttr.GRID_SERV;t.layerIds=[],gridLayerIndexArrColl=[];for(var a=0;a<gridInfos.length;a++)gridInfos[a].shortname==siteAttr.SHORT_NAME&&Number(gridInfos[a].gridid)==results[$("#floodSlider")[0].value].attributes.GRIDID?(t.layerIds.push([gridInfos[a].index]),gridLayerIndexArrColl.push(gridInfos[a].index),gridLayerIndex=gridInfos[a].index):gridInfos[a].shortname==siteAttr.SHORT_NAME&&gridInfos[a].gridid==results[$("#floodSlider")[0].value].attributes.GRIDID+"b"&&(t.layerIds.push([gridInfos[a].index]),gridLayerIndexArrColl.push(gridInfos[a].index),gridLayerIndex=gridInfos[a].index);t.width=map.width,t.height=map.height,t.geometry=e.mapPoint,t.tolerance=1,t.mapExtent=map.extent,t.spatialReference=map.spatialReference;var s=new w("https://gis.wim.usgs.gov/ArcGIS/rest/services/FIMMapper/grids_"+i+"/MapServer");s.showBusyCursor=!0;var r=s.execute(t);r.addCallback(function(t){if(map.infoWindow.hide(),"NoData"!=t[0].feature.attributes["Pixel Value"]){var i=siteAttr.DEPTH_RANG;null==i&&(i=1);var a=Number(i)/2%.5;0==a&&(a=.5);var s=t[0].feature.attributes["Pixel Value"],r=R(a,s),o=r-Number(i)/2,n=r+Number(i)/2,l=(r+Number(i)/2)%.5;if(0!=l){var c=r-s;c>0?(o=Number((r-Number(i)/2-a).toFixed(1)),n=Number((r+Number(i)/2-a).toFixed(1))):(o=Number((r-Number(i)/2+a).toFixed(1)),n=Number((r+Number(i)/2+a).toFixed(1)))}0>o&&(o=0);var d=o.toString()+" - "+n.toString(),p=new esri.InfoTemplate("Water depth <a target='_blank' href='"+siteAttr.REP_LINK+"'><i style='color: white' class='fa fa-question-circle'></a>","<b>Range:</b> "+d+" ft"),u=t[0].feature;u.setInfoTemplate(p),map.infoWindow.setFeatures([u]),map.infoWindow.resize(175,125),map.infoWindow.show(e.mapPoint)}})}}),search_api.create("geosearch",{on_result:function(e){require(["esri/geometry/Extent"],function(t){var i=["GNIS_MAJOR","GNIS_MINOR","ZIPCODE","AREACODE"],a=i.indexOf(e.result.properties.Source);-1==a?map.setExtent(new esri.geometry.Extent({xmin:e.result.properties.LonMin,ymin:e.result.properties.LatMin,xmax:e.result.properties.LonMax,ymax:e.result.properties.LatMax,spatialReference:{wkid:4326}}),!0):require(["esri/geometry/Point"],function(t){map.centerAndZoom(new t(e.result.properties.Lon,e.result.properties.Lat),12)})})},include_usgs_sw:!0,include_usgs_gw:!0,include_usgs_sp:!0,include_usgs_at:!0,include_usgs_ot:!0,include_huc2:!0,include_huc4:!0,include_huc6:!0,include_huc8:!0,include_huc10:!0,include_huc12:!0}),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}function i(){$("#userGuideModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#userGuideNav").click(function(){i()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,i,a,s,r,o,n,l,c,d,p,u,g,m,y,h,f,v,b){function w(e,t,i,a,s,o,n){if(void 0!==n.layerIndex?map.addLayer(i,n.layerIndex):map.addLayer(i),0==n.legendLabel){var l=document.createElement("style");l.type="text/css",l.innerHTML="[id*="+i.id+"] .esriLegendLayerLabel { display: none; }",document.getElementsByTagName("head")[0].appendChild(l)}if(L.push([s,camelize(a),i]),s){if(!$("#"+camelize(s)).length){var d=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+"</button> </div>");d.click(function(e){d.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(L,function(e,t){var i=map.getLayer(t[2].id);if(t[0]==s)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&d.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var i=map.getLayer(t[2].id);i.setVisibility(!0)}else d.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",t[1]),map.removeLayer(t[2]))})});var p=$('<div id="'+camelize(s)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(p)}if(i.visible)var u=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");else var u=$('<div id="'+camelize(a)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+a+"</label> </div>");$("#"+camelize(s)).append(u),u.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(L,function(e,i){if(i[0]==s)if(i[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var a=map.getLayer(i[2].id);a.setVisibility(!0)}else i[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",i[1]),map.removeLayer(i[2]),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else if(n.includeInLayerList){if(i.visible&&void 0!==n.hasOpacitySlider&&1==n.hasOpacitySlider&&void 0!==n.hasZoomto&&1==n.hasZoomto)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');else if(i.visible||void 0===n.hasOpacitySlider||1!=n.hasOpacitySlider||void 0===n.hasZoomto||1!=n.hasZoomto)if(i.visible&&void 0!==n.hasOpacitySlider&&1==n.hasOpacitySlider)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else if(i.visible||void 0===n.hasOpacitySlider||1!=n.hasOpacitySlider)if(i.visible&&0==n.hasOpacitySlider&&void 0!==n.hasZoomto&&1==n.hasZoomto)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else if(i.visible||0!=n.hasOpacitySlider||void 0===n.hasZoomto||1!=n.hasZoomto)if(i.visible)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+a+"</button></span></div>");else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+"</button> </div>");else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+i.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+a+'<span id="opacity'+camelize(a)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
u.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(a)).toggle(),i.visible?i.setVisibility(!1):i.setVisibility(!0);var t=a+"";ga("send","event","layer","click","layer toggle",{dimension2:t})})}if(t){var g=camelize(e);if(!$("#"+g).length){var m=$('<div id="'+g+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(m)}s?($("#"+g).append(d),$("#"+g).append(p)):($("#"+g).append(u),$("#opacity"+camelize(a)).length>0&&$("#opacity"+camelize(a)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(o.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(o.id).setOpacity(t)})}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,i=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(i),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var i=map.getLayer(t).minScale;map.setScale(i)}),$("#zoomcenter").click(function(e){var t=new r(defaultMapCenter,new c({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var i=map.getLayer(t).fullExtent;map.setExtent(i)})}))}else $("#toggle").append(u)}var S=[],L=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,i){var a="";if(i.wimOptions.exclusiveGroupName&&(a=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var s=new l(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&S.push({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var s=new d(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&S.push({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var s=new n(i.url,i.options);if(i.wimOptions&&i.wimOptions.layerDefinitions){var r=[];$.each(i.wimOptions.layerDefinitions,function(e,t){r[e]=t}),s.setLayerDefinitions(r)}i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),i.wimOptions&&1==i.wimOptions.includeLegend&&S.push({layer:s,title:e}),w(t.groupHeading,t.showGroupHeading,s,e,a,i.options,i.wimOptions)}})});var I=new e({map:map,layerInfos:S},"legendDiv");I.startup()})}),$(document).ready(function(){}),$("body").text($("body").text().replace("●",""));