import './Contact.css';
import { useState } from 'react';
import {useAuth} from '../../store/Auth';

export const Contact = () => {

    const [contact, contactUser] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [userData, setUserData]=useState(true);
    const {user}=useAuth();

    if(user && userData){
        contactUser({
            username:user.username,
            email:user.email,
            message:"",

        })
        setUserData(false);
    }

    const handleContact = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        contactUser({
            ...contact,
            [name]: value,
        });

    };


        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(contact);

        };
    return (
        <div className="container mt-5 position-relative">
            <div className="wrapper position-absolute top-0 start-50 translate-middle-x">
                <form onSubmit={handleSubmit}>
                    <h2>Contact Us</h2>
                    <div className="input-field">
                        <input type="text" required value={contact.name} onChange={handleContact} name="name" />
                        <label>Enter your Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" value={contact.email} onChange={handleContact} name="email" required />
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input type='text' value={contact.message} onChange={handleContact} name="message" required /><br/>
                        <label>Enter your message</label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}