import { useState } from 'react';
import './Login.css';
import { NavLink } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useAuth } from '../../store/Auth';
import {Navigate} from 'react-router-dom';


export const Login = () => {
    const [user, setuser] = useState({
        username: "",
        password: "",
    });
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const {storeTokenInLS}=useAuth();

    const handleLogin = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user,
            [name]: value,
        });

    };
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("response data : ", response);

            if (response.ok) {
                const responseData = await response.json();
                alert("login successful");
                storeTokenInLS(responseData.token);
                setuser({ username: "", password: "" });
                console.log(responseData);
                return <Navigate to="/about"/>;
            } else {
                console.log("error inside response ", "error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className="container mt-5 position-relative">
            <div className="wrapper position-absolute top-0 start-50 translate-middle-x">
                <form onSubmit={handelSubmit}>
                    <h2>Login</h2>
                    <div className="input-field">
                        <input type="text" required value={user.username} onChange={handleLogin} name="username" />
                        <label>Enter your username</label>
                    </div>
                    <div className="input-field">
                        <input type={type} value={user.password} onChange={handleLogin} name="password" required />
                        <label>Enter your password</label>
                        <span className="d-flex justify-content-end text-white" >
                            <Icon className="absolute mr-10" icon={icon} size={25}onClick={handleToggle} />
                        </span>
                    </div>
                    <div className="forget">
                        <label htmlFor="remember">
                            <input type="checkbox" id="remember" />
                            Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Log In</button>
                    <div className="register">
                        <p>Don't have an account? <NavLink to="/register">Register</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    )
}