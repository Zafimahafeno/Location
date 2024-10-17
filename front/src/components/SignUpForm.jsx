import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <div className="form-container sign-up">
            <form>
                <h1>Creer un compte</h1>
                <div className="social-icons">
                    <Link className="icon"><FcGoogle /></Link>
                    <Link href="#" className="icon"><FaFacebook /></Link>
                    <Link href="#" className="icon"><FaWhatsapp /></Link>
                    {/* <Link href="#" className="icon"></Link> */}
                </div>
                <span>Ou utilisez votre e-mail pour vous inscrire</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUpForm;
