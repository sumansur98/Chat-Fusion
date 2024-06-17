import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack direction={"column"} width={w}>
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;

        const newMsgAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = onlineUsers.some((member) =>
          onlineUsers.includes(_id)
        );
        return (
          
            <ChatItem
              newMessageAlert={newMsgAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
              index={index}
            />
          
        );
      })}
    </Stack>
  );
};

export default ChatList;
