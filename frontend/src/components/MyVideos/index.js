import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { get } from "../../services/ApiRequest";
import { useLoader } from "../../contexts/LoaderContext";
import API_ROUTES from "../../constants/apiRoutes";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useLocation, useNavigate } from "react-router-dom";
import DataPopup from "../VideoPopUp";

const columns = [
  { id: "no", label: "No.", width: 50 },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "actions", label: "Actions", width: 70 },
];

const MyVideos = () => {
  const navigate = useNavigate(),
    location = useLocation(),
    [rows, setRows] = useState([]),
    { setLoading } = useLoader(),
    { showSnackbar } = useSnackbar(),
    [currentUser, setCurrentUser] = useState(true),
    [popUpData, setPopUpData] = useState({ open: false, title: "", link: "" });

  const fetchData = useCallback(
    async (userID) => {
      setLoading(true);
      try {
        const response = await get(`${API_ROUTES.MY_VIDEOS}/${userID}`);
        setRows(response.data === null ? [] : response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(error.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, showSnackbar]
  );

  useEffect(() => {
    const userID = localStorage.getItem("authID");
    if (typeof userID !== "string") {
      navigate("/login");
      return;
    } else {
      const searchParams = new URLSearchParams(location.search),
        otherUserID = searchParams.get("userID");
      otherUserID !== null && otherUserID !== userID && setCurrentUser(false);
      fetchData(otherUserID ?? userID);
    }
  }, [fetchData, navigate, location.search]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handlePopUpClose = () => {
    setPopUpData((prevData) => ({
      ...prevData,
      open: false,
      title: "",
      link: "",
    }));
  };

  const handlePopUp = (title, link) => {
    setPopUpData((prevData) => ({
      ...prevData,
      open: true,
      title,
      link,
    }));
  };

  return (
    <Paper
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 2,
          gap: "0.4em",
          width: "100%",
          maxWidth: "50em",
          paddingRight: "0.25em",
          paddingLeft: "0.25em",
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
          onClick={() => handleNavigate("/new-video")}
          sx={{ cursor: "pointer" }}
        >
          New Video
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
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "0.25em",
          paddingLeft: "0.25em",
          paddingTop: "0.25em",
          width: "100%",
          maxWidth: "50em",
        }}
      >
        <Typography variant="h6">
          {currentUser ? "My" : "User"} Videos:-
        </Typography>
      </Box>{" "}
      <TableContainer
        className="view-users-table"
        component={Paper}
        sx={{
          flex: 1,
          overflow: "auto",
          maxWidth: "50em",
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            minWidth: "31.25em",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    width:
                      column.id === "name"
                        ? "auto"
                        : column.id === "email"
                        ? "100px"
                        : column.width ?? "auto",
                    flex: column.id === "email" ? 1 : column.width ? "none" : 1,
                    whiteSpace: column.id === "name" ? "nowrap" : "normal",
                    padding: "0.5em 1em",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!rows.length && (
              <TableRow key={"no-data"}>
                <TableCell>-</TableCell>
                <TableCell>No Data Available</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            )}
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "0.5em 1em" }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: "0.5em 1em" }}>{row.title}</TableCell>
                <TableCell sx={{ padding: "0.5em 1em" }}>
                  {row.description}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0.5em 1em",
                    textAlign: "center",
                    cursor: "pointer",
                    "& .user-videos-thumbnail": {
                      width: "3.75em",
                      height: "2.5em",
                    },
                  }}
                  onClick={() => handlePopUp(row.title, row.fileName)}
                >
                  <img
                    src={row.thumbnail}
                    className="user-videos-thumbnail"
                    alt="img"
                  ></img>
                  <br />
                  <Typography
                    sx={{
                      color: "blue",
                      fontSize: "0.875em",
                    }}
                  >
                    Play
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DataPopup
        open={popUpData.open}
        onClose={() => {}}
        title={popUpData.title}
        link={popUpData.link}
        closeOption={handlePopUpClose}
      ></DataPopup>
    </Paper>
  );
};

export default MyVideos;
