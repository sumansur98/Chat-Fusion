import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcon} from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'

const Dashboard = () => {
  return (
    <AdminLayout>
      <AppBar />
    </AdminLayout>
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
        <SearchField/>
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1}/>
        <Typography sx={{
          display:{
            xs:'none',
            lg:'block'
          }
        }} textAlign={'center'} color={'rgba(0,0,0,0.7)'}>{moment().format('dddd, D MMMM YYYY')}</Typography>
        <NotificationsIcon />
      </Stack>

    </Paper>
  )
}

export default Dashboard