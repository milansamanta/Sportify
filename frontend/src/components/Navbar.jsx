import './Navbar.css'
import Home from '../assets/home.svg'
import logo from '../assets/sportify.svg'
import { Link } from 'react-router-dom'
export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg h-100" id="navbar" data-bs-theme="dark">
            <div className="container-fluid">
                <Logo />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Searchbox />
                    <Navlinks />
                </div>
            </div>
        </nav>
    );
}

function Logo(){
    return (
        <a className="navbar-brand" href="/"><img src={logo} height="24px" alt="Logo" className="d-inline-block"/>
      Sportify</a>
    );
}

function Navlinks(){
    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
           <li className="nav-item">
                <a className="nav-link" href="/signup">signup</a>
            </li>
           <li className="nav-item">
                <a className="nav-link" href="/login">login</a>
            </li>
        </ul>
    );
}

function Search(){
    return (
        <form className="d-flex searchbox" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
    );
}

function Searchbox(){
    return (
       <div className="d-flex mx-auto" >
        <Link to="/">
            <button className="me-2 btn-home"><img src={Home} alt="Home" /></button>
        </Link>
        <Search/>
       </div>
    );
}
