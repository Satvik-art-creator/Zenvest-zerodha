import kiteImg from "./images/kite.png"
import consImg from "./images/console.png"
import coinImg from "./images/coin.png";
import apiImg from "./images/kiteconnect.png";
import varsImg from "./images/varsity.png";
import appSImg from "./images/appstoreBadge.svg"
import googPImg from "./images/googlePlayBadge.svg"
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import "./styles/productinfo.css"

const kiteDesc="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
const consDesc="The central dashboard for your Zenvest account. Gain insights into your trades and investments with in-depth reports and visualisations."
const coinDesc="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
const apiDesc="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
const varsDesc="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."

const LeftProduct = ({src, name, desc, firstA, secA}) => {
    return (
        <>
            <div className="row align-items-center" style={{"margin": "4rem 0"}}>
                <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
                    <a href="#"><img src={src} alt="product image" className="img-fluid" /></a>
                </div>
                <div className="col-12 col-lg-6 text-center text-lg-start">
                    <h4>{name}</h4>
                    <br />
                    <p>{desc}</p>
                    {firstA ? <a href="#">{firstA} <ArrowRightAltOutlinedIcon /></a> : null}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    {secA ? <a href="#">{secA} <ArrowRightAltOutlinedIcon /></a> : null}
                    <br /> <br />
                    <div className="image">
                        <a href="#"><img src={googPImg} alt="google play badge" /></a>
                        &nbsp;&nbsp; 
                        <a href="#"><img src={appSImg} alt="apple store badge" /></a>
                    </div>
                </div>
            </div>
        </>
    );
}

const RightProduct = ({src, name, desc, firstA}) => {
    return (
        <>
            <div className="row align-items-center flex-column-reverse flex-lg-row" style={{"margin": "4rem 0"}}>
                <div className="col-12 col-lg-6 text-center text-lg-start" style={{"padding-top": "2rem"}}>
                    <h4>{name}</h4>
                    <br />
                    <p>{desc}</p>
                    <a href="#">{firstA} <ArrowRightAltOutlinedIcon /></a>
                </div>
                <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
                    <img src={src} alt="product image" className="img-fluid" />
                </div>
            </div>
        </>
    );
}

export default function ProductInfo() {
    return (
        <>
            <section className="product">
                <div className="text-center">
                    <h2>Zenvest Products</h2>
                    <h5 className="fw-normal">Sleek, modern, and intuitive trading platforms</h5>
                    <br />
                    <p className='fs-5'>Check out our <a href="">investment offerings <ArrowRightAltOutlinedIcon /></a></p>
                    <hr className='w-75' style={{"margin": "4.7rem auto"}} />
                </div>

                <div className="container">
                    <LeftProduct src={kiteImg} name="Kite" desc={kiteDesc} firstA="Try Demo" secA="Learn more"  />
                    <RightProduct src={consImg} name="Console" desc={consDesc} firstA="Learn more"  />
                    <LeftProduct src={coinImg} name="Coin" desc={coinDesc} firstA="Coin" secA=""  />
                    <RightProduct src={apiImg} name="Kite Connect API" desc={apiDesc} firstA="Kite Connect"  />
                    <LeftProduct src={varsImg} name="Varsity Mobile" desc={varsDesc} firstA="" secA=""  />
                </div>
                <h4 className="text-center fw-normal">Want to know more about our technology stack? Check out the <a href="">Zenvest.tech</a> blog.</h4>
            </section>
        </>
    );
}