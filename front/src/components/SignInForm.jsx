import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const SignInForm = () => {
    return (
        <div className="form-container sign-in">
            <form>
                <h1>Se connecter</h1>
                <div className="social-icons">
                    <Link className="icon"><FcGoogle /></Link>
                    <Link href="#" className="icon"><FaFacebook /></Link>
                    <Link href="#" className="icon"><FaWhatsapp /></Link>
                </div>
                <span>Ou utilise ton mot de passe email</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <Link>Mot de passe oublie?</Link>
                <button>Connecter</button>
            </form>
        </div>
    );
};

export default SignInForm;
