import { MdLocationOn, MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { useState } from 'react';
import Modal from 'react-modal';

function Map({ geolocation, username }) {
    Modal.setAppElement('#root');
    const [isOpen, setIsOpen] = useState(false);
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${geolocation.latitude},${geolocation.longitude}&zoom=14&size=710x240&sensor=false&key=AIzaSyAfjGWNgpjT04iSiHztX-dNGX1oK8jPKqA`;

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
                    <img src={url} alt="map" />
                </ModalContent>
            </Modal>
        </GPSIcon>
    );
}

export default Map;

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