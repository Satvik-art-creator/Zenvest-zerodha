import fundImg from "./images/zerodhaFundhouse.png"
import bullImg from "./images/sensibullLogo.svg"
import tijoriImg from "./images/tijoriLogo.png"
import streakImg from "./images/streakLogo.png"
import smcaseImg from "./images/smallcaseLogo.png"
import dittoImg from "./images/dittoLogo.png"
import "./styles/productinfo.css"

const Partner = ({imgSrc, desc}) => {
    return (
        <>
            <div className="col-12 col-sm-6 col-lg-4 p-2 mb-4">
                <a href=""><img src={imgSrc} alt="partner platforms images" className="img-fluid" style={{ maxHeight: "60px" }}/></a>
                <a href=""><p className="fs-6 mt-2">{desc}</p></a>
            </div>
        </>
    );
}

export default function ZenvestUni() {
    return (
        <>
            <section className="product text-center" style={{"margin": "8rem 0 5rem"}}>
                <h3>The Zenvest Universe</h3>
                <br />
                <p className="fs-5">Extend your trading and investment experience even further with our partner platforms</p>
                <br />
                <div className="container">
                    <div className="row">
                        <Partner imgSrc={fundImg} desc="Our asset management venture that is creating simple and transparent index funds to help you save for your goals." />
                        <Partner imgSrc={bullImg} desc="Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more." />
                        <Partner imgSrc={tijoriImg} desc="Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more." />
                        <Partner imgSrc={streakImg} desc="Systematic trading platform that allows you to create and backtest strategies without coding." />
                        <Partner imgSrc={smcaseImg} desc="Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs." />
                        <Partner imgSrc={dittoImg} desc="Personalized advice on life and health insurance. No spam and no miss-selling." />
                    </div>
                </div>

                <a className="btn btn-primary btn-lg mt-5 px-4 fw-medium" href="#" role="button">Sign up for free</a>
            </section>
        </>
    );
}