import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Validation from "../api/LoginValidation";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Validation(formData);
    setErrors(formErrors);
    if (Object.values(formErrors).every((error) => !error)) {
      try {
        const response = await axios.post(
          "http://localhost:8081/login",
          formData
        );
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors({ login: "Correo o contraseña incorrectos" });
        } else {
          console.error("Error en la solicitud:", error);
        }
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="card bg-transparent border-1 border-light">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title text-white">Iniciar sesión</h2>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
                  aria-label="Cancelar"
                >
                  <MdCancel className="text-white" size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label text-warning yellow-600"
                  >
                    Email
                  </label>
                  <input
                    aria-label="Email"
                    type="email"
                    className="form-control "
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-danger" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label text-warning yellow-600"
                  >
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      aria-label="Contraseña"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      aria-label="Mostrar contraseña"
                      type="button"
                      className="btn btn-dark"
                      onClick={togglePasswordVisibility}
                    >
                      <FaEye />
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-danger" role="alert">
                      {errors.password}
                    </span>
                  )}
                </div>
                {errors.login && (
                  <div className="alert alert-danger" role="alert">
                    {errors.login}
                  </div>
                )}
                <button type="submit" className="btn btn-warning yellow-600">
                  Iniciar sesión
                </button>
                <div className="mt-2">
                  <span className="text-white">
                    Si no tienes una cuenta, <a href="/signup">regístrate</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
