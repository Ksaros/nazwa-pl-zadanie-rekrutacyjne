import React, { useEffect } from 'react';
import { Route, Routes as Switch, Navigate, Link, withRouter, useNavigate } from 'react-router-dom';
import Client from './Client';
import RegisterForm from './RegisterForm';

const Home = () => {
      const navigate = useNavigate();

      useEffect(() => {
            navigate("/register");

      }, [])

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
