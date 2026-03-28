import "./styles/support.css"

export default function SupportPortal() {
    return (
        <>
            <section className="support">
                <div className="container">
                    <h5>Support Portal</h5>
                    <br /><br />
                    <div className="row">
                        <div className="col-md-6">
                            <p className="fs-4">Search for an answer or browse help topics to create a ticket</p>
                            <input type="text" placeholder="E.g. how do I activate F&O, why is my order getting rejected..." readOnly />
                            <br /><br />
                            <a href="#">Track account opening</a>
                            <a href="#">Track segment activation</a>
                            <a href="#">Intraday margins</a>
                            <a href="#">Kite user manual</a>
                        </div>
                        <div className="col-md-6">
                            <p className="fs-4">Featured</p>
                            <ol>
                                <li><a href="#">Current takeovers and Delisting - January 2025</a></li>
                                <br />
                                <li><a href="#">Latest Intraday leverages - MIS & CO</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}