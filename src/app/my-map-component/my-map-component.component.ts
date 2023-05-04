import { Component, OnInit } from '@angular/core';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Style } from 'ol/style';



@Component({
  selector: 'app-my-map-component',
  templateUrl: './my-map-component.component.html',
  styleUrls: ['./my-map-component.component.css']
})
export class MyMapComponent implements OnInit {

  tipo1 = true;
  tipo2 = true;
  tipo3 = true;

  vectorLayer = new VectorLayer({
    source: new VectorSource({
    })
  });

  constructor() { }

  ngOnInit(): void {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    this.createPolygons(map);
    //this.addFilter(map);
  }

  private createPolygons(map: Map): void {

    function getRandomCoordinates(minLat: number, maxLat: number, minLon: number, maxLon: number): [number, number] {
      const lat = Math.random() * (maxLat - minLat) + minLat;
      const lon = Math.random() * (maxLon - minLon) + minLon;
      return [lat, lon];
    }

    // Generate polygons with coordinates that match the grid
    const polygons = [];
    for (let i = 0; i < 1000; i ++) {
      const tipo = Math.floor(Math.random() * 3) + 1; // Randomly choose a tipo value between 1 and 3
      const coords = getRandomCoordinates(-180, 180, -180, 180);
      polygons.push({ tipo, coords });
    }

    polygons.forEach(polygon => {
      const tipo = polygon.tipo;
      const color = this.getColorForTipo(tipo);
      const coords = polygon.coords;
      const feature = new Feature({
        geometry: new Polygon([[
          [coords[0], coords[1]],
          [coords[0] + 1, coords[1]],
          [coords[0] + 1, coords[1] + 1],
          [coords[0], coords[1] + 1],
          [coords[0], coords[1]],
        ]]).transform('EPSG:4326','EPSG:3857'),
        tipo: tipo,
      });

      feature.setStyle(new Style({
        fill: new Fill({
          color: color
        })
      }));

      this.vectorLayer.getSource()?.addFeature(feature);

    });
    map.addLayer(this.vectorLayer);
  }

  updateFeaturesVisibility() {
    const features = this.vectorLayer.getSource()?.getFeatures();
    features?.forEach((feature) => {
      const tipo = feature.get('tipo');
      const visible = tipo === 1 && this.tipo1 ||
                      tipo === 2 && this.tipo2 ||
                      tipo === 3 && this.tipo3;
      feature.setStyle(new Style({
        fill: new Fill({
          color: visible ? this.getColorForTipo(tipo) : [0, 0, 0, 0],
        }),
      }));
    });
  }

  getColorForTipo(tipo: number): string {
    switch (tipo) {
      case 1:
        return 'blue';
      case 2:
        return 'green';
      case 3:
        return 'red';
      default:
        return 'gray';
    }
  }
}


