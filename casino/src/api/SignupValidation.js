import axios from "axios";

export async function validateFirstForm(values) {
    let errors = {};
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
      } else {
        try {
          const response = await axios.post("http://localhost:8081/checkEmail", { email: values.email });
          if (response.data.exists) {
            window.alert("El email ya ha sido utilizado")
          }
        } catch (error) {
          console.error("Error checking email:", error);
          errors.email = "Error checking email";
        }
      }
    }
  
    if (!values.password.trim()) {
      errors.password = "Password is required";
    }
  
    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      window.alert("Las contraseñas son diferentes")
    }
  
    return errors;
  }
  


export async function validateSecondForm(values){
    let error = {}
  
    const name_pattern = /^[a-zA-Z]+$/
    const lastname_pattern = /^[a-zA-Z]+$/
    const dni_pattern = /^[0-9a-zA-Z]+$/;
    const country_pattern = /^[a-zA-Z]+$/
    // const date_patterns = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/

    if(values.name.trim() === ""){
        error.name = "name is required"
    }else if(!name_pattern.test(values.name)){
        error.name = "name is invalid"
    }else{
        error.name = ""
    }

    if(values.lastname.trim() === ""){
        error.lastname = "lastname is required"
    }else if(!lastname_pattern.test(values.lastname)){
        error.lastname = "lastname is invalid"
    }else{
        error.lastname = ""
    }

    if(values.dni.trim() === ""){
        error.dni = "dni is required"
    }else if(!dni_pattern.test(values.dni)){
        error.dni = "dni is invalid"
    }else{
        error.dni = ""
    }

    if(values.country.trim() === ""){
        error.country = "country is required"
    }else if (!country_pattern.test(values.country)){
        error.country = "country is invalid"
    }else{
        error.country = ""
    }

    if(values.date.trim() === ""){
        error.date = "date is required"
    }else {
        const today = new Date();
        const birthDate = new Date(values.date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
          error.date = "Debes ser mayor de 18 años"
            window.alert("Debes ser mayor de 18 años")
        } else {
            error.date = "";
        }
    }


    return error;
}

export default { validateFirstForm, validateSecondForm };