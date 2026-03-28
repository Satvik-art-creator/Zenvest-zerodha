import priceImg from "./images/pricing.png"
import eduImg from "./images/education.svg"
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

export default function Pricing () {
    return (
        <>
            <section style={{"padding-bottom": "10rem"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="pb-3">Unbeatable Pricing</h3>
                            <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                            <a href="#">See Pricing <ArrowRightAltOutlinedIcon /></a>
                        </div>
                        <div className="col-12 col-md-6 mt-4 mt-md-0 text-center text-md-start">
                            <img src={priceImg} alt="pricing image" className="img-fluid" />
                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center text-md-start">
                            <img src={eduImg} alt="education image" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="pb-3">Free and open market education</h3>
                            <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                            <a href="#">Varsity <ArrowRightAltOutlinedIcon /></a>
                            <br />
                            <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                            <a href="#">TradingQ&A <ArrowRightAltOutlinedIcon /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}