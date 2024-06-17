import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

const users = [1,2,3]

const Search = () => {
  const [search, setSearch] = useState("");

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
              <ListItem>
                <ListItemText></ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
