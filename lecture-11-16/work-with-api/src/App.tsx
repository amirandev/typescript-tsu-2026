import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import Layout from "./partials/layout";

export default function App() {
  return <Routes>
    <Route element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  </Routes>
}