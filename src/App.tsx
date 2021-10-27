import React, {useState} from 'react';
import './App.css';
import Select from 'react-select'

interface exchange {
    buy: string;
    sell: string;
}


interface exchange_recs {
    exchange_name: string;
    price: string;
}

interface Recommendations {
    coinbase: exchange;
    cex: exchange;
    best_buy_info: exchange_recs;
    best_sell_info: exchange_recs;

}


type SelectOption = {
    label: string
    value: string
}
function App() {
    const httpHandler = require('react-http-client');
    const[showRecs, setShowRecs] = useState(false);
    const [best_exchange_name_buy, setBestExchangeNameBuy] = useState("")
    const [best_exchange_name_buy_price, setBestExchangeNameBuyPrice] = useState("")
    const [best_exchange_name_sell, setBestExchangeNameSell] = useState("")
    const [best_exchange_name_sell_price, setBestExchangeNameSellPrice] = useState("")
    const options = [
        {value: 'BTC', label: 'Bitcoin'},
        {value: 'ETH', label: 'Etherium'},
    ]
    const isSelectOption = (v: any): v is SelectOption => {
        if ((v as SelectOption).value !== undefined) return v.value
        return false
    }


    const backendcall = async (url: string) => {
        const postResponse = await httpHandler.get(
           url
        );
        const result: Recommendations = postResponse
        setBestExchangeNameBuy(result.best_buy_info.exchange_name)
        setBestExchangeNameBuyPrice(result.best_buy_info.price)
        setBestExchangeNameSell(result.best_sell_info.exchange_name)
        setBestExchangeNameSellPrice(result.best_sell_info.price)
        setShowRecs(true)

        return;
    }

    const recs = () => {
        if(showRecs){
            return (
                <div>

                    <div>
                        <span>Best buy Exchange name :</span>
                        <input type='text'  required = {true} readOnly = {true} value={best_exchange_name_buy}/>
                    </div>

                    <div>
                        <span>Best buy Exchange price :</span>
                        <input type='text'  required = {true} readOnly = {true} value={best_exchange_name_buy_price}/>
                    </div>

                    <div>
                        <span>Best sell Exchange name :</span>
                        <input type='text'  required = {true} readOnly = {true} value={best_exchange_name_sell}/>
                    </div>
                    <div>
                        <span>Best sell Exchange price :</span>
                        <input type='text'  required = {true} readOnly = {true} value={best_exchange_name_sell_price}/>
                    </div>

                </div>
            )
        }

    }

    return (
        <form>
            <div className="App">
                <header className="App-header">
                    <div>
                        <h3> SELECT CRYPTO CURRENCY BELOW</h3>
                        <Select
                            options={options}
                            onChange={(v) => {
                                if (isSelectOption(v)) {
                                    const url = 'http://localhost:5000/crypto/v1/recommendations?ticker=' + v.value;
                                    backendcall(url)
                                }
                            }}
                        />
                        {recs()}
                    </div>
                </header>
            </div>
        </form>
    );
}

export default App;
