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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin((prev) => (prev = !prev));
  };

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        username: userName,
        password: password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
      )

      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }

  const handleSignUp = (e) => {
    e.preventDefault();
  }

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
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="UserName"
                  margin="normal"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></TextField>

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} margin={"auto"} width={"10rem"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                  ></Avatar>
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "rgb(255,255,255)",
                      bgcolor: "rgb(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgb(0,0,0,0.7)",
                      },
                    }}
                    component={"label"}
                  >
                    <CameraAltIcon></CameraAltIcon>
                    <VisuallyHiddenInput type="file" />
                  </IconButton>
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></TextField>

                <TextField
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></TextField>

                <TextField
                  required
                  fullWidth
                  label="UserName"
                  margin="normal"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></TextField>

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Login;
