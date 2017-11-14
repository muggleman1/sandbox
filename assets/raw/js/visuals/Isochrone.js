import Visual from './helpers/Visual';
import DivOverlay from './helpers/DivOverlay';
import DefaultMapStyle from './helpers/DefaultMapStyle';
import EditorGenerator from './helpers/EditorGenerator';

class Isochrone extends Visual {
  constructor(config) {
    super(config);

    this.map = null;
    this.locations = [];
    this.openInfoWindow = null;

    this.DISTANCE_THRESHOLD = 0.01;
  }

  onLoadData() {
    this.applyDefaultAttributes({
      title: '',
    });
  }

  render() {
    this.map = new google.maps.Map(document.getElementById(this.renderID), {
      center: { lat: 45.435, lng: 12.335 },
      zoom: 14,
      styles: DefaultMapStyle,
    });

    for (let i = 0; i < this.data.length; i += 1) {
      const point = this.data[i];
      this.addMarker(parseFloat(point.lat), parseFloat(point.lng), 'blue');
    }

    this.registerDefaultClickAction();
  }

  registerDefaultClickAction() {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.clickAction(event);
    });
  }

  clickAction(event) {
    console.log(`Lat: ${event.latLng.lat()}| Lng: ${event.latLng.lng()}`);

    if (this.numTimesClicked == null) {
      this.addMarker(event.latLng.lat(), event.latLng.lng(), 'black');
      this.lastLat = event.latLng.lat();
      this.lastLng = event.latLng.lng();
      this.numTimesClicked = 1;
      return;
    } else if (this.numTimesClicked !== null) {
      this.numTimesClicked += 1;
      if (this.numTimesClicked % 2 === 1) { // If numTimesClicked is odd
        this.clearMarkers('green');
        this.clearMarkers('black');
        this.lastLat = event.latLng.lat();
        this.lastLng = event.latLng.lng();
        this.addMarker(event.latLng.lat(), event.latLng.lng(), 'black');
        return;
      }
      this.addMarker(event.latLng.lat(), event.latLng.lng(), 'black');
    }

    this.markRoute(this.lastLat, this.lastLng, event.latLng.lat(), event.latLng.lng());

    this.lastLat = event.latLng.lat();
    this.lastLng = event.latLng.lng();
  }

  markRoute(sourceLat, sourceLng, destinationLat, destinationLng) {
    const directions = new google.maps.DirectionsService();
    directions.route({
      origin: new google.maps.LatLng(sourceLat,
                             sourceLng),
      destination: new google.maps.LatLng(destinationLat,
                             destinationLng),
      travelMode: 'WALKING',
    }, (response, status) => {
      if (status === 'OK') {
        const steps = response.routes[0].legs[0].steps;
        const returnSteps = [];
        for (let i = 0; i < steps.length; i += 1) {
          // const start = steps[i].start_point;
          const end = steps[i].end_point;
          this.addMarker(end.lat(), end.lng(), 'green');
          returnSteps.push({ lat: end.lat(), lng: end.lng() });
        }
        this.getBridgePath(returnSteps);
      } else {
        window.alert(`Directions request failed due to ${status}`);
      }
    });
  }

  // Consumes a list of lat, lng pairs and produces a list of bridges
  // near the given path
  getBridgePath(path) {
    for (let i = 0; i < path.length - 1; i += 2) {
      const first = path[i];
      const second = path[i + 1];
      const pointsOnPath = this.getPointsOnPath(first, second);
      pointsOnPath.forEach((point) => {
        this.addMarker(point.lat, point.lng, 'red');
      });
      break;
    }
  }

  // start and end are objects with .lat() and .lng() functions
  getPointsOnPath(start, end) {
    // Find the slope between the points
    const slope = (end.lat - start.lat) / (end.lng - start.lng);
    const x = start.lng;
    const y = start.lat;

    const pointsOnPath = [];
    for (let i = 0; i < this.data.length; i += 1) {
      const pointX = this.data[i].lng;
      const pointY = this.data[i].lat;
      if (Isochrone.distanceToLine(pointX, pointY, x, y, slope) < this.DISTANCE_THRESHOLD) {
        pointsOnPath.push(this.data[i]);
      }
    }
    return pointsOnPath;
  }

  static distanceToLine(pointX, pointY, x, y, slope) {
    return 0;
  }

  // Removes all markers from the map of the given color
  clearMarkers(color) {
    for (let i = 0; i < this.locations.length; i += 1) {
      const marker = this.locations[i].marker;
      if (marker.icon.fillColor === color) {
        marker.setMap(null);
      }
    }
  }

  addMarker(lat, lng, color) {
    if (lat && lng) {
      const icon = {
        path: 'M-20,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0',
        fillColor: color,
        fillOpacity: 0.6,
        anchor: new google.maps.Point(0, 0),
        strokeWeight: 0,
        scale: 1,
      };
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
        map: this.map,
        title: '',
        animation: google.maps.Animation.DROP,
        icon,
      });

      this.locations.push({
        marker,
      });
    }
  }

  clearAllMarkers() {
    this.locations.forEach((marker) => {
      marker.setMap(null);
    });
    this.locations = [];
  }

  renderControls() {
    if (this.data.length === 0) {
      alert('Dataset is empty!');
      return;
    }

    Visual.empty(this.renderControlsID);
    const controlsContainer = document.getElementById(this.renderControlsID);

    const editor = new EditorGenerator(controlsContainer);

    editor.createHeader('Editor');
  }
}

export default Isochrone;
