import React from "react";
import { Popup } from "react-mapbox-gl";
import Form from "react-bootstrap/Form";
import styles from "./styling/DrawPopup.module.css";
import Button from "react-bootstrap/Button";

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
          <Form className={styles.popup_box} onSubmit={handleMarkerForm}>
            <Form.Group controlId="PinType.ControlSelect1">
              <Form.Control size="sm" as="select" onChange={setMarkerType}>
                <option value="attraction">Attraction</option>
                <option value="warning">Warning</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="popupInput.ControlTextArea1">
              <Form.Control
                as="textarea"
                size="sm"
                rows="2"
                placeholder="Comment..."
                onChange={handleMarkerFormChange}
                value={markerInfo}
              ></Form.Control>
            </Form.Group>
            <Button
              className={styles.popup_button}
              size="sm"
              variant="primary"
              type="submit"
            >
              Add Pin
            </Button>
          </Form>
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
