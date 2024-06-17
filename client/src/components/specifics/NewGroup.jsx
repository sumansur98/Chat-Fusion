import React, {useState} from 'react';
import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../shared/UserItem';


const NewGroup = () => {

  const selectMemberHandler = () => {

  }
  const submitHandler = () => {

  }

  const [groupName, setGroupName] = useState("")

  return (
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
        <TextField label={'Group Name'} value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            sampleUsers.map(user => (
              <UserItem user={user} key={user._id}
                handler={selectMemberHandler}
              />
            ))
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant='text' color='error' size='large'>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroup