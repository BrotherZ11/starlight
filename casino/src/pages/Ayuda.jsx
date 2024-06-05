import React from "react";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function Ayuda() {
    return (
        <>
            <Helmet>
                <title>Ayuda</title>
            </Helmet>
            <div style={{ 
                backgroundColor: "#212529",
                minHeight: "100vh" 
            }}>
                <Navbar />
                <nav className="navbar navbar-expand-lg">
                    <div className="align-items-start">
                        <FAQ FAQname={"¿CÓMO PUEDO REGISTRARME?"}
                             FAQdescription={"Para registrarse primero pulse el botón 'registrarse' en la esquina superior derecha de la pantalla" +
                                "Esto le llevará hacia una página en la que deberá rellenar los campos necesarios, entre los que se encuentran " +
                                "la fecha de nacimiento, el DNI y el país de origen (para el cual deberá escribir el nombre del país entero, ejemplo: " +
                                "España, no ES). Estos datos solo serán usados para verificar su identidad y por tanto que sea mayor de edad. "+
                                "Una vez rellenados los campos, pulse el botón de 'siguiente paso', esto le llevará a una página en la que deberá rellenar " +
                                "los campos de usuario y contraseña respectivos para crear una cuenta. Una vez hecho esto, pulse el botón de 'registrarse' y ya " +
                                "tendrá su cuenta creada."}
                             FAQindex={1}
                        />
                        <FAQ FAQname={"¿CÓMO PUEDO INICIAR SESIÓN?"}
                             FAQdescription={"Para iniciar sesión primero pulse el botón 'iniciar sesión' en la esquina superior derecha de la pantalla, " +
                                "esto le llevará a una página con el formulario para iniciar sesión, en el cual deberá rellenar los campos de usuario y contraseña " +
                                "con los datos creados para registrarse. Una vez rellenados los campos, pulse el botón de 'iniciar sesión'. " +
                                "Esto le llevará a la página principal de la web, en la cual podrá acceder a todas las funcionalidades de la página."
                             }
                             FAQindex={2}
                        />
                        <FAQ FAQname={"¿CÓMO PUEDO INGRESAR DINERO?"}
                             FAQdescription={"Para ingresar dinero primero deberá iniciar sesión en la web. Después deberá dirigirse a la tienda " +
                             "pulsando en botón '+' junto al monedero, lo que le llevará a la página de la tienda. Una vez en la tienda, deberá seleccionar " +
                                "la cantidad de dinero que desea ingresar (o ingresar una cantidad personalizada) y pulsar el botón de 'Añadir cantidad'. " + 
                                "Esto le redigirá a la pasarela de pago, donde deberá completar los campos necesarios y confirmar la transacción. " +
                                "Una vez hecho esto, la cantidad de dinero ingresada se verá reflejada en su monedero."
                            }
                            FAQindex={3}
                        />
                        <FAQ FAQname={"¿PUEDO REMBOLSAR MI DINERO?"}
                            FAQdescription={"Sí, en cualquier momento puede retirar su dinero, siempre teniendo en cuenta" +
                                " que se aplicará una comisión del 5% a la retirada del mismo. Para dicha retirada se podrá elegir entre dos métodos, " +
                                "o bien se podrá reembolar el dinero a una cuenta de PayPal enlazada a la tarjeta con la que se ingresó el dinero, " 
                                + "o bien directamente a dicha tarjeta, para así evitr fraudes o robos."}
                            FAQindex={4}
                        />
                        <FAQ FAQname={"¿CUÁNTO TARDARÉ EN VER REFLEJADO EL DINERO EN MI CUENTA?"}
                            FAQdescription={"Lo normal es que lo vea reflejado de manera instantánea en su cuenta, pero dependiendo " +
                                "de la entidad bancaria con la que haga el ingreso, puede tardar hasta 24 horas en verse reflejado en su cuenta." +
                                " Si excede este tiempo le recomendamos hablar con su banco para ver el estado de la transacción"}
                            FAQindex={5}
                        />
                        <FAQ FAQname={"¿COMO PUEDO JUGAR A LA RULETA?"}
                             FAQdescription={"Para jugar a la ruleta primero deberá registrarse o logearse en nuestra página web. " +
                             "Una vez hecho esto, deberá dirigirse a imagen de la ruleta y clicar en ella, esto le llevará a la página de juego. " +
                             "Una vez en esta página, deberá ingresar la cantidad de dinero que sea a una o más de las categorías y pulsar el botón de girar ruleta. " +
                             "Si gana, la cantidad de dinero recibida dependerá de la categoría en la que haya apostado, concretamente, apostar a la categoría 'X2' multiplicará " +
                             "la cantidad apostada por 2, apostar a la categoría 'X4' multiplicará la cantidad apostada por 4, apostar a la categoría 'X6' multiplicará la cantidad apostada por 6, " +
                             "apostar a la categoría 'X11' multiplicará la cantidad apostada por 11 y apostar a la categoría 'X21' multiplicará la cantidad apostada por 21. " +
                             "Si pierde, se reducirá la cantidad apostada de su monedero."
                         }
                            FAQindex={6}
                        /> 
                    </div>          
                </nav>
            </div>
            <Footer/>
        </>
    );
}

export default Ayuda;
