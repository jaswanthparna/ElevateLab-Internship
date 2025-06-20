import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/", {
        headers: {
          Authorization:  `Bearer ${auth.token}`,
        },
      });
      if (response.status === 200) {
        setProducts(response.data);
        console.log(JSON.stringify(response.data, null, 4));
      }
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Moodi</h1>
        {auth?.user ? (
          <div className="flex items-center space-x-4">
            <div className="text-gray-700 font-medium">👤 {auth.user}</div>
            <NavLink
              onClick={handleLogout}
              to="/login"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              🚪 Logout
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login" className="text-gray-700 font-medium">Login</NavLink>
        )}
      </div>
      
      
    </div>
  );
};

export default Homepage;