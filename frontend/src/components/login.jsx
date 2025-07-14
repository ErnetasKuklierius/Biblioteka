import { useState } from 'react'
import API from "../api";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [form, setForm] = useState({ username: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token)
        navigate("/")
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <input placeholder="Username" onChange={(e) => setForm ({ ...form, username: e.target.value})}/>
    <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value})}/>
    <button>Login</button>
    </form>
    </>
  )
}
