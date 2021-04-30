/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import Investment from './Investment';
import config from './config.json';
const axios = require('axios');
const params = {
  access_key: config.API_KEY
}

function PortfolioList() {
    const [investments, setInvestments] = useState([]);
    const [date, setDate] = useState("");
    const [results, setResults] = useState([])

    // function to add investments to list
    const addInvestment = investment => {
        if (!investment.value) {
            return;
        }
        investment.value.symbol = investment.value.symbol.toUpperCase();

        const newInvestments = [investment, ...investments];
        setInvestments(newInvestments);
    };

    // function to remove investment from list
    const removeInvestment = id => {
        const removedArr = [...investments].filter(investment => investment.id !== id);

        setInvestments(removedArr)
    };

    // function to handle adding date
    const handleDate = e => {
        setDate(e.target.value);
    };

    // function to handle button click to return to portfolio list
    const clearResult = e => {
        e.preventDefault();
        setResults([])
    }
    
    const fetchData = async (e) => {
            e.preventDefault()
            let symbolShares = {};
            let current = date;
            let limit = investments.length;
            let symbols = investments.map((investment) => {
                let symbol = investment.value.symbol;
                let shares = investment.value.shares
                symbolShares[symbol] = shares;
                return investment.value.symbol;
            })
            symbols = symbols.join()
            // fetch informaiton for historical date
            const res = await axios.get(`http://api.marketstack.com/v1/eod/${current}?&symbols=${symbols}`, {params});
            // fetch information for most current date
            const resTwo = await axios.get(`http://api.marketstack.com/v1/eod?&symbols=${symbols}&limit=${limit}`, {params});
            let oldTotal = [];
            let currentTotal = [];
            let portoflioResults = {
                startDate: current,
                initialBalance: '',
                currentBalance: '',
                difference: ''
            }
            // map through result data and mulitply share price by number of shares, then add all up
            res.data.data.map((item, index) => {
                let symbol = item.symbol;
                let shares = symbolShares[symbol];
                let value = shares * item.close;
                oldTotal.push(value);
                if (index === res.data.data.length - 1) {
                    oldTotal = oldTotal.reduce((a, b) => a + b)
                }
            })
            // map through result data and mulitply share price by number of shares, then add all up
            resTwo.data.data.map((item, index) => {
                let symbol = item.symbol;
                let shares = symbolShares[symbol];
                let value = shares * item.close;
                currentTotal.push(value);
                if (index === resTwo.data.data.length - 1) {
                    currentTotal = currentTotal.reduce((a, b) => a + b)
                }
            })
            // set values on premade object that will be used to display fetched data
            portoflioResults.initialBalance = Number(oldTotal.toFixed(2));
            portoflioResults.currentBalance = Number(currentTotal.toFixed(2));
            portoflioResults.difference = Number((currentTotal - oldTotal).toFixed(2));
            setResults([portoflioResults])
    }
        

    return (
        <div>
            {results.length > 0 ? (
            <div>
                <h2>Your Portfolio</h2>
                <ul style={{listStyle: "none"}}>
                    <li> Start Date: {results.map(item => item.startDate)}</li>
                    <br></br>
                    <li> Initial Balance: {results.map(item => item.initialBalance)}</li>
                    <br></br>
                    <li> Current Balance: {results.map(item => item.currentBalance)}</li>
                    <br></br>
                    <li> Difference: {results.map(item => item.difference)}</li>
                </ul>
                <button onClick={clearResult}>Return to Portfolio</button>
            </div>
            ) : (
            <div>
                <h4>Add investments to your portfolio list below by adding symbol and number of shares</h4>
                <InvestmentForm onSubmit={addInvestment} />
                <Investment
                    investments={investments}
                    removeInvestment={removeInvestment}
                />
                <h4>Choose Date (YYYY-MM-DD) Max 1 Year From Today and Submit</h4>
                <div>
                    <form onSubmit={fetchData}>
                    <label>
                        Date: 
                        <input
                            type='text'
                            placeHolder='YYYY-MM-DD'
                            value={date}
                            onChange={handleDate}
                            name='date'
                        />
                    </label>
                    <button className='date-button'>Submit</button>
                    </form>
                </div>
            </div>
            )}
            </div>
    );
}

export default PortfolioList;