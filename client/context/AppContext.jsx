/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Cấu hình baseURL cho axios
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Tạo Context
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);        
  const [adminLoading, setAdminLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Hàm kiểm tra quyền admin
  const fetchIsAdmin = async () => {
    setAdminLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setIsAdmin(false);
        return;
      }
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(!!data.isAdmin);
    } catch (error) {
      setIsAdmin(false);
      console.error(error);
    } finally {
      setAdminLoading(false);
    }
  };

  // Lấy danh sách shows
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Lấy danh sách phim yêu thích
  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Khi load app, lấy shows
  useEffect(() => {
    fetchShows();
  }, []);

  // Khi user đổi, kiểm tra lại quyền admin và danh sách yêu thích
  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    } else {
      setIsAdmin(false);
      setFavoriteMovies([]);
    }
  }, [user]);

  const value = {
    axios,
    fetchIsAdmin,
    user,
    navigate,
    isAdmin,
    adminLoading,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook lấy context
export const useAppContext = () => useContext(AppContext);
