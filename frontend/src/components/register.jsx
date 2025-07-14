import { useState } from 'react'
import API from "../api";

export const Register = () => {
    const [form, setForm] = useState({ username:"", password:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/register", form);
        alert("Registered successfully")
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <h2>Register</h2>
    <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
    <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
    <button>Register</button>
    </form>
    </>
  )
}
