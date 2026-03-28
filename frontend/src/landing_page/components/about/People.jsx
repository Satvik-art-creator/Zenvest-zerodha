import myImg from "./images/img.jpeg";

export default function People() {
  return (
    <>
      <section style={{"margin-bottom": "4rem"}}>
        <div className="container">
          <div className="row d-flex align-items-center">
            <h3
              className="text-center mb-5"
              style={{ "padding-bottom": "5rem" }}
            >
              People
            </h3>
            <div className="col-12 col-md-6 text-center mb-5 mb-md-0">
              <img
                src={myImg}
                alt="ceo image"
                className="img-fluid rounded-circle"
                style={{ width: "15rem", height: "15rem" }}
              />
              <p className="fs-5 mt-2">Satvik Rastogi</p>
              <p className="fs-6" style={{ color: "gray" }}>
                Founder, CEO
              </p>
            </div>
            <div className="col-12 col-md-6">
              <p>
                Satvik bootstrapped and founded Zenvest in 2010 to overcome the
                hurdles he faced during his decade long stint as a trader.
                Today, Zenvest has changed the landscape of the Indian broking
                industry.
              </p>
              <p>Watching series and anime are his zen.</p>
              <p>
                Connect on <a href="/">Homepage</a> / <a href="#">TradingQnA</a>{" "}
                / <a href="#">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
