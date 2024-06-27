import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
//import CameraAltIcon from "@mui/icons-material/CameraAlt";
//import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

const isAdmin = true;


const AdminLogin = () => {

  const [secretKey, setSecretKey] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('form submitted')
  }

  if(isAdmin) return <Navigate to={'/admin/dashboard'}></Navigate>

  return (
    <>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >

            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            ></TextField>

            <Button
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>

        </Paper>
      </Container>
    </>
  );
}

export default AdminLogin