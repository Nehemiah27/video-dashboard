import { useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRegex } from "../../constants/Variables";
import { useLoader } from "../../contexts/LoaderContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import API_ROUTES from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/ApiRequest";

const AddUserForm = () => {
  const { setLoading } = useLoader(),
    navigate = useNavigate(),
    { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required")
        .matches(
          userRegex.NAME_REGEX,
          "First Name must contain at least three letters"
        ),
      lastName: Yup.string()
        .required("Last Name is required")
        .matches(
          userRegex.NAME_REGEX,
          "Last Name must contain at least three letters"
        ),
      email: Yup.string()
        .required("Email is required")
        .matches(userRegex.EMAIL_REGEX, "Invalid email format"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          userRegex.PHONE_REGEX,
          "Phone number must be of exact 10 digits"
        ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await post(API_ROUTES.CREATE_USER, values);
        navigate("/login");
        showSnackbar(response.message, "success");
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(error.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const userID = localStorage.getItem("authID");
    if (typeof userID === "string") {
      navigate("/home");
      return;
    }
  }, [navigate]);

  return (
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
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ marginBottom: "1em" }}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ marginBottom: "1em" }}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ marginBottom: "1em" }}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          sx={{ marginBottom: "1.5em" }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default AddUserForm;
