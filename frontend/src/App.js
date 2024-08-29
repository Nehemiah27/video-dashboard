import Home from "./components/Home";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import { LoaderProvider, useLoader } from "./contexts/LoaderContext";
import Loader from "./components/Loader";
import SnackbarComponent from "./components/SnackBar";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import LoginPage from "./components/Login";
import MyVideos from "./components/MyVideos";
import AddUserForm from "./components/AddUser";
import AddVideoForm from "./components/AddVideo";
import Listings from "./components/Listings";

function App() {
  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey && event.deltaY !== 0) event.preventDefault();
    };
    window.addEventListener("wheel", preventZoom, { passive: false });
    return () => {
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);
  return (
    <>
      <Router>
        <LoaderProvider>
          <SnackbarProvider>
            <CssBaseline />
            <Header />
            <div className="dashboard-content">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route
                  path="/admin"
                  element={<Navigate to="/admin/view-users" />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/new-video" element={<AddVideoForm />} />
                <Route path="/my-videos" element={<MyVideos />} />
                <Route path="/sign-up" element={<AddUserForm />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <GlobalLoader />
            <SnackbarComponent />
          </SnackbarProvider>
        </LoaderProvider>
      </Router>
    </>
  );
}

const GlobalLoader = () => {
  const { loading } = useLoader();
  return loading ? <Loader /> : null;
};

export default App;
