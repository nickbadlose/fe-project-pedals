import React from "react";
import { Popup } from "react-mapbox-gl";

const DrawPopup = props => {
  const {selectedMarker, handleMarkerForm, handleMarkerFormChange, markerInfo} = props
  return (
    <div>
      {(selectedMarker && selectedMarker.comments.length === 0)&& (
              <Popup
                coordinates={selectedMarker.geometry.coordinates}
              >
                <form onSubmit={handleMarkerForm}>
                  <input
                    type="text"
                    onChange={handleMarkerFormChange}
                    value={markerInfo}
                  />
                </form>
              </Popup>
            )}
            {(selectedMarker && selectedMarker.comments.length !== 0 )&& (
              <Popup
                coordinates={selectedMarker.geometry.coordinates}
              >
                <p>{selectedMarker.comments[0]}</p>
                
              </Popup>
            )}
            
    </div>
  );
};

export default DrawPopup;
