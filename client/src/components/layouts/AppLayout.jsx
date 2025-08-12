/* eslint-disable react/display-name */
import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specifics/ChatList";
import { sampleChats } from "../../constants/SampleData";
import { useParams } from "react-router-dom";
import Profile from "../specifics/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hooks";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const dispatch = useDispatch();
    const {isMobile} = useSelector((state) => state.misc);
    const {user} = useSelector((state) => state.auth)
    const {isLoading, data, isError,error,refetch} = useMyChatsQuery("");

    useErrors([{isError, error}])
    

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delete chat ", _id, groupChat);
    };

    const handleCloseDrawer = () => {
      console.log("close drawer");
      dispatch(setIsMobile(false));
    }

    return (
      <div>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleCloseDrawer}>
            <ChatList
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

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
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
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
            <Profile user={user}/>
          </Grid>
        </Grid>

        <div>Footer</div>
      </div>
    );
  };
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
