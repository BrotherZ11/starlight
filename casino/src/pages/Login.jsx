import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Validation from "../api/LoginValidation";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
          "https://interfaces-425016.ew.r.appspot.com/login",
          formData
        );

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.error === "Contraseña incorrecta") {
              setErrors({ login: "Contraseña incorrecta" }); // Contraseña incorrecta
            } else if (error.response.data.error === "Correo incorrecto") {
              setErrors({ login: "Correo incorrecto" }); // Correo incorrecto
            } else {
              setErrors({ login: "Correo o contraseña incorrectos" });
            }
          } else {
            console.error("Error en la solicitud:", error);
          }
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Inicio de sesión</title>
      </Helmet>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-sm-8 col-md-6 col-lg-4">
            <div className="card bg-transparent border-1 border-light">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title text-white ">Iniciar sesión</h2>
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
                      className={`form-label ${
                        errors.email ? "text-danger" : "text-warning "
                      }`}
                    >
                      Email {errors.email && <span>*</span>}
                    </label>
                    <input
                      aria-label="Email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className={`form-label ${
                        errors.password ? "text-danger" : "text-warning"
                      }`}
                    >
                      Contraseña {errors.password && <span>*</span>}
                    </label>
                    <div className="input-group">
                      <input
                        aria-label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
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
                  </div>
                  {errors.login && (
                    <div className="alert alert-danger" role="alert">
                      {errors.login}
                    </div>
                  )}
                  {/* Boton */}
                  <button type="submit" className="btn btn-warning yellow-600">
                    Iniciar sesión
                  </button>
                  <div className="mt-2">
                    <span className="text-white">
                      Si no tienes una cuenta,{" "}
                      <Link to="/signup">regístrate</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
