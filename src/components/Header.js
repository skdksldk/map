import React, { useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const Nav = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Lato', sans-serif;
  padding: 0 60px;
  height: 100px;
`;

const NavTool = styled.div `
  display: flex;
  align-items: center;
  margin-left: -180px;
`;

const Logo = styled.a `
  font-family: 'Suez One', serif;
  font-size: 1.8rem;
`;


const SearchInput = styled.input `
  background-color: transparent;
  outline: 0;
  border-width: 0 0 2px;
  width: 170px;
  height: 30px;
`;

const SearchBtn = styled.button `
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  width: 100px;
  height: 30px;
  &:hover {
    color: #548687;
  }
`;

const SwitchContainer = styled.div `
  display: flex;
  align-items: center;
  p {
    font-size: 0.8rem;
  }
`;

const MyLocation = styled.button `
  font-weight: 900;
  border-radius: 20px;
  width: 180px;
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: #a8dba8;
  }
`;

const Header = ({ onSearch, onLocation, onThemeColor }) => {
    const theme = useContext(ThemeContext);
    const inputElement = useRef(null);

    const onSubmit = e => {
        e.preventDefault();
        const value = inputElement.current.value;
        onSearch(value);
    };

    const onKeyPress = e => {
        if (e.keyCode === 13) {
            const value = inputElement.current.value;
            onSearch(value);
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                onLocation(lat, lng);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return ( <
        >
        <
        Nav >
        <
        Logo href = '/' > SeoulWifi < /Logo> <
        NavTool >
        <
        MyLocation onClick = { getCurrentLocation } > MY LOCATION < /MyLocation> <
        /NavTool> <
        /Nav> <
        />
    );
};

export default Header;