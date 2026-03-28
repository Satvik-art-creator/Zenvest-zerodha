import "./styles/hero.css"
import heroImg from "./images/homeHero.png"
import {NavLink} from "react-router-dom"

export default function Hero() {
    return (
        <>
            <header className="text-center" style={{"padding-bottom": "10rem"}}>
                <img src={heroImg} alt="hero section image" className="img-fluid mt-2 mb-5" />

                <h3 className="p-2">Invest in everything</h3>
                <h5 className="fw-normal">Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</h5>
                <NavLink to="/signup"><a className="btn btn-primary btn-lg mt-5 px-4 fw-medium" role="button">Sign up for free</a></NavLink> 
            </header>
        </>
    );
}