/* global kakao */
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";

const { kakao } = window;

const KaKaoMap = () => {
  const container = useRef<HTMLDivElement>(null);

  const initMap = () => {
    console.log(kakao);

    const center = new kakao.maps.LatLng(33.36256187769044, 126.52903781775196);
    const options = {
      center,
      level: 8,
    };
    new kakao.maps.Map(container.current, options);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <MapContainer id="KakaoMap" ref={container} />;
};

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default KaKaoMap;
