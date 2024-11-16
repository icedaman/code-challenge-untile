import { useState } from 'react';
import Select from './Select';
import Button from './Button';
import { getCoinOptions, getCoinTickersByExchange, getExchangeOptions } from '../api/apiCalls';
import Card from './Card';

function Tickers() {
  const coinOptions = getCoinOptions();
  const exchangesOptions = getExchangeOptions();
  const [coinToSearch, setCoinToSearch] = useState(coinOptions[0].symbol);
  const [market, setMarket] = useState(exchangesOptions[0].name);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchBtn = () => {
    const currencyToConvert = coinOptions.filter(coin => coin.symbol === coinToSearch.toLowerCase())[0].name;
    getCoinTickersByExchange(currencyToConvert, market, setResults, setIsLoading, setError);
  }
  
  return (
    <div className='w-full mx-auto text-center bg-[#F4F4F1]'>
      <h1 className='text-[#21639C] font-bold text-[40px] mt-20 mb-20 uppercase'>tickers</h1>
      <div className='w-full flex justify-center items-center'>
        <div className='relative'>
          <label htmlFor="from" className='text-[#21639C] font-semibold absolute -top-7 left-5'>Coin</label>
          <Select value={coinToSearch} setterFn={(e)=> setCoinToSearch(e.target.value)}>
            {coinOptions?.map(coin => (
              <option key={coin.symbol}>{coin.symbol.toUpperCase()}</option>
            ))}
          </Select>
          <label htmlFor="from" className='text-[#21639C] font-semibold ml-5 absolute -top-7'>Market</label>
          <Select value={market} setterFn={(e)=> setMarket(e.target.value)}>
            {exchangesOptions?.map(ex => (
              <option key={ex.id}>{ex.name}</option>
            ))}
          </Select>
        </div>
        <Button handleClick={handleSearchBtn} text={'Search'} />
      </div> 
      <div className='w-full mt-20 pb-20'>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching data: {error}</div>}

        {results && results?.filter(res => res.base.toLowerCase() === coinToSearch.toLowerCase() || res.target.toLowerCase() === coinToSearch.toLowerCase())?.map(res => (
          <Card key={res.base + res.target + res.market.name} results={res} />
        ))}
      </div>
    </div>
  )
}

export default Tickers;