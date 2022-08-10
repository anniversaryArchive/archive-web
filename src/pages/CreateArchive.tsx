import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormControl, Box, Grid, Button, TextField, Typography } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import { CREATE_ARCHIVE } from "../apollo/gql/archive.gql";
import { Archive } from "../types/archive"

import "./CreateArchive.css";

const { kakao } = window;

// Archive Input Fields
const inputTypes: {
  key: string,
  label: string,
  required: boolean,
  type?: string,
}[] = [
  { key: 'archiveName', label: '카페 이름', required: true },
  { key: 'themeName', label: '카페 테마 이름', required: true },
  { key: 'organizer', label: '주최자 트위터 아이디', required: false },
  { type: 'date', key: 'startDate', label: '시작 일자', required: true },
  { type: 'date', key: 'endDate', label: '종료 일자', required: true },
  { key: 'phoneNumber', label: '전화번호', required: false },
  { key: 'link', label: 'Link', required: false },
];

// 주소를 받아 해당 주소의 좌표값을 반환하는 함수 
async function getLatLngFromAddress (address: String): Promise<{ lat: number, lng: number }> {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const lat = result[0].y;
        const lng = result[0].x;
        resolve({ lat: Number(lat), lng: Number(lng) });
        return;
      }
      reject();
    });
  });
}

function CreateArchive() {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [archive, setArchive] = useState<Archive>({} as Archive);
  const [detailedAddress, setDetailedAddress] = useState<string>('');
  const [addArchive] = useMutation(CREATE_ARCHIVE, {
    update (_, { data: { archive } }) {
      const success = !!archive;
      if (success) { setArchive((_) => ({} as Archive)); }
    }
  });


  // 주소 검색 버튼 클릭 시 
  function onClickSearchPost() {
    setOpenPostcode(!openPostcode);
  }

  // Daum post code 주소 선택 시
  function selectAddress (data: { address: string }) {
    setArchive((archive) => ({
      ... archive,
      address: data.address
    }));
    setOpenPostcode(false);
  }

  // Archive field TextField onChange 시 
  function onChangeArchiveValue (key: string, value: string) {
    setArchive((archive) => ({ ... archive, [key]: value || '' }));
  }

  async function createArchive (e: any) {
    e.preventDefault();

    const insufficient: boolean = inputTypes.some((field) => field.required && !(archive as any)[field.key]);
    if (insufficient) { return; }

    const newArchive: Archive = archive;
    try {
      const { lat, lng } = await getLatLngFromAddress(archive.address);
      newArchive.lat = lat;
      newArchive.lng = lng;
    } catch (error) { throw error; }
    newArchive.address = newArchive.address + detailedAddress;
    addArchive({ variables: { input: newArchive } });
  }

  const inputProps = { className: 'input-white' };
  const inputLabelProps = { sx: { color: '#fff' } };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ m: 2 }}
        component="form" onSubmit={createArchive}>
        <FormControl sx={{ width: '50vw' }}>
          {/* 주소 입력 */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography component="span" color="#fff">{archive.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={onClickSearchPost}>주소 검색</Button>
            </Grid>
            {openPostcode && <DaumPostcode onComplete={selectAddress} autoClose={false} />}
            <Grid item xs={12}>
              { archive.address && <TextField label="상세 주소" fullWidth={true}
                InputProps={inputProps} InputLabelProps={inputLabelProps}
                value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />}
            </Grid>
          </Grid>

          {
            inputTypes.map((inputType, index) => {
              return (<div key={`archive-input-${index}`}>
                <TextField type={inputType.type || 'text'} label={inputType.label}
                  value={(archive as any)[inputType.key] || ''}
                  InputProps={inputProps} InputLabelProps={inputLabelProps}
                  fullWidth={true} error={inputType.required && !(archive as any)[inputType.key]}
                  onChange={(e) => onChangeArchiveValue(inputType.key, e.target.value)} />
              </div>);
            })
          }

          <Button variant="contained" type="submit" fullWidth={true}>생성</Button>
        </FormControl>
      </Box>
    </>
  );
}

export default CreateArchive;