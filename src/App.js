import './App.css';
import PortfolioList from './components/PortfolioList';

function App() {
  return (
    <div className="App">
      <h1>Portfolio List</h1>
      <PortfolioList/>
    </div>
  );
}

export default App;


// can have a single input area where the user will add stock symbols, amount of shares, and date bought
// will have a button that will "add" to the list of stocks in the portfolio
// once finished adding stocks to the portfolio will then hit a button to submit
// once submitted will return the stocks historical price, current price, portolfio allocation, and 
// initial/ending balance for portfolio