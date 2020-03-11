import React from "react";
import { Popup } from "react-mapbox-gl";

const DrawPopup = props => {
  const {
    selectedMarker,
    handleMarkerForm,
    handleMarkerFormChange,
    markerInfo,
    setMarkerType
  } = props;
  return (
    <div>
      {selectedMarker && selectedMarker.comments.length === 0 && (
        <Popup coordinates={selectedMarker.geometry.coordinates}>
          <form onSubmit={handleMarkerForm}>
            <input
              type="text"
              onChange={handleMarkerFormChange}
              value={markerInfo}
            />
            <br></br>
            <input
              type="radio"
              id="attraction"
              name="markerType"
              value="attraction"
              onChange={() => setMarkerType("attraction")}
            />

            <label htmlFor="attraction">Attraction</label>
            <br></br>
            <input
              type="radio"
              id="warning"
              name="markerType"
              value="warning"
              onChange={() => setMarkerType("warning")}
            />
            <label htmlFor="warning">Warning</label>
          </form>
        </Popup>
      )}
      {selectedMarker && selectedMarker.comments.length !== 0 && (
        <Popup coordinates={selectedMarker.geometry.coordinates}>
          <p>{selectedMarker.comments[0]}</p>
        </Popup>
      )}
    </div>
  );
};

export default DrawPopup;
