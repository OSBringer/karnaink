import GoogleMapReact from "google-map-react";
import React from "react";
const AnyReactComponent = () => <div>xs</div>;
function Map() {
  const defaultProps = {
    center: {
      lat: 49.22553125194851,
      lng: 18.743128283460656,
    },
    zoom: 11,
  };
  return (
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDOxlPwUk04ROqHLRx8nP3BlAZiMw4W6Ow",
          language: "en",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={49.22553125194851}
          lng={18.743128283460656}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
