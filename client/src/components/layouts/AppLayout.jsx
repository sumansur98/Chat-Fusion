/* eslint-disable react/display-name */
import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specifics/ChatList";
import { samepleChats } from "../../constants/SampleData";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", md: "block" },
            }}
            height={"100%"}
          >
            <ChatList
              chats={samepleChats}
              chatId={"1"}
              onlineUsers={["1", "2"]}
              newMessagesAlert={[
                {
                  chatId: "1",
                  count: 4,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height={"100%"}
          >
            Third
          </Grid>
        </Grid>

        <div>Footer</div>
      </div>
    );
  };
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
