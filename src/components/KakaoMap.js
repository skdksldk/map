import React, { useState, useEffect, useRef } from 'react';
const { kakao } = window;

export default function Map({ district, userLocation }) {
    const [map, setMap] = useState(null);
    const [parkLocation, setParkLocation] = useState([]);
    const mapElement = useRef(null);


    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(37.5326, 126.99),
            level: 9
        };


        const map = new kakao.maps.Map(mapElement.current, options);


        const zoom = new kakao.maps.ZoomControl();

        map.addControl(zoom, kakao.maps.ControlPosition.RIGHT);
        setMap(map);
    }, []);


    return ( <
        div ref = { mapElement }
        style = {
            { width: '100vw', height: '100vh' } } > < /div>
    );
}