import React, { useState, useEffect, useRef } from 'react';
import { findWifiLocations } from '../services/wifiAPI';
const { kakao } = window;

export default function Map({ district, userLocation }) {
    const [map, setMap] = useState(null);
    const [wifiLocation, setWifiLocation] = useState([]);
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

    useEffect(() => {
        const fetchData = async() => {
            try {
                const locations = await findWifiLocations();

                console.log(locations);
                setWifiLocation(locations);
                console.log(3);
            } catch (error) {

                console.log(error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (map !== null) {
            const clusterer = new kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 6,
            });
            const markers = wifiLocation.map(el => {

                return new kakao.maps.Marker({

                    map: map,

                    position: new kakao.maps.LatLng(el.WGS84_Y, el.WGS84_X),

                    title: el.NAME_ENG
                });
            });

            clusterer.addMarkers(markers);
        }
    }, [wifiLocation, map]);


    return ( <
        div ref = { mapElement }
        style = {
            { width: '100vw', height: '100vh' }
        } > < /div>
    );
}