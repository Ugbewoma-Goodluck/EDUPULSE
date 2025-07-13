import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Icon } from '@iconify/react';
import logo from '../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png';
import '../styles/login.css'; // Assuming you have a CSS file for styling

const Login = () => {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const [login, setlogin] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleThemeToggle = () => {
        toggleTheme();
    };

    const handlessubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { email, password } = login;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userEmail = userCredential.user.email;
            if (userEmail === 'edupulse360@gmail.com') {
                alert('Login Successful');
                navigate('/Dashboard');
            } else {
                setError('Invalid Credentials');
            }
        } catch (err) {
            setError('Invalid Credentials');
        }
        setlogin({ email: '', password: '' });
    };
    const handlechange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}: ${value}`);
        setlogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className={`main-div ${isDark ? 'dark' : ''}`}>
            <img src={logo} className="logo-header" alt="" />
            <h1 className={isDark ? 'h-dark' : 'h'}>Admin Login</h1>
            {isDark ? (
                <Icon icon="solar:sun-bold" className="sun-icon" onClick={handleThemeToggle} />
            ) : (
                <Icon
                    icon="line-md:moon-filled"
                    className="moon-icon"
                    onClick={handleThemeToggle}
                />
            )}

            <form onSubmit={handlessubmit} className={isDark ? 'form-login-dark' : 'form-login'}>
                <div className="input-wrap">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        className="inp1"
                        placeholder="Email address"
                        required
                        name="email"
                        value={login.email}
                        onChange={handlechange}
                    />
                </div>
                <div className="input-wrap">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="inp2"
                        placeholder="Password"
                        required
                        name="password"
                        value={login.password}
                        onChange={handlechange}
                    />
                </div>
                <div className="input-wrap">
                    <input className="submit-btn" type="submit" value="Login" />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
