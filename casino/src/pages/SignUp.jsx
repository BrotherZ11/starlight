import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Validation from "../api/SignupValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    dni: "",
    country: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) {
      strength += 1;
    }
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) {
      strength += 1;
    }
    return strength;
  };

  const handleKeyEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.click();
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setShowNextForm(true);
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setShowNextForm(false);
  };

  const toggleTerms = () => {
    setTermsChecked(!termsChecked);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSingup = (e) => {
    e.preventDefault();

    const formErrors = Validation(values);
    setErrors(formErrors);

    if (
      Object.values(formErrors).every((error) => error === "") &&
      termsChecked
    ) {
      console.log("Form is valid");
      axios
        .post("http://localhost:8081/signup", values)
        .then(() => {
          setRegistrationSuccess(true);
          navigate("/login");
        })
        .catch((err) => {
          window.alert("El correo electrónico ya ha sido utilizado.");
          console.log(err);
        });
    } else {
      setErrors({ register: "Faltan Datos" });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card bg-transparent border-1 border-light">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title text-white">Regístrate</h2>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
                  aria-label="Cancelar"
                >
                  <MdCancel className="text-white" size={24} />
                </button>
              </div>
              {registrationSuccess ? (
                <p className="text-success">Registro exitoso</p>
              ) : showNextForm ? (
                <form onSubmit={handleSingup}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="form-label text-warning yellow-600"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      className="form-control"
                      value={values.name}
                      aria-label="Nombre"
                    />
                    {errors.name && (
                      <span className="text-danger"> {errors.name}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastname"
                      className="form-label text-warning yellow-600"
                    >
                      Apellidos
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      onChange={handleInput}
                      className="form-control"
                      value={values.lastname}
                      aria-label="Apellidos"
                    />
                    {errors.lastname && (
                      <span className="text-danger"> {errors.lastname}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dni"
                      className="form-label text-warning yellow-600"
                    >
                      DNI
                    </label>
                    <input
                      type="text"
                      name="dni"
                      onChange={handleInput}
                      className="form-control"
                      value={values.dni}
                      aria-label="dni"
                    />
                    {errors.dni && (
                      <span className="text-danger"> {errors.dni}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="form-label text-warning yellow-600"
                    >
                      Pais
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      onChange={handleInput}
                      value={values.country}
                      aria-label="Pais"
                    />
                    {errors.country && (
                      <span className="text-danger"> {errors.country}</span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="form-label text-warning yellow-600"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name="date"
                      onChange={handleInput}
                      className="form-control"
                      value={values.date}
                      aria-label="Fecha de Nacimiento"
                    />
                    {errors.date && (
                      <span className="text-danger"> {errors.date}</span>
                    )}
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary px-6 py-2 rounded font-bold"
                      onClick={handlePreviousStep}
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="btn btn-warning yellow-600 px-6 py-2 rounded font-bold w-full"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleNextStep}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label text-warning yellow-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={handleInput}
                      className="form-control"
                      name="email"
                      value={values.email}
                      aria-label="email"
                    />
                    {errors.email && (
                      <span className="text-danger"> {errors.email}</span>
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
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        onChange={handleInput}
                        name="password"
                        value={values.password}
                        aria-label="contraseña"
                      />

                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="btn btn-dark"
                      >
                        <FaEye />
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-danger"> {errors.password}</span>
                    )}
                    {values.password && (
                      <div className="mt-2">
                        <p className="text-white">Strength:</p>
                        <div className="progress">
                          <div
                            className={`progress-bar bg-${
                              passwordStrength < 3 ? "danger" : passwordStrength < 5 ? "warning" : "success"
                            }`}
                            role="progressbar"
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            aria-valuenow={passwordStrength}
                            aria-valuemin="0"
                            aria-valuemax="5"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label text-warning yellow-600"
                    >
                      Confirmar Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        onChange={handleInput}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        aria-label="confirmar contraseña"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="btn btn-dark"
                      >
                        <FaEye />
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-danger"> {errors.password}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="terms"
                        className="form-check-input"
                        checked={termsChecked}
                        onChange={toggleTerms}
                        onKeyPress={handleKeyEnterPress} 
                        aria-label="Aceptar los términos y condiciones"
                      />
                      <label
                        htmlFor="terms"
                        className="form-check-label text-white"
                        
                      >
                        Tengo 18 y acepto los{" "}
                        <a href="https://drive.google.com/file/d/19_fFcDUj8Yg_q6Ma0S8pdOmwTd-5YPAu/view?usp=drive_link">
                          términos y condiciones
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning yellow-600 px-6 py-2 rounded font-bold w-full"
                  >
                    Siguiente paso
                  </button>
                  <div className="mt-2">
                    <span className="text-white">
                      Si ya tienes una cuenta,{" "}
                      <a href="/login">Inicia sesion</a>
                    </span>
                  </div>
                </form>
              )}
              <br></br>
              {errors.register && (
                <div className="alert alert-danger" role="alert">
                  {errors.register}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;