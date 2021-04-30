import React, { useState } from 'react';

function InvestmentForm({ onSubmit } ) {
        const [input, setInput] = useState({
            symbol: "",
            shares: ""
        });

        const handleChange = e => {
            let value = e.target.value;
            setInput({
                ...input,
                [e.target.name]: value
            })
        }
    
        const handleSubmit = e => {
            e.preventDefault();
    
            onSubmit({
                id: Date.now(),
                value: input
            });
            setInput({
                symbol: "",
                shares: ""
            });
        }
    
        return (
            <div>
                <form className="investment-form" onSubmit={handleSubmit}>
                <label>
                        Symbol: 
                        <input
                            type='text'
                            placeHolder='Symbol'
                            value={input.symbol}
                            onChange={handleChange}
                            name='symbol'
                        />
                    </label>
                    <br></br>
                    <label>
                        Shares: 
                        <input
                            type='number'
                            placeHolder='Number of shares'
                            value={input.shares}
                            onChange={handleChange}
                            name='shares'
                        />
                    </label>
                    <br></br>
                    <button className='investment-button'>Add Investment</button>
                </form>
            </div>
        );
    };

    
export default InvestmentForm;