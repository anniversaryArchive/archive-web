import React, { useState } from "react";
import { FormControl, Grid, Button, TextField } from "@mui/material";
import { Archive } from "../types/archive"
import DaumPostcode from "react-daum-postcode";

const { kakao } = window;

function CreateArchive() {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [archive, setArchive] = useState<Archive>({} as Archive);

  function onClickSearchPost() {
    console.log('chloe test on click search');
    setOpenPostcode(true);
  }

  // 주소 선택 이벤트
  function selectAddress (data: { address: string }) {
    setArchive((archive) => ({
      ... archive,
      address: data.address
    }));
    
    setOpenPostcode(false);
  }

  async function getLatLngFromAddress (address: String) {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          const lat = result[0].y;
          const lng = result[0].x;
          resolve({ lat, lng });
        }
        reject();
      });
    });
  }

  return (
    <>
      <FormControl>
        {/* 주소 입력 */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField label="Input Address ... "
              InputProps={{ style: { color: '#fff' } }} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={onClickSearchPost}>주소 검색</Button>
          </Grid>
          {openPostcode && <DaumPostcode 
            onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
          />}
          <Grid item xs={12}>
            {archive.address && <TextField
              label="상세 주소 .."
              InputProps={{ style: { color: '#fff' } }} />}
          </Grid>
        </Grid>

        {/* 카페 이름 입력 */}

        {/* 카페 테마 이름 입력 */}

        {/* 주최자 트위터 아이디 입력 */}

        {/* 카페 시작 일자 */}

        {/* 카페 종료 일자 */}

        {/* 번호 입력 */}

        {/* 공지 Link */}
      </FormControl>
    </>
  );
}

export default CreateArchive;