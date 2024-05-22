async function Validation(values){
    let error = {}
    const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    const name_pattern = /^[a-zA-Z]+$/
    const lastname_pattern = /^[a-zA-Z]+$/
    const dni_pattern = /^[0-9a-zA-Z]+$/;
    const country_pattern = /^[a-zA-Z]+$/
    // const date_patterns = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/

    if(values.email === ""){
        error.email = "Email is required"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email is invalid"
    }else{
        try {
            // Hacer una solicitud al servidor para verificar si el correo electrónico ya se ha utilizado
            const response = await axios.post("http://localhost:8081/signup", { email: values.email });
            if (response.data.exists) {
              errors.email = "Este correo electrónico ya se ha utilizado";
            } else {
              errors.email = "";
            }
          } catch (error) {
            console.error("Error checking email:", error);
            errors.email = "Error checking email";
          }
    }

    if(values.password === ""){
        error.password = "Password is required"
    // }else if (!password_pattern.test(values.password)){
    //     error.password = "Password is invalid"
    }else{
        error.password = ""
    }

    if(values.name === ""){
        error.name = "name is required"
    }else if(!name_pattern.test(values.name)){
        error.name = "name is invalid"
    }else{
        error.name = ""
    }

    if(values.lastname === ""){
        error.lastname = "lastname is required"
    }else if(!lastname_pattern.test(values.lastname)){
        error.lastname = "lastname is invalid"
    }else{
        error.lastname = ""
    }

    if(values.dni === ""){
        error.dni = "dni is required"
    }else if(!dni_pattern.test(values.dni)){
        error.dni = "dni is invalid"
    }else{
        error.dni = ""
    }

    if(values.country === ""){
        error.country = "country is required"
    }else if (!country_pattern.test(values.country)){
        error.country = "country is invalid"
    }else{
        error.country = ""
    }

    if(values.date === ""){
        error.date = "date is required"
    // }else if(!date_patterns.test(values.date)){
    //     error.date = "date is invalid"
    }else{
        error.date = ""
    }


    return error;
}

export default Validation;