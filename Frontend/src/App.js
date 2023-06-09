import React, { useState, useEffect } from 'react';
import MenuView from './Components/MenuView';
import LoginForm from "./Components/LoginForm";

function App() {
  const [component, setComponent] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const Login = (details) => {
    console.log(details);
    if (details.type === "success" && details.data) {
      console.log("Logged in!");
      let infoUser = details.data.user;
      console.log(user)
      setUser({
        name: infoUser.name,
        email: infoUser.email,
        rol: infoUser.rol,
      });
    } else {
      setError("Details do not match");
    }
  };

  const handleChange = (value) => {
    console.log(value)
    setComponent(value);
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setComponent('Menu');
    }
  }, []);

  if (component === 'Menu') {
    return <MenuView changeView={handleChange} />;
  }

  return <LoginForm Login={Login} error={error} changeView={handleChange} />;
}

export default App;
