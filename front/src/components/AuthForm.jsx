import React, { useState } from 'react';
import * as Components from './Components';
import { create, handleEncrypt } from '../services/Api';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [signIn, toggle] = useState(true);
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
        try {
            const result = await create('signing', input);
            if (result.error) {
                console.log(result.error);
            } else {
                const dataCr = handleEncrypt(result);
                localStorage.setItem('user', JSON.stringify(dataCr));
                if (result.role === "admin") {
                    navigate('/admin/produit');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login">
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <div className='form'>
                        <Components.Title>Cree un compte</Components.Title>
                        <Components.Input type='text' placeholder='Name' />
                        <Components.Input type='email' placeholder='Email' />
                        <Components.Input type='adress' placeholder='Adresse' />
                        <Components.Input type='password' placeholder='Password' />
                        <button type='submit' className='btnLeft' onClick={() => toggle(true)}>
                            Se connecter
                        </button>
                    </div>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <div className='form'>
                        <Components.Title>Se connecter</Components.Title>
                        <Components.Input type='email' placeholder='Email' name='email' value={input.email} onChange={handleInputChange} />
                        <Components.Input type='password' placeholder='Password' name='password' value={input.password} onChange={handleInputChange} />
                        <Components.Anchor href='#'>Mot de passe oublie?</Components.Anchor>
                        <button type='submit' className='btnLeft' onClick={handleLogin}>
                            Se connecter
                        </button>
                    </div>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Bienvenue!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <button className='btnRight' onClick={() => toggle(true)}>
                                Se connecter
                            </button>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Bonjour!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <button type='submit' className='btnRight' onClick={() => toggle(false)}>
                                Sign Up
                            </button>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
};

export default AuthForm;
