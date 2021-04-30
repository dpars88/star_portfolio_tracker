import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import Investment from './Investment';

function PortfolioList() {
    const [investments, setInvestments] = useState([]);

    const addInvestment = investment => {
        if (!investment.value) {
            return;
        }
        investment.value.symbol = investment.value.symbol.toUpperCase();

        const newInvestments = [investment, ...investments];
        setInvestments(newInvestments);
    };

    const removeInvestment = id => {
        const removedArr = [...investments].filter(investment => investment.id !== id);

        setInvestments(removedArr)
    };

    return (
        <div>
            <h4>Add investments to your portfolio list below by adding symbol, number of shares, and date (YYYY-MM-DD) purchased</h4>
            <InvestmentForm onSubmit={addInvestment} />
            <Investment
                investments={investments}
                removeInvestment={removeInvestment}
            />
        </div>
    );
}

export default PortfolioList;