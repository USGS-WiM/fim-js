function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["esri/geometry/Extent","esri/InfoTemplate","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a,i){new t("${SITE_NO}","Community:  ${COMMUNITY}");allLayers=[{groupHeading:"available layers",showGroupHeading:!1,includeInLayerList:!0,layers:{"FIM Sites":{url:"http://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",options:{id:"fimSites",opacity:.75,mode:i.MODE_ONDEMAND,outFields:["*"],definitionExpression:"Public = 1",visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0}},"FIM flood extents":{url:"http://fim.wim.usgs.gov/arcgis/rest/services/FIMMapper/floodExtents/MapServer",options:{id:"fimExtents",opacity:.35,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,defaultMapCenter=[-95.6,38.6],results;require(["esri/arcgis/utils","esri/map","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/geometry/Multipoint","esri/geometry/Point","esri/geometry/webMercatorUtils","esri/graphic","esri/layers/ArcGISTiledMapServiceLayer","esri/symbols/PictureMarkerSymbol","esri/tasks/query","esri/tasks/QueryTask","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,t,a,i,o,s,n,l,r,c,p,d,g,u,m,y,f,h,v){function b(){var e=new Date,t=e.getDate(),a=e.getMonth()+1,i=e.getFullYear();return 10>t&&(t="0"+t),10>a&&(a="0"+a),e=i+"-"+a+"-"+t}function w(e){var t="";console.log(e);var a=e.split("T"),i=a[0]+" "+a[1].split(".")[0]+" UTC",o=new Date(i).toString();return t=a[0]+" "+o.split(" ")[4]}function S(){1===f.byId("chkExtent").checked?C.activeGeocoder.searchExtent=map.extent:C.activeGeocoder.searchExtent=null}function x(){S();var e=C.find();e.then(function(e){T(e)}),$("#geosearchModal").modal("hide")}function L(e){k();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(E)}function T(e){if(e=e.results,e.length>0){k();for(var t=0;t<e.length;t++);var a=new l(e[0].feature.geometry);map.centerAndZoom(a,17)}}function k(){map.infoWindow.hide(),map.graphics.clear()}function z(e,t,a,i,o){return new d({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}map=t("mapDiv",{basemap:"gray",center:defaultMapCenter,zoom:5});var D=new a({map:map},"homeButton");D.startup();var I=new i({map:map},"locateButton");I.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),v(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=r.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),1==dragInfoWindows){var a=y(".title",map.infoWindow.domNode)[0],i=new m(map.infoWindow.domNode,{handle:a});v(i,"FirstMove",function(){var e=y(".outerPointer",map.infoWindow.domNode)[0];h.add(e,"hidden");var e=y(".pointer",map.infoWindow.domNode)[0];h.add(e,"hidden")}.bind(this))}map.infoWindow.set("highlight",!0)}),v(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),v(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=r.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),v(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=r.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var O=new p("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");v(f.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(O)}),v(f.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(O)}),v(f.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(O)}),v(f.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(O)}),v(f.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(O)}),v(f.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(O)}),v(f.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(O)}),v(f.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(O)}),v(f.byId("btnNatlMap"),"click",function(){map.addLayer(O)}),v(map,"click",function(e){}),map.on("layer-add",function(e){var t=e.layer.id;e.layer;"fimSites"==t&&map.getLayer(t).on("click",function(e){function t(e){if(e.features.length>0){results=e.features,$("#siteNumber").text(i.SITE_NO),$("#floodSlider").attr({min:0,max:results.length-1}),$("#floodSlider")[0].value=0,$("#selectedValue").text(results[0].attributes.STAGE);var t=[];t[0]="USGSID = '"+i.SITE_NO+"' AND STAGE = "+results[0].attributes.STAGE,map.getLayer("fimExtents").setLayerDefinitions(t),$("#slider").on("input change",function(){$("#selectedValue").text(results[$("#floodSlider")[0].value].attributes.STAGE);var e=[];e[0]="USGSID = '"+i.SITE_NO+"' AND STAGE = "+results[$("#floodSlider")[0].value].attributes.STAGE,map.getLayer("fimExtents").setLayerDefinitions(e)}),$("#slider").css("visibility","visible")}}var a=e.graphic,i=a.attributes,o=a.attributes.SITE_NO,s="http://fim.wim.usgs.gov/proxies/httpProxy/Default.aspx?site_no="+o+"&site_info=true",n={};map.getLevel()<12&&map.centerAndZoom(a.geometry,13),map.getLayer("fimExtents").setVisibility(!0),$.ajax({dataType:"text",type:"GET",url:s,headers:{Accept:"*/*"},success:function(e){console.log(e);var t=e.split("DD")[1].split("#");t.shift(),$.each(t,function(e,a){if("\n"==t[e])return!1;var i=t[e].trim(),o=i.substring(0,2),s=i.substring(5,10);n[s]=o}),console.log(n);var s="http://waterservices.usgs.gov/nwis/iv/?format=json&sites="+i.SITE_NO+"&parameterCd=00060,00065",l="",r="";$.ajax({dataType:"json",type:"GET",url:s,headers:{Accept:"*/*"},success:function(e){var t=e,i="",s="";$.each(t.value.timeSeries,function(e,t){s=t.variable.variableCode[0].value;var o=t.variable.unit.unitAbbreviation,n="";if(t.values[0].value.length>0){var n=t.values[0].value[0].value;switch(s){case"00060":i="Discharge";break;case"00065":i="Gage height";break;case"00010":i="Temperature, water";break;case"00300":i="Dissolved oxygen";break;case"00400":i="pH";break;case"00095":i="Specific cond at 25C";break;case"32283":i="Chlorophyll, in situ";break;case"63680":i="Turbidity, Form Neph";break;case"99133":i="NO3+NO2,water,insitu"}var r=(b(),b(),t.values[0].value[0].dateTime),c=w(r),p="";p="-999999"==n?"<label class='paramLabel'>"+i+": <span style='font-weight: normal'>N/A</span></label><br/>":"<label class='paramLabel'>"+i+": <span style='font-weight: normal'>"+n+" "+o+" <span style='font-size: smaller; color: darkblue'><i>("+c+"</i>)</span></span></label><br/>",l+=p;a.attributes.Name}});var n=t.value.timeSeries[0].sourceInfo.siteName,c=new esri.InfoTemplate("<span class=''>"+n+"</span>","<div id='rtInfo'>"+l+"</div><br/><span>Most recent measurement(s) <span style='font-size: smaller; color: darkblue'><i>(local time)</i></span> - see <a target='_blank' href='http://waterdata.usgs.gov/nwis/uv?site_no="+o+"'>NWIS Site</a> for more details</span><div id='nwisCharts'>"+r+"</div>");a.setInfoTemplate(c);var p=dojo.connect(map.infoWindow,"onHide",function(e){map.getLayer("fimExtents").setVisibility(!1),$("#slider").css("visibility","hidden"),dojo.disconnect(map.infoWindow,p)});map.infoWindow.setFeatures([a]),map.infoWindow.show(a.geometry),map.infoWindow.resize(450,450)},error:function(e){console.log("Error processing the JSON. The error is:"+e)}})},error:function(e){console.log("Error processing the JSON. The error is:"+e)}});var l=map.getLayer("fimExtents").url+"/0",r=new g;r.returnGeometry=!1,r.outFields=["*"],r.orderByFields=["STAGE ASC"],r.where="USGSID = '"+i.SITE_NO+"'";var c=new u(l);c.execute(r,t)})});var C=new o({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");C.startup(),C.on("select",L),C.on("findResults",T),C.on("clear",k),v(C.inputNode,"keydown",function(e){13==e.keyCode&&S()});var E=z("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),v(f.byId("btnGeosearch"),"click",x),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,a,i,o,s,n,l,r,c,p,d,g,u,m,y,f,h,v,b){function w(e,t,a,i,o,n,l){if(map.addLayer(a),x.push([o,camelize(i),a]),o){if(!$("#"+camelize(o)).length){var r=$('<div id="'+camelize(o+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(x,function(e,t){var a=map.getLayer(t[2].id);if(t[0]==o)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else r.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",t[1]),map.removeLayer(t[2]))})});var p=$('<div id="'+camelize(o)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(p)}if(a.visible)var d=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");else var d=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");$("#"+camelize(o)).append(d),d.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(x,function(e,a){if(a[0]==o)if(a[1]==t&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else a[1]==t&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",a[1]),map.removeLayer(a[2]),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(a.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');else if(a.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(a.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else if(a.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider)if(a.visible&&0==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else if(a.visible||0!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(a.visible)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+"</button></span></div>");else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+"</button> </div>");else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');d.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(i)).toggle(),a.visible?a.setVisibility(!1):a.setVisibility(!0)})}if(t){var g=camelize(e);if(!$("#"+g).length){var u=$('<div id="'+g+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(u)}o?($("#"+g).append(r),$("#"+g).append(p)):($("#"+g).append(d),$("#opacity"+camelize(i)).length>0&&$("#opacity"+camelize(i)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(n.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(n.id).setOpacity(t)})}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new s(defaultMapCenter,new c({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent;map.setExtent(a)})}))}else $("#toggle").append(d)}var S=[],x=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,a){var i="";if(a.wimOptions.exclusiveGroupName&&(i=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var o=new r(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&S.push({layer:o,title:e}),w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var o=new p(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&S.push({layer:o,title:e}),w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var o=new l(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&S.push({layer:o,title:e}),a.visibleLayers&&o.setVisibleLayers(a.visibleLayers),w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}})});var L=new e({map:map,layerInfos:S},"legendDiv");L.startup()})}),$(document).ready(function(){});