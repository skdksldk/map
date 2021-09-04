import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import KakaoMap from './components/KakaoMap';

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
        KakaoMap district = { district }
        userLocation = { userLocation }
        /> <
        /div>
    );
}

export default App;