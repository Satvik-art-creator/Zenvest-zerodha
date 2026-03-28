import priceImg from "./images/pricing0.svg"
import priceEqImg from "./images/pricingEquity.svg"
import priceMFImg from "./images/pricingMF.svg"

export default function Charges() {
    return (
        <>
            <section className="text-center">
                <h2>Charges</h2>
                <p className="fs-5" style={{"color": "gray"}}>List of all charges and taxes</p>

                <div className="container my-5">
                    <div className="row">
                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <img src={priceImg} alt="pricing image" className="img-fluid" style={{ maxHeight: "200px" }} />
                            <h3>Free equity delivery</h3>
                            <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                        </div>

                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <img src={priceEqImg} alt="pricing image" className="img-fluid" style={{ maxHeight: "200px" }} />
                            <h3>Intraday and F&O trades</h3>
                            <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                        </div>

                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <img src={priceMFImg} alt="pricing image" className="img-fluid" style={{ maxHeight: "200px" }} />
                            <h3>Free direct MF</h3>
                            <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}