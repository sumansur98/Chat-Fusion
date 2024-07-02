import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoghnutChart, LineChart } from '../../components/specifics/Charts'

const Dashboard = () => {
  return (
    <AdminLayout>
      <AppBar />

      <Stack direction={'row'} spacing={'2rem'} flexWrap={'wrap'} margin={'2rem'}>
        <Paper
          elevation={3}
          sx={{
            padding: '2rem 3.5rem',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '45rem'
          }}
        >
          <Typography margin={'2rem 0'} variant='h4'>Last Messages</Typography>
          <LineChart value={[1,2,3,4,5]}/>
        </Paper>

        <Paper elevation={3}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%" },
            position: "relative",
            width: "100%",
            maxWidth: "25rem",
          }}>
          <DoghnutChart labels={['Single Chat', 'Group Chat']} value={[20,80]}/>

          <Stack position={"absolute"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"0.5rem"}
            width={"100%"}
            height={"100%"}>
            <GroupIcon />
            <Typography>Vs</Typography>
            <PersonIcon />
          </Stack>
        </Paper>
      </Stack>

      <Widgets />
    </AdminLayout >
  )
}

const AppBar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem',
        borderRadius: '1rem'
      }}>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
        <SearchField />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography sx={{
          display: {
            xs: 'none',
            lg: 'block'
          }
        }} textAlign={'center'} color={'rgba(0,0,0,0.7)'}>{moment().format('dddd, D MMMM YYYY')}</Typography>
        <NotificationsIcon />
      </Stack>

    </Paper>
  )
}

const Widgets = () => {
  return (
    <Stack direction={{
      xs: 'column',
      sm: 'row'
    }}
      spacing={'2rem'}
      justifyContent={'space-between'}
      alignItems={'center'}
      margin={'2rem 0'}>
      <WidgetItem title='Users' value={34} Icon={<PersonIcon />} />
      <WidgetItem title='Chats' value={3} Icon={<GroupIcon />} />
      <WidgetItem title='Messages' value={321} Icon={<MessageIcon />} />
    </Stack>
  )
}

const WidgetItem = ({ title, value, Icon }) => {
  return (
    <Paper sx={{
      padding : '2rem',
      margin : '2rem 0',
      borderRadius:'1rem',
      width :'20rem'
    }}>
      <Stack alignItems={'center'} spacing={'1rem'}>
        <Typography sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid black`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>{value}</Typography>
        <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Dashboard