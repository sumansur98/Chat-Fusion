import { Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { sampleNotifications } from '../../constants/SampleData'

const Notifications = () => {
  return (
    <Dialog open>
      <Stack p={{xs:'1rem', sm:'2rem'}} width={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ? (
            <></>
          ) : (
            <Typography textAlign={'center'}>0 Notifications</Typography>
          )
        }

      </Stack>
    </Dialog>
  )
}

export default Notifications