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

var map
var layer = new ol.layer.Vector();
jsonSource_data_layer = new ol.source.Vector();
jsonSource_data_layer.addFeatures(get_features("bayesianPreEnch.json"));

layer = new ol.layer.Vector({
	source: jsonSource_data_layer,
	opacity: 0.85
});
    
var stamenLayer = new ol.layer.Tile({
	source: new ol.source.Stamen({
	layer: 'terrain'
       })
});
        
     	

map = new ol.Map({
     		projection:"EPSG:4326",
     		layers: [stamenLayer],
     		target: 'map',
     		view: new ol.View({
	       		center: ol.proj.fromLonLat([-99.15,19.36]),
	       		zoom: 11
      		})
});
	
map.addLayer(layer);
	
