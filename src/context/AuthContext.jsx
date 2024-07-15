import { createContext, useState } from 'react';

import { authApp } from '../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const register = async (authApp, email, password) => {
    try {
      await createUserWithEmailAndPassword(authApp, email, password);
      login(authApp, email, password);
    } catch (error) {

          console.error("code.error", error.code);

            const errorObj = {
                "auth/email-already-in-use": () => alert("El Correo ya esta en Uso"),
                "auth/operation-not-allowed": () =>alert("Operacion No Permitida."),

                "auth/weak-password": () => alert("La contraseña es muy débil."),
                "auth/invalid-email": () => alert("El Correo No es Valido"),
            };

            const myswithFunction = (errorCode) => {
                errorObj[errorCode]();
            };

            myswithFunction(error.code);
    }
  };






  const [stateLogout, setStateLogout] = useState(true);

  const login = (authApp, email, password) => {
    
    signInWithEmailAndPassword(authApp, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('userEmailLS', user.email);
        setStateLogout(!stateLogout);
        location.reload();
      })
      .catch((error) => {
          console.log(error.code);
          console.log(error.message);

          if (error.code == "auth/invalid-credential") {
              alert("Contraseña o Correo son Incorrrectos");
          }

      });
  };





  const logout = () => {
      signOut(authApp);
      localStorage.removeItem('userEmailLS');
      setStateLogout(!stateLogout);
  };




  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        stateLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
