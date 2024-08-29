import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AnnotationDialog from "../Annotation";
import EditIcon from "@mui/icons-material/Edit";
import { useLoader } from "../../contexts/LoaderContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import API_ROUTES from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/ApiRequest";

const Home = () => {
  const navigate = useNavigate(),
    { showSnackbar } = useSnackbar(),
    { setLoading } = useLoader(),
    [userData, setUserData] = useState({
      avatar: "",
      bio: "Your bio goes here...",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }),
    [openPopup, setOpenPopup] = useState({ popUp: false, bio: "" });

  const handleAnnotationChange = (event) => {
      setOpenPopup((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }));
    },
    handleAnnotationSubmit = async () => {
      if (openPopup.bio.length > 500) {
        showSnackbar("User Bio must be at most of 500 characters", "error");
        return;
      }
      setLoading(true);
      try {
        const firstName = localStorage.getItem("authUser"),
          userBio = openPopup.bio,
          response = await post(API_ROUTES.UPDATE_USER, {
            firstName,
            userBio,
          });
        if (response.success) {
          localStorage.setItem("authBio", userBio);
          showSnackbar(response.message, "success");
          setUserData((prevData) => ({ ...prevData, bio: userBio }));
          setOpenPopup((prevState) => ({
            ...prevState,
            popUp: false,
            bio: "",
          }));
          return true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(error.response?.data?.message, "error");
        return false;
      } finally {
        setLoading(false);
      }
    },
    handleOpenPopup = () => {
      setOpenPopup((prevState) => ({
        ...prevState,
        popUp: true,
        bio: localStorage.getItem("authBio"),
      }));
    },
    handleClose = () => {
      setOpenPopup((prevState) => ({
        ...prevState,
        popUp: false,
        bio: "",
      }));
    };

  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png" && file.size <= 1 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setUserData((prevData) => ({
          ...prevData,
          avatar: e.target.result,
        }));
        await postUserAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      showSnackbar(
        "Please upload a valid PNG image (max size of 1MB).",
        "error"
      );
    }
  };

  const postUserAvatar = async (userAvatar) => {
    try {
      const firstName = localStorage.getItem("authUser"),
        response = await post(API_ROUTES.UPDATE_USER, {
          firstName,
          userAvatar,
        });
      if (response.success) {
        localStorage.setItem("authAvatar", userAvatar);
        showSnackbar(response.message, "success");
        return true;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar(error.response?.data?.message, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("authID");
    if (userID === null || userID === undefined) {
      navigate("/login");
      return;
    } else
      setUserData((prevData) => ({
        ...prevData,
        avatar: localStorage.getItem("authAvatar"),
        bio: localStorage.getItem("authBio"),
        firstName: localStorage.getItem("authUser"),
        lastName: localStorage.getItem("authUserLastName"),
        email: localStorage.getItem("authEmail"),
        phone: localStorage.getItem("authPhone"),
      }));
  }, [navigate]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 2,
          gap: "0.4em",
        }}
      >
        Navigate to:
        <Link
          onClick={() => handleNavigate("/new-video")}
          sx={{ cursor: "pointer" }}
        >
          New Video
        </Link>
        <Link
          onClick={() => handleNavigate("/my-videos")}
          sx={{ cursor: "pointer" }}
        >
          My Videos
        </Link>
        <Link
          onClick={() => handleNavigate("/listings")}
          sx={{ cursor: "pointer" }}
        >
          Listings
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
          }}
        >
          <Box sx={{ position: "relative", marginBottom: 2 }}>
            <Avatar
              src={userData.avatar}
              sx={{
                width: 150,
                height: 150,
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#f0e9a0",
                },
              }}
              component="label"
            >
              <EditIcon />
              <input
                type="file"
                hidden
                accept="image/png"
                onChange={handleAvatarChange}
              />
            </IconButton>
          </Box>
          <Typography variant="body1">
            {userData.bio}{" "}
            <IconButton
              sx={{
                backgroundColor: "#d1c2db",
                "&:hover": {
                  backgroundColor: "#c085e9",
                },
              }}
              onClick={handleOpenPopup}
              component="label"
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </Box>

        <Box sx={{ flex: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="First Name"
                secondary={userData.firstName}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={userData.lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={userData.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone" secondary={userData.phone} />
            </ListItem>
          </List>
        </Box>
      </Box>{" "}
      <AnnotationDialog
        openPopup={openPopup.popUp}
        handleAnnotationSubmit={handleAnnotationSubmit}
        annotation={openPopup.bio}
        handleAnnotationChange={handleAnnotationChange}
        close={handleClose}
      />
    </Container>
  );
};

export default Home;
