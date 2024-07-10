// Configuración del mapa de OpenLayers
const map = new ol.Map({
    target: 'map', // ID del contenedor del mapa
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Capa de mapa base de OpenStreetMap
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-99.1332, 19.4326]), // Coordenadas de Ciudad de México
        zoom: 12 // Nivel de zoom inicial
    })
});

// Fuente vectorial para almacenar las geometrías dibujadas
const source = new ol.source.Vector({ wrapX: false });

/*
 * Capa vectorial para visualizar las geometrías dibujadas
 * - `source`: Fuente de datos vectoriales
 * - `style`: Estilo de la capa, en este caso un trazo amarillo con un ancho de 2
 */
const vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffcc33', // Color del trazo
            width: 2 // Ancho del trazo
        })
    })
});

// Agrega la capa vectorial al mapa
map.addLayer(vector);

/*
 * Interacción para dibujar líneas en el mapa
 * - `source`: Fuente de datos vectoriales donde se almacenarán las líneas dibujadas
 * - `type`: Tipo de geometría a dibujar, en este caso `LineString` (líneas)
 */
const draw = new ol.interaction.Draw({
    source: source,
    type: 'LineString'
});

// Agrega la interacción de dibujo al mapa
map.addInteraction(draw);

/*
 * Evento que se dispara al finalizar el dibujo de una línea
 * - `event.feature`: Característica dibujada
 * - `event.feature.getGeometry()`: Geometría de la característica
 * - `getLength(geom)`: Calcula la longitud de la línea
 */
draw.on('drawend', function(event) {
    const geom = event.feature.getGeometry(); // Obtiene la geometría de la línea dibujada
    const length = ol.sphere.getLength(geom); // Calcula la longitud de la línea
    alert('Longitud: ' + length.toFixed(2) + ' metros'); // Muestra una alerta con la longitud calculada
});
