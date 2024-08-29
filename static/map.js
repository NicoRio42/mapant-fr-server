import { Map, View } from "ol";
// @ts-ignore
import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";
import TileLayer from "ol/layer/Tile";
import { transform } from "ol/proj.js";
import Draw, { createBox } from "ol/interaction/Draw.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";

const FRANCE_CENTER = [2.43028, 46.53972];
const ZOOM = 6;

const $ = document.querySelector;

proj4.defs(
  "EPSG:2154",
  "+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

proj4.defs(
  "IGNF:LAMB93",
  "+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

register(proj4);

const map = new Map({
  target: "map",
  view: new View({
    projection: "EPSG:2154",
    center: transform(FRANCE_CENTER, "EPSG:4326", "EPSG:2154"),
    zoom: ZOOM,
  }),
});

const tileLayer = new TileLayer({ source: new OSM() });
map.addLayer(tileLayer);

const drawingSource = new VectorSource({ wrapX: false });
const drawingVectorLayer = new VectorLayer({ source: drawingSource });

map.addLayer(drawingVectorLayer);
const drawInteraction = new Draw({
  source: drawingSource,
  type: "Circle",
  geometryFunction: createBox(),
});

map.addInteraction(drawInteraction);
