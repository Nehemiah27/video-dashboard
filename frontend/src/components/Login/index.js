import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { post } from "../../services/ApiRequest";
import API_ROUTES from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../contexts/LoaderContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { userRegex } from "../../constants/Variables";

const LoginPage = () => {
  const [firstName, setFirstName] = useState(""),
    { setLoading } = useLoader(),
    { showSnackbar } = useSnackbar(),
    [password, setPassword] = useState(""),
    [showPassword, setShowPassword] = useState(false),
    navigate = useNavigate(),
    token = localStorage.getItem("authToken");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userRegex.NAME_REGEX.test(firstName)) {
      showSnackbar("Invalid First Name format", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await post(API_ROUTES.LOGIN, {
        firstName: firstName,
        password,
      });
      if (response.success) {
        showSnackbar(response.message, "success");
        localStorage.setItem("authToken", response.data.accessToken);
        localStorage.setItem("authUser", response.data.firstName);
        localStorage.setItem("authUserLastName", response.data.lastName);
        localStorage.setItem("authEmail", response.data.email);
        localStorage.setItem("authID", response.data.userID);
        localStorage.setItem("authPhone", response.data.phone);
        localStorage.setItem("authAvatar", response.data.userAvatar);
        localStorage.setItem("authBio", response.data.userBio);
        navigate("/home");
      }
    } catch (error) {
      showSnackbar(error.response?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (String(token).length > 12) navigate("/home");
  }, [token, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = () => {
    navigate("/sign-up");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        padding: 4,
        width: "100%",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          fullWidth
          error={firstName !== "" && !userRegex.NAME_REGEX.test(firstName)}
          helperText={
            firstName !== "" && !userRegex.NAME_REGEX.test(firstName)
              ? "Invalid First Name"
              : ""
          }
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={password !== "" && !userRegex.PASSWORD_REGEX.test(password)}
          helperText={
            password !== "" && !userRegex.PASSWORD_REGEX.test(password)
              ? "Password must contain at least 8 characters"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <Typography
          variant="body2"
          sx={{
            textAlign: "right",
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={handleCreateAccount}
        >
          Create New Account?
        </Typography>
        <Typography sx={{ width: "100%", textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: "0.75em 1.5em",
              marginTop: 2,
            }}
          >
            Login
          </Button>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginPage;
