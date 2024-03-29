import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import logo from "./../../Components/assest/LogoNew.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SwipeableTextMobileStepper from "../slider";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [show, setShow] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOtp = () => {
    // console.log(Name,'moj',Mobile);
    setIsOtpSend(true);

    if (userName.toString().length == 10) {
      const api_key =
        "EPBBGGhzN7H00yRcYQdAMksCSbamLEyj0rmHeDgLRSfUWMQ8JM5I5jouxI8q";
      let genOtp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      sessionStorage.setItem("otp", genOtp + 1);
      axios
        .get(
          `https://www.fast2sms.com/dev/bulkV2?authorization=${api_key}&variables_values=${genOtp}&route=otp&numbers=${userName}`
        )
        .then((res) => {
          alert(`otp send to ${userName}`);
          console.log(res);
        });
    }
  };

  const handleVerifyOtp = () => {
    console.log("inside handleVerifyOtp");
    let reOtp = sessionStorage.getItem("otp") - 1;
    if (otp == reOtp) {
      setShow(false);
      setIsError(false);
      setIsVerified(true);
    } else {
      setIsError(true);
    }
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  return isMobile ? (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/home">
        {" "}
        <img
          src={logo}
          alt="logo"
          style={{ height: "150px", width: "250px", cursor: "pointer" }}
        />
      </Link>
      <br />

      <Box display={"flex"} mb={3} gap={1} pl={2}>
        <PersonOutlineIcon style={{ fontSize: 30, color: "#004c3d" }} />
        <Typography fontSize={18}>Forgot Password </Typography>
      </Box>

      <Box component="form" display={"grid"} gap={3} p={2}>
        <Box display={"flex"} gap={2}>
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            id="outlined-multiline-flexible"
            label="User name"
            sx={{ width: "69%" }}
          />

          <Button
            disabled={!userName.length}
            onClick={handleSendOtp}
            sx={{
              backgroundColor: "#004c3d",
              borderRadius: "4px",
              color: "white",
              p: 1.2,
              fontSize: 14,
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#004c3d",
                borderRadius: "4px",
                color: "black",
                p: 1.2,

                fontWeight: 600,
              },
            }}
          >
            Send OTP
          </Button>
        </Box>
        {isOtpSend && (
          <Box display={"flex"} gap={2}>
            <TextField
              onChange={(e) => setOtp(e.target.value)}
              id="outlined-multiline-flexible"
              label="Enter Otp"
              sx={{ width: "69%" }}
            />

            <Button
              onClick={handleVerifyOtp}
              disabled={!otp.length}
              sx={{
                backgroundColor: "#004c3d",
                borderRadius: "4px",
                color: !isError ? "green !important" : "white !important",
                width: "31%",
                p: 1.2,
                pr: 4,
                pl: 4,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#004c3d",
                  borderRadius: "4px",
                  color: "black",
                  p: 1.2,
                  pr: 4,
                  pl: 4,
                  fontWeight: 600,
                },
              }}
            >
              Verifiy
            </Button>
          </Box>
        )}
        {isVerified ? (
          <Typography
            fontSize={14}
            display={"flex"}
            mt={-3}
            ml={0.3}
            color={"green"}
          >
            Verified
          </Typography>
        ) : null}
        {isError && (
          <Typography
            fontSize={14}
            display={"flex"}
            mt={-3}
            ml={0.3}
            color={"red"}
          >
            Invalid OTP
          </Typography>
        )}

        <TextField
          id="outlined-textarea"
          onChange={(e) => setPassword(e.target.value)}
          disabled={show}
          label="Password"
        />
        <TextField
          id="outlined-textarea"
          onChange={(e) => setComfirmPassword(e.target.value)}
          disabled={show}
          label=" Confirm Password"
        />
        {confirmPassword && confirmPassword.length > 0 && (
          <Typography
            fontSize={14}
            display={"flex"}
            mt={-3}
            ml={0.3}
            color={password === confirmPassword ? "green" : "red"}
          >
            {password === confirmPassword ? "Matched" : "Not Matched"}
          </Typography>
        )}
      </Box>

      <Box>
        <Button
          disabled={show}
          sx={{
            backgroundColor: "#004c3d",
            borderRadius: "4px",
            color: "white",
            mt: 4,
            p: 1.2,
            pr: 8,
            pl: 8,
            fontWeight: 600,

            "&:hover": {
              mt: 4,
              p: 1.2,
              pr: 8,
              fontWeight: 600,
              pl: 8,
              backgroundColor: "white",
              border: "1px solid #004c3d",
              color: "#004c3d",
              borderRadius: "4px",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx6pqf2yUuWJvEkpuJ2oSxYNNalUgTrTA2qzBN08V&s)",
      }}
    >
      <Box>
        <SwipeableTextMobileStepper />
      </Box>
      <Box
        sx={{
          maxWidth: 500,
          backgroundColor: "white",
          boxShadow: "1.05975px 4.23898px 7.97545px 4.43081px rgb(0 0 0 / 10%)",
          border: "1.05975px solid rgba(9, 54, 121, 0.1)",
          p: 4,
          width: "100%",
          mr: 13,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/home">
          {" "}
          <img
            src={logo}
            alt="logo"
            style={{ height: "100px", cursor: "pointer" }}
          />
        </Link>

        <br />
        <br />
        <br />

        <Box display={"flex"} mb={3} gap={1}>
          <PersonOutlineIcon style={{ fontSize: 30, color: "#004c3d" }} />
          <Typography fontSize={18}>Forgot Password </Typography>
        </Box>

        <Box
          component="form"
          // onSubmit={handleSubmit}
          display={"grid"}
          gap={3}
        >
          <Box display={"flex"} gap={2}>
            <TextField
              onChange={(e) => setUserName(e.target.value)}
              id="outlined-multiline-flexible"
              label="User name"
              sx={{ width: "69%" }}
            />

            <Button
              disabled={!userName.length}
              onClick={handleSendOtp}
              sx={{
                backgroundColor: "#004c3d",
                borderRadius: "4px",
                width: "31%",
                color: "white",
                p: 1.2,
                pr: 4,
                pl: 4,
                fontWeight: 600,

                "&:hover": {
                  backgroundColor: "#004c3d",
                  borderRadius: "4px",
                  color: "black",
                  p: 1.2,
                  pr: 4,
                  pl: 4,
                  fontWeight: 600,
                },
              }}
            >
              Send OTP
            </Button>
          </Box>
          {isOtpSend && (
            <Box display={"flex"} gap={2}>
              <TextField
                onChange={(e) => setOtp(e.target.value)}
                id="outlined-multiline-flexible"
                label="Enter Otp"
                sx={{ width: "69%" }}
              />

              <Button
                onClick={handleVerifyOtp}
                disabled={!otp.length}
                sx={{
                  backgroundColor: "#004c3d",
                  borderRadius: "4px",
                  color: !isError ? "green !important" : "white !important",
                  width: "31%",
                  p: 1.2,
                  pr: 4,
                  pl: 4,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#004c3d",
                    borderRadius: "4px",
                    color: "black",
                    p: 1.2,
                    pr: 4,
                    pl: 4,
                    fontWeight: 600,
                  },
                }}
              >
                Verifiy
              </Button>
            </Box>
          )}
          {isVerified ? (
            <Typography
              fontSize={14}
              display={"flex"}
              mt={-3}
              ml={0.3}
              color={"green"}
            >
              Verified
            </Typography>
          ) : null}
          {isError && (
            <Typography
              fontSize={14}
              display={"flex"}
              mt={-3}
              ml={0.3}
              color={"red"}
            >
              Invalid OTP
            </Typography>
          )}

          <TextField
            id="outlined-textarea"
            onChange={(e) => setPassword(e.target.value)}
            disabled={show}
            label="Password"
          />
          <TextField
            id="outlined-textarea"
            onChange={(e) => setComfirmPassword(e.target.value)}
            disabled={show}
            label=" Confirm Password"
          />
          {confirmPassword && confirmPassword.length > 0 && (
            <Typography
              fontSize={14}
              display={"flex"}
              mt={-3}
              ml={0.3}
              color={password === confirmPassword ? "green" : "red"}
            >
              {password === confirmPassword ? "Matched" : "Not Matched"}
            </Typography>
          )}
        </Box>

        <Box>
          <Button
            disabled={show}
            sx={{
              backgroundColor: "#004c3d",
              borderRadius: "4px",
              color: "white",
              mt: 4,
              p: 1.2,
              pr: 8,
              pl: 8,
              fontWeight: 600,

              "&:hover": {
                mt: 4,
                p: 1.2,
                pr: 8,
                fontWeight: 600,
                pl: 8,
                backgroundColor: "white",
                border: "1px solid #004c3d",
                color: "#004c3d",
                borderRadius: "4px",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
