import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Styles from "./MapWrapper.module.scss";
import SearchForm from "../SearchForm/SearchForm";
import SearchResult from "../SearchResult/SearchResult";

const MapWrapper = () => {
  return (
    <div>
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={5}
        scrollWheelZoom={true}
        className={Styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <SearchForm />
        <SearchResult />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
