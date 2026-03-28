import "./styles/stats.css"
import statImg from "./images/ecosystem.png"
import pressImg from "./images/pressLogos.png"
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

export default function Stats() {
    return (
        <>
            <section className="pt-5" style={{"padding-bottom": "10rem"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="pb-5">Trust with Confidence</h3>
                            <div>
                                <h4>Customer-first Always</h4>
                                <p>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
                            </div>
                            <div>
                                <h4>No spam or gimmicks</h4>
                                <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href="#">Our philosophies.</a></p>
                            </div>
                            <div>
                                <h4>The Zerodha universe</h4>
                                <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>    
                            </div>
                            <div>
                                <h4>Do better with money</h4>
                                <p>With initiatives like <a href="#">Nudge</a> and <a href="#">Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mt-5 mt-md-0">
                            <img src={statImg} alt="zerodha ecosystem image" className="img-fluid" />

                            <div className="links text-center fs-6 fw-normal mt-4">
                                <a href="#">Explore our products <ArrowRightAltOutlinedIcon /> </a>
                                &nbsp; &nbsp; &nbsp;
                                <a href="#">Try Kite demo <ArrowRightAltOutlinedIcon /></a>
                            </div>
                        </div>
                    </div>
                    <div className="press text-center my-5">
                        <img src={pressImg} alt="press images" className="img-fluid" />
                    </div>
                </div>
            </section>
        </>
    );
}