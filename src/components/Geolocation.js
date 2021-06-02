import { useState, useEffect } from 'react';

import { MdLocationOn, MdLocationOff } from 'react-icons/md';
import styled from 'styled-components';

function Geolocation() {
    const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(null);
    const [isGeolocationActive, setIsGeoLocationActive] = useState(false);
    
    useEffect(() => {
        if ("geolocation" in navigator) {
            setIsGeolocationAvailable(true)
        } else {
            setIsGeolocationAvailable(false);
        }
    }, []);

    function activateLocation() {
        setIsGeoLocationActive(true);
    }

    function deactivateLocation() {
        setIsGeoLocationActive(false);
    }

    return (
    <>
        {isGeolocationAvailable ?
            isGeolocationActive ?
            <GeoButtonOn onClick={deactivateLocation}>
                <MdLocationOn
                fontSize="14px"
                color="#238700" />
                <p>Localização Ativada</p>
            </GeoButtonOn>
            :
            <GeoButtonOff onClick={activateLocation}>
                <MdLocationOff
                fontSize="14px"
                color="#c90000" />
                <p>Localização Desativada</p>
            </GeoButtonOff>
        : <span>Localização não disponível</span>}

        
    </>
    );
}

const GeoButtonOn = styled.div`
    display: flex;
    cursor: pointer;

    p {
        font-size: 14px;
        color: #238700;
    }
`;

const GeoButtonOff = styled.div`
    display: flex;
    cursor: pointer;

    p {
        font-size: 14px;
        color: #c90000;
    }
`;

export default Geolocation;