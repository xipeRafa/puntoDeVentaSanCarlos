import { useContext } from 'react';
import logoImg from '../assets/canal10.png';

import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';

import { AuthContext } from '../context/AuthContext';

export const NavComp = () => {
  const { logout, stateLogout } = useContext(AuthContext);

  return (
    <nav className="container w-100">
      

      <div className="w-100 border-bottom pt-1">
        <div className="mb-4 d-flex justify-content-between">


          {localStorage.getItem('userEmailLS') !== null ? (
            <>
              <div className="btn btn-primary mx-2 disabled">
                {localStorage.getItem('userEmailLS')}
              </div>
              <div
                onClick={() => {if (window.confirm(`Quieres Salir?`)) {
                                            logout()
                                }
                        }}
                className="btn btn-outline-danger mx-2"
              >
                SALIR
              </div>
            </>
          ) : (
            <>
              <LoginComp />
              <RegisterComp />
            </>
          )}


        </div>
      </div>


      <div className="w-100 d-flex justify-content-center">
        <div className="navbar-brand mb-4 text-center">
          <h2 className=''>PUNTO DE VENTA HERMOSILLO</h2>
          <h3>POLANCO GUAYABERAS</h3>
        </div>
      </div>

    </nav>
  );
};
