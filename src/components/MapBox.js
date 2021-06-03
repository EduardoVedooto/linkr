import { MdLocationOn, MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { useState } from 'react';
import Modal from 'react-modal';

//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

function MapBox({ geolocation, username }) {
    Modal.setAppElement('#root');
    const [isOpen, setIsOpen] = useState(false);

    function Map() {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: parseFloat(geolocation.latitude), lng: parseFloat(geolocation.longitude) }}
            />
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

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

                    <div style={{width: '710px', height: '240px'}}>
                        <WrappedMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAfjGWNgpjT04iSiHztX-dNGX1oK8jPKqA`}
                            loadingElement={<div style={{ height: `100%`, width: `100%`}} />}
                            containerElement={<div style={{ height: `100%`, width: `100%`}} />}
                            mapElement={<div style={{ height: `100%`, width: `100%`}} />}
                        />
                    </div>
                    
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