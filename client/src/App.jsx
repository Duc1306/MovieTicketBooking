import React, { useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeaLayout from "./pages/SeaLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Layout from "./pages/admin/Layout";
import DashBoard from "./pages/admin/DashBoard";
import AddShow from "./pages/admin/AddShow";
import ListBooking from "./pages/admin/ListBooking";
import ListShow from "./pages/admin/ListShow";
import { useAppContext } from "../context/AppContext";
import { SignIn } from "@clerk/clerk-react";

const AdminGuard = ({ children }) => {
  const { user, isAdmin, adminLoading } = useAppContext();
   const shown = useRef(false);

  useEffect(() => {
    
    if (!adminLoading && isAdmin === false && !shown.current) {
      toast.error("You are not authorized to access admin dashboard");
      shown.current = true; 
    }
    if (isAdmin === true) {
      shown.current = false; 
    }
  }, [adminLoading, isAdmin]);
  if (!user) {
    
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SignIn fallbackRedirectUrl="/admin" />
      </div>
    );
  }
  if (adminLoading || isAdmin === null) {
    
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span>Đang kiểm tra quyền truy cập...</span>
      </div>
    );
  }
  if (!isAdmin) {
    
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeaLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="/admin/*"
          element={
            <AdminGuard>
              <Layout />
            </AdminGuard>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="add-shows" element={<AddShow />} />
          <Route path="list-bookings" element={<ListBooking />} />
          <Route path="list-shows" element={<ListShow />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
