import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/SampleData";
import { setIsSearch } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hooks";


const users = [1,2,3]

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {isSearch} = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const addFriendHandler = async(id) => {
    await sendFriendRequest("Sending Friend Request",{userId : id});
  }


  const [users, setUsers] = useState([])

  const handleSearchClose = () => dispatch(setIsSearch(false))

  useEffect(() => {

    const timeOutId = setTimeout(() => {
      searchUser(search)
      .then(({data}) => {
        console.log('received users',data)
        setUsers(data.users)
      })
      .catch(err => console.log(err));
    }, 1000);

    return () => clearTimeout(timeOutId)

  }, [search])
  

  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
      <Stack p={"2rem"} direction={"column"} alignItems={"center"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
