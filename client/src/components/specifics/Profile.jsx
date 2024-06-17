import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react';
import { 
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon
 } from "@mui/icons-material";
 import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
        <Avatar 
        sx={{
            width:200,
            height:200,
            objectFit:'contain',
            marginBottom:'1rem',
            border:'5px solid white'
        }}/>
        <ProfileCard text="asfasdf" heading="Bio" />
        <ProfileCard text="sumansur" heading="UserName" Icon={<UserNameIcon/>}/>
        <ProfileCard text="Suman Sur" heading="Name" Icon={<FaceIcon/>}/>
        <ProfileCard text={moment().format('YYYY-MM-DD')} heading="Joined" Icon={<CalendarIcon/>}/>
    </Stack>
  )
}


const ProfileCard = ({text, heading, Icon}) => {
  return (
    <Stack
    direction={'row'}
    alignItems={'center'}
    spacing={'1rem'}
    color={'white'}
    textAlign={'center'}>
        {Icon && Icon}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={'gray'} variant='caption'>{heading}</Typography>
        </Stack>

    </Stack>
  )
}

export default Profile