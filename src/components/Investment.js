import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';

function Investment({ investments, removeInvestment, updateInvestment }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateInvestment(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })

    }

    if (edit.id) {
        return <InvestmentForm edit={edit} onSubmit={submitUpdate} />
    }

    return investments.map((investment, index) => {
        return <div key={index}>
            Symbol: {investment.value.symbol}
            <br></br>
            Shares: {investment.value.shares}
            <br></br>
            Bought: {investment.value.date}
            <div>
                <button onClick={() => removeInvestment(investment.id)}>
                    Delete
                </button>
                {/* <button onClick={() => setEdit({ id: investment.id, value: investment.value})}>
                    Edit
                </button> */}
            </div>
        </div>
    })
};

export default Investment;