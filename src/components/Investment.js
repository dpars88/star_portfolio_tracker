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
        return (
        <div key={index}>
            Symbol: {investment.value.symbol}
            <br></br>
            Shares: {investment.value.shares}
            <div>
                <button onClick={() => removeInvestment(investment.id)}>
                    Delete
                </button>
            </div>
        </div>
        )
    })
};

export default Investment;