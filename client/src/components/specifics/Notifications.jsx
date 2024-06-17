/* eslint-disable react/display-name */
import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/SampleData'

const Notifications = () => {

  const friendRequestHandler = ({ _id, accept }) => {

  }

  return (
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((i) => (
              <NotificationItem sender={i.sender} _id={i._id} key={i._id} handler={friendRequestHandler} />
            ))
          ) : (
            <Typography textAlign={'center'}>0 Notifications</Typography>
          )
        }

      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={"100%"}>
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            width: "100%"
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction={{
          xs : 'column',
          sm : 'row'
        }}>
          <Button onClick={()=>handler({_id, accept:true})}>Accept</Button>
          <Button color='error' onClick={()=>handler({_id, accept:false})}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})

export default Notifications