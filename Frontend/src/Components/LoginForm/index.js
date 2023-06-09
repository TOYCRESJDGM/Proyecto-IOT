import React, { useState } from 'react';
import { AuthUser } from '../../API';
import './LoginForm.css'

function LoginForm({ Login, error, changeView }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [loginError, setLoginError] = useState(""); // Nuevo estado para el error de inicio de sesión

  const submitHandler = e => {
    e.preventDefault(); //Prevent the page from re-rendering
    handleLogin(details);
  };

  const handleLogin = values => {
    const { email, password } = values;

    const data = {
      email,
      password
    };

    AuthUser(data)
      .then(res => {
        console.log("POST request successful:", res);
        // Realiza cualquier acción adicional después de iniciar sesión exitosamente
        responseHandler(res, data);
      })
      .catch(error => {
        console.error("Error in POST request:", error);
        // Maneja el error de alguna manera apropiada en tu aplicación
        setLoginError("Error in POST request"); // Actualiza el estado de error en caso de error en la solicitud
      });
  };

  const responseHandler = (response, body) => {
    if (response.type === 'sucess' && response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('rol', response.data.user.rol);
    changeView('Menu');
    }
  };

  return (
    <form onSubmit={submitHandler} id="loginForm">
      <div className="form-inner">
        <h2>Login</h2>
        {loginError && <div className="error">{loginError}</div>}
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={e => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setDetails({ ...details, password: e.target.value })}
            value={details.password}
          />
        </div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}

export default LoginForm;