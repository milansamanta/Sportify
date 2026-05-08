import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../components/Api';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('token/', { username: username, password: password })
        .then(res => {
            console.log(res.data);
            localStorage.clear();
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            window.location.href = '/';
        })
        .catch(err => {
            console.error(err);
            alert('Login failed. Please check your credentials and try again.');
        });

    };

    return (
        <div className="container-fluid pt-5">
            <section className="d-flex flex-column justify-content-center align-items-center gap-3 mx-auto form-hero">
            <h1 className="mx-auto">Login to Continue</h1>
            <div className="container-fluid mx-5 px-5">
            <form className="d-flex flex-column mx-5" onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="username" type="text" placeholder="Username" value={username} onChange={e=>{setUsername(e.target.value)}} required />
                {/* <input className="form-control mb-2" name="email" type="email" placeholder="Email" required /> */}
                <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={password} onChange={e=>{setPassword(e.target.value)}} required />
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            </div>
            </section>
        </div>
    );
}