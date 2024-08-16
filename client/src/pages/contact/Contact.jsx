import './Contact.css';
import { useState } from 'react'

export const Contact = () => {

    const [user, setuser] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleContact = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user,
            [name]: value,
        });

    };


        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(user);

        };
    return (
        <div className="container mt-5 position-relative">
            <div className="wrapper position-absolute top-0 start-50 translate-middle-x">
                <form onSubmit={handleSubmit}>
                    <h2>Contact Us</h2>
                    <div className="input-field">
                        <input type="text" required value={user.name} onChange={handleContact} name="name" />
                        <label>Enter your Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" value={user.email} onChange={handleContact} name="email" required />
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input type='text' value={user.message} onChange={handleContact} name="message" required /><br/>
                        <label>Enter your message</label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}