function paint(x,y){
    console.log(x, y);
     vectorSource.clear();
     //estosFeatures = todos.filter(function (feature) {return ageb_ids.indexOf(feature.get('AGEB_ID')) >= 0;});
    estosFeatures = todos.filter(function (feature) {
	return (feature.get('FrecCateg') == x && feature.get('PrecCateg') == y);});
    vectorSource.addFeatures(estosFeatures);

}

function get_features(url) {
    var data_layer = {};

    $.ajax({
	url: url,
	async: false,
	dataType: 'json',
	success: function(data) {
	    data_layer = data;
	}
    });
    var format_data_layer = new ol.format.GeoJSON();
    var features = format_data_layer.readFeatures(data_layer,
						  {dataProjection: 'EPSG:4326',
						   featureProjection: 'EPSG:3857'});

    return features;
}
var size = 0;

var styleCache={}
var style = function(feature, resolution){
    var context = {
		feature: feature,
	variables: {}
    };
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
		stroke: new ol.style.Stroke({color: 'rgba(100,100,100,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(100,100,100,0.5)'})
	    })];
	    if ("" !== null) {
		var labelText = String("");
	    } else {
		var labelText = ""
	    }
	    var key = value + "_" + labelText

	    if (!styleCache[key]){
		var text = new ol.style.Text({
		      font: '14.3px \'Ubuntu\', sans-serif',
		      text: labelText,
		      textBaseline: "center",
		      textAlign: "left",
		      offsetX: 5,
		      offsetY: 3,
		      fill: new ol.style.Fill({
		        color: 'rgba(0, 0, 0, 255)'
		      }),
		    });
		styleCache[key] = new ol.style.Style({"text": text})
	    }
	    var allStyles = [styleCache[key]];
	    allStyles.push.apply(allStyles, style);
	    return allStyles;
	};

var map

var layer = new ol.layer.Vector();
jsonSource_data_layer = new ol.source.Vector();
jsonSource_data_layer.addFeatures(get_features("/static/bayesianPreEnch.json"));
var todos = jsonSource_data_layer.getFeatures();
layer = new ol.layer.Vector({
    source: jsonSource_data_layer,
    style: style,
	opacity: 0.85
});

var style2 = new ol.style.Style({
	    	  fill: new ol.style.Fill({
	    	    color: 'rgba(70,130,180,0.7)'
	    	  }),
	    	  stroke: new ol.style.Stroke({
	    	    color: '#319FD3',
	    	    width: 1
	    	  }),
	    	  text: new ol.style.Text({
	    	    font: '12px Calibri,sans-serif',
	    	    fill: new ol.style.Fill({
	    	      color: 'rgba(250,163,1,1)'
	    	    }),
	    	    stroke: new ol.style.Stroke({
	    	      color: 'rgba(100,100,100,1)',
	    	      width: 3
	    	    })
	    	  })
	    	});
       
	var vectorSource = new ol.source.Vector({
     		projection: 'EPSG:4326'
     	});
     	var miVector = new ol.layer.Vector({
        	source: vectorSource,
        	style: style2
    	}); 
    
var stamenLayer = new ol.layer.Tile({
	source: new ol.source.Stamen({
	layer: 'terrain'
       })
});
        
     	

map = new ol.Map({
     		projection:"EPSG:4326",
    layers: [stamenLayer, layer, miVector],
     		target: 'map',
     		view: new ol.View({
	       		center: ol.proj.fromLonLat([-99.15,19.36]),
	       		zoom: 11
      		})
});



	
