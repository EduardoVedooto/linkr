import { useState, useEffect } from 'react';

import { MdLocationOn, MdLocationOff } from 'react-icons/md';
import styled from 'styled-components';

function Geolocation({ post, setPost }) {
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

        navigator.geolocation.getCurrentPosition((position) => {
            //Remove console.logs
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            post.geolocation.latitude = position.coords.latitude;
            post.geolocation.longitude = position.coords.longitude;

            setPost({ ...post })
        }, (error) => {
            setIsGeoLocationActive(false);
            alert(error.message);
        })
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