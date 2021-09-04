import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import KakaoMap from './components/KakaoMap';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle `
  body {
    margin: 0 auto;
  }
  a {
  text-decoration: none;
  }
  button {
    border: none;
    outline: none;
    text-align: center;
  }
`;

function App() {
    const [district, setDistrict] = useState('');
    const [userLocation, setUserLocation] = useState({
        lat: 0,
        lng: 0,
    });


    return (

        <
        div >
        <
        GlobalStyle / >
        <
        Header / >
        <
        KakaoMap district = { district }
        userLocation = { userLocation }
        /> < /
        div >
    );
}

export default App;