import React, { useState } from 'react';
import { create, handleEncrypt } from '../services/Api';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };
    const handleLogin = async () => {
        await create('signing', input)
            .then((result) => {
                if (result.error) {
                    console.log(result.error);
                }else{
                const dataCr = handleEncrypt(result);
                localStorage.setItem('user', JSON.stringify(dataCr));
                if (result.role === "admin") {
                    navigate('/admin/produit');
                } else {
                    navigate('/')
                }}
            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='login'>
            <div className="layout">
                <span className="title">Login</span>
                <div className="social-icons">
                    <Link className="icon"><FcGoogle /></Link>
                    <Link href="#" className="icon"><FaFacebook /></Link>
                    <Link href="#" className="icon"><FaWhatsapp /></Link>
                </div>
                <input
                    type="text"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
