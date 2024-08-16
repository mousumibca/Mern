import { NavLink } from "react-router-dom";
import { useAuth } from '../store/Auth';

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    console.log("log in or not", isLoggedIn);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><i className="fa-solid fa-newspaper"></i></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/contact">Contact</NavLink></li>
                            {isLoggedIn ? (
                                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/logout">Logout</NavLink></li>
                            ) : (<>
                                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink></li>
                            </>)}
                        </ul>
                        <div className="form-check form-switch">
                            <i className="fa-solid fa-circle-half-stroke fa-lg"></i>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};