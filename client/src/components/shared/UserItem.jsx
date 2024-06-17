import { IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon } from "@mui/icons-material";

const UserItem = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={"100%"}>
        <Avatar />

        <Typography>{name}</Typography>

        <IconButton onClick={() => handler(_id)} disabled={handlerIsLoading}>
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
