import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Marker, Popup, useMap } from "react-leaflet";
import { RootState } from "../../store/store";
import Styles from "./SearchResult.module.scss";
const SearchResult = () => {
  const map = useMap();
  const { coordinates, title, image } = useSelector(
    (state: RootState) => state.leaflet
  );
  useEffect(() => {
    coordinates.length && map.flyTo(coordinates, 16);
  }, [coordinates, map]);

  return (
    coordinates.length && (
      <div>
        <Marker position={coordinates}>
          <Popup>
            <div className={Styles.popupContainer}>
              <h4>{title}</h4>
              <img className={Styles.image} src={image} alt="location-image" />
            </div>
          </Popup>
        </Marker>
      </div>
    )
  );
};

export default SearchResult;
