import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { post } from "../../services/ApiRequest";
import { useLoader } from "../../contexts/LoaderContext";
import API_ROUTES from "../../constants/apiRoutes";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import DataPopup from "../VideoPopUp";

const columns = [
  { id: "no", label: "No.", width: 50 },
  { id: "name", label: "First Name" },
  { id: "videos", label: "Videos", width: 350 },
];

const Listings = () => {
  const [page, setPage] = useState(0),
    navigate = useNavigate(),
    [rows, setRows] = useState([]),
    { setLoading } = useLoader(),
    { showSnackbar } = useSnackbar(),
    [rowsPerPage, setRowsPerPage] = useState(10),
    [totalRecords, setTotalRecords] = useState(0),
    [searchQuery, setSearchQuery] = useState(""),
    [popUpData, setPopUpData] = useState({ open: false, title: "", link: "" });

  const fetchData = useCallback(
    async (query, page, rowsPerPage) => {
      setLoading(true);
      try {
        const response = await post(API_ROUTES.VIEW_USERS, {
          currentPage: page + 1,
          totalRecordsPerPage: rowsPerPage,
          searchText: query,
        });
        setTotalRecords(response.data.totalRecords);
        setRows(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(error.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, showSnackbar]
  );

  const handleVideoPlay = (title, link) => {
      setPopUpData((prevData) => ({ ...prevData, title, link, open: true }));
    },
    handlePopUpClose = () => {
      setPopUpData((prevData) => ({
        ...prevData,
        open: false,
        title: "",
        link: "",
      }));
    };

  const handleNavigate = (path) => {
      navigate(path);
    },
    handleAllView = (userID) => {
      navigate(`/my-videos?userID=${userID}`);
    };

  useEffect(() => {
    fetchData(searchQuery, page, rowsPerPage);
  }, [searchQuery, page, rowsPerPage, fetchData]);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
    },
    handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setPage(0);
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
          onClick={() => handleNavigate("/my-videos")}
          sx={{ cursor: "pointer" }}
        >
          My Videos
        </Link>
      </Box>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "0.25em",
          paddingLeft: "0.25em",
          width: "100%",
          maxWidth: "50em",
        }}
      >
        <Typography variant="h6">Listings:-</Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "18.75em" }}
        />
      </Box>
      <TableContainer
        className="view-listings-table"
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
              </TableRow>
            )}
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "0.5em 1em" }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0.5em 1em",
                    "& .user-avatar-wrapper": {
                      display: "flex",
                      gap: "0.5em",
                      alignItems: "center",
                    },
                    "& .user-avatar-image": {
                      width: "3.75em",
                      height: "3.75em",
                      border: "0.063em solid #d5c4c4",
                      borderRadius: "2em",
                    },
                    "& .user-avatar-name": {
                      width: "3.75em",
                      height: "3.75em",
                      border: "0.063em solid #d5c4c4",
                      borderRadius: "2em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <div className="user-avatar-wrapper">
                    {row.userAvatar !== "" ? (
                      <img
                        className="user-avatar-image"
                        src={row.userAvatar}
                        alt="img"
                      ></img>
                    ) : (
                      <div className="user-avatar-name">
                        {row.firstName.charAt(0)}
                      </div>
                    )}{" "}
                    {row.firstName}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "0.5em 1em",
                    "& .user-five-images": {
                      display: "flex",
                      gap: "0.5em",
                      "& .view-video-thumbnail": {
                        width: "3.75em",
                        height: "3.75em",
                        cursor: "pointer",
                      },
                    },
                    "& .user-all-view": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {row.videos.length ? (
                    <>
                      <div className="user-five-images">
                        {row.videos.map((currentVideo, videoIndex) => {
                          return videoIndex <= 4 ? (
                            <img
                              className="view-video-thumbnail"
                              src={currentVideo.thumbnail}
                              alt="img"
                              onClick={() =>
                                handleVideoPlay(
                                  currentVideo.title,
                                  currentVideo.fileName
                                )
                              }
                            ></img>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                      <span
                        className="user-all-view"
                        onClick={() => handleAllView(row.userID)}
                      >
                        <strong>View all</strong>
                      </span>
                    </>
                  ) : (
                    "No Videos uploaded"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#f5f5f5",
          borderTop: "0.063em solid #a8a8a8",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </Box>
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

export default Listings;
