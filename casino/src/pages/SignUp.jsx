import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { validateFirstForm, validateSecondForm } from "../api/SignupValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { Helmet } from "react-helmet";

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
    if (event.key === "Enter") {
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

  const handleNextStep = async (e) => {
    e.preventDefault();
    const formErrors = await validateFirstForm(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      if (!termsChecked) {
        window.alert("Debes aceptar los terminos");
      } else {
        setShowNextForm(true);
      }
    }
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
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSingup = async (e) => {
    e.preventDefault();

    const formErrors = await validateSecondForm(values);
    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => error === "")) {
      console.log("Form is valid");
      axios
        .post("https://interfaces-425016.ew.r.appspot.com/signup", values)
        .then(() => {
          setRegistrationSuccess(true);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
    <Helmet>
        <title>Registro</title>
    </Helmet>
    
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
                // Formulario 2
                <form onSubmit={handleSingup}>
                  {/* Nombre */}
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className={`form-label ${
                        errors.name ? "text-danger" : "text-warning "
                      }`}
                    >
                      Nombre {errors.name && <span>*</span>}
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      value={values.name}
                      aria-label="Nombre"
                    />
                  </div>

                  {/* Apellidos */}
                  <div className="mb-4">
                    <label
                      htmlFor="lastname"
                      className={`form-label ${
                        errors.lastname ? "text-danger" : "text-warning "
                      }`}
                    >
                      Apellidos {errors.lastname && <span>*</span>}
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      onChange={handleInput}
                      className={`form-control ${
                        errors.lastname ? "is-invalid" : ""
                      }`}
                      value={values.lastname}
                      aria-label="Apellidos"
                    />
                  </div>

                  {/* DNI */}
                  <div className="mb-4">
                    <label
                      htmlFor="dni"
                      className={`form-label ${
                        errors.dni ? "text-danger" : "text-warning "
                      }`}
                    >
                      DNI {errors.dni && <span>*</span>}
                    </label>
                    <input
                      type="text"
                      name="dni"
                      onChange={handleInput}
                      className={`form-control ${
                        errors.dni ? "is-invalid" : ""
                      }`}
                      value={values.dni}
                      aria-label="dni"
                    />

                    {/* Pais */}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className={`form-label ${
                        errors.country ? "text-danger" : "text-warning "
                      }`}
                    >
                      Pais {errors.country && <span>*</span>}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.country ? "is-invalid" : ""
                      }`}
                      name="country"
                      onChange={handleInput}
                      value={values.country}
                      aria-label="Pais"
                    />
                  </div>

                  {/* Fecha */}
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className={`form-label ${
                        errors.date ? "text-danger" : "text-warning "
                      }`}
                    >
                      Fecha de Nacimiento {errors.date && <span>*</span>}
                    </label>
                    <input
                      type="date"
                      name="date"
                      onChange={handleInput}
                      className={`form-control ${
                        errors.date ? "is-invalid" : ""
                      }`}
                      value={values.date}
                      aria-label="Fecha de Nacimiento"
                    />
                    {/* {errors.date && (
                      <span className="text-danger"> {errors.date}</span>
                    )} */}
                  </div>

                  {/* Boton volver */}
                  <div className="d-flex justify-content-between">
                    {/* Boton Registrarse */}
                    <button
                      type="submit"
                      className="btn btn-warning yellow-600 px-6 py-2 rounded font-bold w-full"
                    >
                      Registrarse
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary px-6 py-2 rounded font-bold"
                      onClick={handlePreviousStep}
                    >
                      Volver
                    </button>
                  </div>
                </form>
              ) : (
                //Formulario 1
                <form onSubmit={handleNextStep}>
                  {/* Email */}
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
                      type="email"
                      onChange={handleInput}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={values.email}
                      aria-label="email"
                    />

                    {/* Contraseña */}
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
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        onChange={handleInput}
                        name="password"
                        value={values.password}
                        aria-label="contraseña"
                      />

                      <button
                        type="button"
                        aria-label="mostrar contraseña"
                        onClick={togglePasswordVisibility}
                        className="btn btn-dark"
                      >
                        <FaEye />
                      </button>
                    </div>
                    {values.password && (
                      <div className="mt-2">
                        <p className="text-white">Strength:</p>
                        <div className="progress">
                          <div
                            className={`progress-bar bg-${
                              passwordStrength < 3
                                ? "danger"
                                : passwordStrength < 5
                                ? "warning"
                                : "success"
                            }`}
                            role="progressbar"
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                            aria-valuenow={passwordStrength}
                            aria-valuemin="0"
                            aria-valuemax="5"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className={`form-label ${
                        errors.confirmPassword ? "text-danger" : "text-warning"
                      }`}
                    >
                      Confirmar Contraseña{" "}
                      {errors.confirmPassword && <span>*</span>}
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        onChange={handleInput}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        aria-label="confirmar contraseña"
                      />
                      <button
                        aria-label="mostrar contraseña"
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="btn btn-dark"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
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
                  {/* Boton */}
                  <button
                    type="submit"
                    className="btn btn-warning yellow-600 px-6 py-2 rounded font-bold w-full"
                  >
                    Siguiente paso
                  </button>
                  <div className="mt-2">
                    <span className="text-white">
                      Si ya tienes una cuenta,{" "}
                      <a href="#/login">Inicia sesion</a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
