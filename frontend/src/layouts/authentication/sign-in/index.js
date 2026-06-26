/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";


// @mui material components
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import "./../../css/loader.css";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // console.log('==>>>>', token);
  if (token) {
    navigate('/dashboard');
  }


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    console.log(form.email)
    try {

      // await login(form.email, form.password);

      const result = await login(form.email, form.password);
      console.log(result, 'ressss')

      navigate('/dashboard');
    } catch (err) {

      console.error("FULL ERROR:", err);

      const data = err?.data;


      if (data?.errors) {
        setErrors(data.errors);
      } else {
        setErrors({
          general: data?.message || err?.message || "Kuch galat hua, dobara try karein.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>



        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" className="auth-form">
            {errors.general && (
              <div className="alert alert-error">{errors.general}</div>
            )}

            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
              {errors.email && (
                <span className="error-message">
                  {errors.email?.[0]}
                </span>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                id="password"
                fullWidth
                value={form.password}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">
                  {errors.password?.[0]}
                </span>
              )}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth disabled={loading} onClick={handleSubmit}>
                {loading ? <span className="spinner-sm" /> : 'sign in'}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
            </MDBox>
          </MDBox>
        </MDBox>

      </Card>
    </BasicLayout>
  );
}

export default SignIn;
