import WatchListActions from "./WatchListActions"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const WatchListItem = ({stock, key, setActionState, setStockState, stockState, setSelectedStock}) => {
    return (
        <li key={key} className="py-4">
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className="itemInfo d-inline" style={{"float": "right"}}>
                    <span>{stock.percent}</span>
                    {
                        stock.isDown ? (
                            <KeyboardArrowDownIcon className="down" />
                        ) : (
                            <KeyboardArrowUpIcon className="up" />
                        )
                    }
                    <span>{stock.price}</span>
                </div>
                <div className="itemActions">
                    <WatchListActions setActionState={setActionState} stockState={stockState} setStockState={setStockState} stockData={stock} setSelectedStock={setSelectedStock} />
                </div>
            </div>
        </li>
    );
}

export default WatchListItem;