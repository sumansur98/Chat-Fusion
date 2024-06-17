import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/SampleData";


const users = [1,2,3]

const Search = () => {
  const [search, setSearch] = useState("");

  const addFriendHandler = (id) => {
    console.log(id)
  }

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers)

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} alignItems={"center"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment : (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        ></TextField>

        <List>
          {
            users.map(user => (
             <UserItem user={user} key={user._id}
             handler={addFriendHandler}
             handlerIsLoading={isLoadingSendFriendRequest}/>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
