import { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRegex } from "../../constants/Variables";
import { useLoader } from "../../contexts/LoaderContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import API_ROUTES from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/ApiRequest";

const AddVideoForm = () => {
  const { setLoading } = useLoader(),
    navigate = useNavigate(),
    { showSnackbar } = useSnackbar(),
    [videoFile, setVideoFile] = useState(null),
    [thumbnail, setThumbnail] = useState(null),
    videoRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Video Title is required")
        .matches(
          userRegex.PASSWORD_REGEX,
          "Video Title must contain at least one character"
        ),
      description: Yup.string()
        .required("Video Description is required")
        .matches(
          userRegex.PASSWORD_REGEX,
          "Video Description must contain at least one character"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!videoFile) {
        showSnackbar("Please Choose a video to upload", "error");
        return;
      }
      if (thumbnail === null) {
        showSnackbar("Please wait while thumbnail is loading!", "error");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnail);
      try {
        const response = await post(API_ROUTES.UPLOAD_VIDEO, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setVideoFile(null);
        setThumbnail(null);
        resetForm();
        showSnackbar(response.message, "success");
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(error.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleVideoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type === "video/mp4" && file.size <= 6 * 1024 * 1024) {
      setVideoFile(file);
      generateThumbnail(file);
    } else {
      showSnackbar("Video must be an MP4 file and less than 6MB", "error");
      setVideoFile(null);
      setThumbnail(null);
    }
  };

  const generateThumbnail = (file) => {
    const url = URL.createObjectURL(file),
      videoElement = videoRef.current;
    videoElement.src = url;
    videoElement.currentTime = 2;
    videoElement.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/png"));
    };
  };
  useEffect(() => {
    const userID = localStorage.getItem("authID");
    if (typeof userID !== "string") {
      navigate("/login");
      return;
    }
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
          onClick={() => handleNavigate("/home")}
          sx={{ cursor: "pointer" }}
        >
          Profile
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
      <Paper
        elevation={3}
        sx={{
          padding: "2em",
          maxWidth: "25em",
          margin: "auto",
          marginTop: "2em",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "1em", textAlign: "center" }}
        >
          Upload New Video
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ marginBottom: "1em" }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            sx={{ marginBottom: "1em" }}
          />
          <input
            accept="video/mp4"
            type="file"
            onChange={handleVideoChange}
            style={{ display: "none" }}
            id="video-upload"
          />
          <label htmlFor="video-upload">
            <Button
              variant="contained"
              component="span"
              fullWidth
              sx={{
                marginBottom: "1em",
                backgroundColor: "white",
                borderColor: "gray",
                color: "gray",
                "&:hover": {
                  borderColor: "gray",
                  // color: "#f0e9a0",
                  backgroundColor: "#f0e9a0",
                },
              }}
            >
              Choose Video
            </Button>
          </label>
          {thumbnail && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "1em",
                gap: "1em",
                "& .add-video-thumbnail": {
                  maxWidth: "50%",
                  maxHeight: "12.5em",
                },
              }}
            >
              <img
                className="add-video-thumbnail"
                src={thumbnail}
                alt="Video thumbnail"
              />
              <Typography
                sx={{
                  wordBreak: "break-all",
                  whiteSpace: "normal",
                }}
              >
                {videoFile.name}
              </Typography>
            </Box>
          )}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
        <video ref={videoRef} style={{ display: "none" }}></video>
      </Paper>
    </Container>
  );
};

export default AddVideoForm;
