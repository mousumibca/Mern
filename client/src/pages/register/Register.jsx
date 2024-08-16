import { useState } from "react";
import './Register.css';
import { NavLink } from "react-router-dom";

export const Register = () => {
    const [user, setuser] = useState({
        username: "",
        email:"",
        phone: "",
        password: "",
    });

    const handleRegister = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user,
            [name]: value,
        });

    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            console.log("response data : ", response);
      
            if (response.ok) {
              const responseData = await response.json();
              alert("registration successful");
              setuser({ username: "", email: "", phone: "", password: "" });
              console.log(responseData);
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
                <form onSubmit={handelSubmit} className="mt-5">
                    <h2>Register Now</h2>
                    <div className="input-field">
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleRegister}
                            required
                        />
                        <label htmlFor="exampleInputEmail1" className="mx-3">User Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleRegister} required
                        />
                        <label htmlFor="exampleInputEmail1" className="mx-3">Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="number"
                            name="phone"
                            value={user.phone}
                            onChange={handleRegister} required
                        />
                        <label htmlFor="exampleInputEmail1" className="mx-3">Phone No</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleRegister} required
                        />
                        <label htmlFor="exampleInputPassword1" className="mx-3">Password</label>
                    </div>
                    <div className="forget">
                        <label htmlFor="remember">
                            <input type="checkbox" id="remember" />
                            Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary mx-3 mt-3" >Register Now</button>
                    <div className="register">
                        <p>Already have account?  <NavLink to="/login">Log in</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    );
};