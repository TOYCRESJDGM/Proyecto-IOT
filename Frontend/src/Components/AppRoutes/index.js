import {Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Nodes from "../../Pages/Nodes";
import LoginForm from "../LoginForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/data" element={<Inventory />}></Route>
      <Route path="/node" element={<Nodes />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  );
}
export default AppRoutes;
