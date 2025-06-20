import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../pages/Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get("http://localhost:8080/product/", {
        headers: {
          "Authorization":  `Bearer ${auth.token}`, 
        },
      });

      if (response.status === 200) {
        setOk(true);
        console.log(response.data);
      } else {
        setOk(false);
        console.log(response.data);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner></Spinner>;
}