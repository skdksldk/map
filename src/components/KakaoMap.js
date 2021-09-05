import React, { useState, useEffect, useRef } from 'react';
import { findWifiLocations } from '../services/findWifiAPI';
const { kakao } = window;

export default function Map({ district, userLocation }) {
    const [map, setMap] = useState(null);
    const [wifiLocation, setWifiLocation] = useState([]);
    const mapElement = useRef(null);


    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(37.51752, 127.04746),
            level: 7
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

                //console.log(locations);
                setWifiLocation(locations);

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

                    position: new kakao.maps.LatLng(el.LNT, el.LAT),

                    title: el.X_SWIFI_ADRES2
                });
            });

            clusterer.addMarkers(markers);
        }
    }, [wifiLocation, map]);

    useEffect(() => {
        if (map !== null) {
            const { lat, lng } = userLocation;
            if (lat !== 0 && lng !== 0) {
                const locPosition = new kakao.maps.LatLng(lat, lng);
                const message =
                    '<div style="padding:5px; width: 150px; color: #3b8686;"><b>현재 내 위치!</b></div>';
                map.setLevel(4);
                displayMarker(locPosition, message);

                function displayMarker(locPosition, message) {
                    const imageSrc =
                        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

                    const imageSize = new kakao.maps.Size(24, 35);


                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);


                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: locPosition,
                        image: markerImage,
                    });

                    const iwContent = message,
                        iwRemoveable = true;


                    const infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable,
                    });


                    infowindow.open(map, marker);


                    map.setCenter(locPosition);
                }
            }
        }
    }, [userLocation, map]);


    return ( <
        div ref = { mapElement }
        style = {
            { width: '100vw', height: '100vh' }
        } > < /div>
    );
}