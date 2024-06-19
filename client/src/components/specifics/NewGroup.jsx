import React, {useState} from 'react';
import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../shared/UserItem';


const NewGroup = () => {
  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([])

  console.log(selectedMembers);

  const selectMemberHandler = (id) => {
    setSelectedMembers(prev => {
      return prev.includes(id) ? prev.filter(curr => curr!==id) : [...prev, id]
    })
  }

  const submitHandler = () => {

  }

  const closeHandler = () => {

  }

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
        <TextField label={'Group Name'} value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            members.map(user => (
              <UserItem user={user} key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
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