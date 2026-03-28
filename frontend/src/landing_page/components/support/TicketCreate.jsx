import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LoopIcon from '@mui/icons-material/Loop';
import TollIcon from '@mui/icons-material/Toll';
import "./styles/ticket.css"

//quick links data
const accLinks = [
  "Online Account Opening",
  "Offline Account Opening",
  "Company, Partnership and HUF Account Opening",
  "NRI Account Opening",
  "Charges at Zenvest",
  "Getting Started",
];

const zenAccLinks = [
    "Login Credentials",
    "Account Modification and Segment Addition",
    "DP ID and bank details",
    "Your Profile",
    "Transfer and Coversion of shares"
];

const zenvAccLinks = [
    "Margin/Leverage, Product and Order types",
    "Kite Web and Mobile",
    "Trading FAQs",
    "Corporate Actions",
    "Sentinel",
    "Kite API",
    "Pi and other platforms",
    "Stockreports+",
    "GTT"
];

const fundsLinks = [
    "Adding Funds",
    "Fund Withdrawal",
    "eMandates",
    "Adding Bank Accounts"
];

const consoleLinks = [
    "Reports",
    "Ledger",
    "Portfolio",
    "60 Day Challenge",
    "IPO",
    "Referral Program"
];

const coinLinks = [
    "Understanding Mutual Funds",
    "About Coin",
    "Buying and Selling",
    "Starting an SIP",
    "Managing your Portfolio",
    "Coin App",
    "Moving to Coin"
];

const QuickLinks = ({ icon, title, dataLinks }) => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="d-flex align-items-baseline p-0">
            <span>{icon}</span>&nbsp;<h5 className="d-inline">{title}</h5>
        </div>
        <br />
        <ul className="mt-2">
            {dataLinks.map((el, idx) => {
                return (<li key={idx}><a href="#">{el}</a></li>);
            })}
        </ul>
      </div>
    </>
  );
};

export default function TicketCreate() {
  return (
    <>
      <section className="ticket">
        <div className="container">
          <h4 className="py-5">To create a ticket, select a relevant topic</h4>

          <div className="row">
            <QuickLinks
              icon={<AddCircleOutlineIcon />}
              title="Account Opening"
              dataLinks={accLinks}
            />

            <QuickLinks
              icon={<AccountCircleIcon />}
              title="Your Zenvest Account"
              dataLinks={zenAccLinks}
            />

            <QuickLinks
              icon={<GraphicEqIcon />}
              title="Your Zenvest Account"
              dataLinks={zenvAccLinks}
            />

            <QuickLinks
              icon={<CreditCardIcon />}
              title="Funds"
              dataLinks={fundsLinks}
            />

            <QuickLinks
              icon={<LoopIcon />}
              title="Console"
              dataLinks={consoleLinks}
            />

            <QuickLinks
              icon={<TollIcon />}
              title="Coin"
              dataLinks={coinLinks}
            />
          </div>
        </div>
      </section>
    </>
  );
}
