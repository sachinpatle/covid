import React from 'react';
import  {Map as MapContainer,LeafletMap,TileLayer} from 'react-leaflet';
import {showCircleonMap} from './util'
import './Map.css';

function Map({countries,casesType,center,zoom}) {
    return (
        <div className="compmap">
       <MapContainer center={center} zoom={zoom}>
           <TileLayer 
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
         
         {/* get all the counties and make loop and draw the red circle */}
         {showCircleonMap(countries,casesType)}
       </MapContainer>
        </div>
    )
}
export default Map
