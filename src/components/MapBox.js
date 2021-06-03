import { MdLocationOn, MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { useState } from 'react';
import Modal from 'react-modal';

//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

function MapBox({ geolocation, username }) {
    Modal.setAppElement('#root');
    const [isOpen, setIsOpen] = useState(false);

    /*
    const loader = new Loader({
        apiKey: "AIzaSyAfjGWNgpjT04iSiHztX-dNGX1oK8jPKqA",
        version: "weekly",
        ...additionalOptions,
    });

    loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    });
    */

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: geolocation.latitude, lng: geolocation.longitude }}
        >
            {props.isMarkerShown && <Marker position={{ lat: geolocation.latitude, lng: geolocation.longitude }} />}
        </GoogleMap>
    ));

    //const url = `https://maps.googleapis.com/maps/api/staticmap?center=${geolocation.latitude},${geolocation.longitude}&zoom=14&size=710x240&sensor=false&key=AIzaSyAfjGWNgpjT04iSiHztX-dNGX1oK8jPKqA`;

    //AIzaSyAfjGWNgpjT04iSiHztX-dNGX1oK8jPKqA

    return (
        <GPSIcon>
            <MdLocationOn onClick={() => setIsOpen(true)} />
            <Modal
                isOpen={isOpen}
                className="MapModal"
                overlayClassName="MapOverlay"
            >
                <ModalContent>
                    <div className="title">
                        <h3>{username}'s location</h3>
                        <MdClose onClick={() => setIsOpen(false)}
                        color="#fff"
                        fontSize="38px" />
                    </div>

                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                </ModalContent>
            </Modal>
        </GPSIcon>
    );
}

export default MapBox;

const GPSIcon = styled.div`
    margin-left: 10px;
    font-size: 20px;
`;

const ModalContent = styled.div`

    div {
        display: flex;
        justify-content: space-between;
    }
    h3 {
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        font-family: "Oswald";
    }
`;