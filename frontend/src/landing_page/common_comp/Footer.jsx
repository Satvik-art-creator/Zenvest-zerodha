import "./styles/footer.css"
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

export default function Footer() {
    return (
        <>
            <footer className="w-100 py-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 mb-4 mb-lg-0">
                            <h3 className="pb-3">ZENVEST</h3>
                            <div className="details">
                                <p>&copy; 2010 - 2025, Zerodha Broking Ltd.</p>
                                <p>All rights reserved.</p>
                            </div>

                            <div className="icons pt-2">
                                <a href="#">
                                    <XIcon />
                                </a>
                                <a href="#">
                                    <FacebookIcon />
                                </a>
                                <a href="#">
                                    <InstagramIcon />
                                </a>
                                <a href="#">
                                    <LinkedInIcon />
                                </a>
                                <hr />
                                <a href="#">
                                    <YouTubeIcon />
                                </a>
                                <a href="#">
                                    <WhatsAppIcon />
                                </a>
                                <a href="#">
                                    <TelegramIcon />
                                </a>   
                            </div>
                        </div>

                        <div className="col-6 col-md-2 mb-4 mb-lg-0">
                            <h4>Account</h4>
                            <div className="acc_links">
                                <a href="" className="nav-link">
                                    <p>Open demat account</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Minor demat account</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>NRI demat account</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Commodity</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Dematerialisation</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Fund Transfer</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>MTF</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Referral Program</p>
                                </a>
                            </div>
                        </div>

                        <div className="col-6 col-md-2 mb-4 mb-lg-0">
                            <h4>Support</h4>

                            <div className="supp_links">
                                <a href="" className="nav-link">
                                    <p>Contact us</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Support portal</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>How to file a complaint?</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Status of your complaints</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Bulletin</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Circular</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Z-connect Blog</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Downloads</p>
                                </a>
                            </div>
                        </div>

                        <div className="col-6 col-md-2 mb-4 mb-lg-0">
                            <h4>Company</h4>

                            <div className="comp_links">
                                <a href="" className="nav-link">
                                    <p>About</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Philosphy</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Press & media</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Careers</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Zerodha Cases (CSR)</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Zerodha.tech</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Open Source</p>
                                </a>
                            </div>
                        </div>

                        <div className="col-6 col-md-2 mb-4 mb-lg-0">
                            <h4>Quick Links</h4>

                            <div className="quick_links">
                                <a href="" className="nav-link">
                                    <p>Upcoming IPOs</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Brokerage Charges</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Market holidays</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Economic Calender</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Calculators</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Markets</p>
                                </a>
                                <a href="" className="nav-link">
                                    <p>Sectors</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}