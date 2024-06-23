import React, { useRef } from "react";
import AppLayout from "../components/layouts/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import { orange } from "@mui/material/colors";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMsgs } from "../constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id : 'asdfasdfsadf',
  name : 'Suman Sur'
}

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"gray"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* messages rendered here*/}
        {
          sampleMsgs.map(i => (
            <MessageComponent message={i} user={user}></MessageComponent>
          ))
        }
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton 
          sx={{
            position : 'absolute',
            left : '1.5rem'
          }}>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type message here" />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: 'orange',
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',
              "&:hover": {
                bgcolor: 'error.dark'
              }
            }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
