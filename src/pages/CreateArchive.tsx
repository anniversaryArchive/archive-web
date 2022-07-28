import React, { useState } from "react";
import { CREATE_ARCHIVE } from "../apollo/gql/archive.gql";
import { Archive } from "../types/archive"
import { useMutation } from "@apollo/client";
import { FormControl, Box, Grid, Button, TextField, Typography } from "@mui/material";
import DaumPostcode from "react-daum-postcode";

import "./CreateArchive.css";

const { kakao } = window;

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

  function onClickSearchPost() {
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

  async function getLatLngFromAddress (address: String): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          const lat = result[0].y;
          const lng = result[0].x;
          resolve({ lat: Number(lat), lng: Number(lng) });
        }
        reject();
      });
    });
  }

  function onChangeArchiveValue (key: string, value: string) {
    setArchive((archive) => ({ ... archive, [key]: value || '' }));
  }

  async function createArchive (e: any) {
    e.preventDefault();

    const requireFields = ['address', 'archiveName', 'themeName', 'startDate', 'endDate'];
    const validation = requireFields.some((field: string) => !(archive as any)[field]);
    if (validation) { return; }

    const newArchive: Archive = archive;

    try {
      const { lat, lng } = await getLatLngFromAddress(archive.address);
      newArchive.lat = lat;
      newArchive.lng = lng;
    } catch (error) { throw error; }

    addArchive({ variables: { input: newArchive } });
    console.log('create archive : ', newArchive);
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

          {/* 카페 이름 입력 */}
          <TextField label="카페 이름" value={archive.archiveName || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} error={!archive.archiveName}
            onChange={(e) => onChangeArchiveValue('archiveName', e.target.value)} />

          {/* 카페 테마 이름 입력 */}
          <TextField label="카페 테마 이름" value={archive.themeName || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} error={!archive.themeName}
            onChange={(e) => onChangeArchiveValue('themeName', e.target.value)} />

          {/* 주최자 트위터 아이디 입력 */}
          <TextField label="주최자 트위터 아이디" value={archive.organizer || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true}
            onChange={(e) => onChangeArchiveValue('organizer', e.target.value)} />

          {/* 카페 시작 일자 */}
          <TextField label="시작 일자" type="date" value={archive.startDate || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} error={!archive.startDate}
            onChange={(e) => onChangeArchiveValue('startDate', e.target.value)} />

          {/* 카페 종료 일자 */}
          <TextField label="종료 일자" type="date" value={archive.endDate || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} error={!archive.endDate}
            onChange={(e) => onChangeArchiveValue('endDate', e.target.value)} />

          {/* 번호 입력 */}
          <TextField label="전화번호" value={archive.phoneNumber || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} onChange={(e) => onChangeArchiveValue('phoneNumber', e.target.value)} />

          {/* 공지 Link */}
          <TextField label="Link" value={archive.link || ''}
            InputProps={inputProps} InputLabelProps={inputLabelProps}
            fullWidth={true} onChange={(e) => onChangeArchiveValue('link', e.target.value)} />

          <Button variant="contained" type="submit" fullWidth={true}>생성</Button>
        </FormControl>
      </Box>
    </>
  );
}

export default CreateArchive;