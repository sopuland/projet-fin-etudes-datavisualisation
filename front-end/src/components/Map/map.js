import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import './map.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./geopin.png'),
  iconUrl: require('./geopin.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




class Maping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionXY: [43.7031, 7.2661],
      markers: []

    }
  }


componentDidMount() {
      

  var options = {
    method: 'GET',
    headers: {
      "X-Requested-With": "XmlHttpRequest",
      "Content-Type": "application/json"
    },
    credentials: "include"
  }
  
  fetch('http://localhost:8080/users/map', options)
  .then((res) => (res.json()))
  .then(
    (result) => {
      console.log(result.videocam);
      this.setState({
        markers: result.videocam
      });
    },
    (error) => {
      this.setState({message: "Vous n'avez aucun marker a afficher."});
    }
  )
}

_displayMarkers = () => {

  var markersVideocam = this.state.markers;
  
  return markersVideocam.map((device, index) => {
    return(
      <Marker key={`marker-${index}`} position={[device.lat, device.long]}>
        <Popup position={[device.lat, device.long]}>
          <span> <strong>{device.name} </strong><br />{[device.lat, device.long]}</span>
        </Popup>
      </Marker>
    )
  });
}



/*  ?? ajout d'un marquer au clic
    addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
 }
*/

render() {
  return (
    <div className='map'>
      <Map
        style={{ height: "400px", width: "100%" }}
        zoom={12}
        center={this.state.positionXY}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {this._displayMarkers()}
        
      </Map>





    </div>
  );
}
}

export default Maping;