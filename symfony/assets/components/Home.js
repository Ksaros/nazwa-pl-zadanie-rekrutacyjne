import React, { useEffect } from 'react';
import { Route, Routes as Switch, useLocation, useNavigate } from 'react-router-dom';
import Client from './Client';
import RegisterForm from './RegisterForm';

const Home = () => {
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
            if (location.pathname === "/") {
                  navigate("/register");
            }

      }, []);

      return (
            <div>
                  <Switch>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/client/:slug" element={<Client />} />
                  </Switch>
            </div>
      );
}

export default Home;
