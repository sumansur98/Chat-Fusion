import React, { useRef } from "react";
import AppLayout from "../components/layouts/AppLayout";
import { Stack } from "@mui/material";

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
      </Stack>

      <form style={{ height: "10%" }}>
        
      </form>
    </>
  );
};

export default AppLayout()(Chat);
