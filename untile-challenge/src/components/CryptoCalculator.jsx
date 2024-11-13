/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import arrow from '../assets/arrow-to.png';
import Select from './Select';
import Button from './Button';
import { getCoinOptions, getConversionRate, fetchSupportedCurrencies } from '../api/apiCalls';

function CryptoCalculator({ history, setHistory }) {
  const coinOptions = getCoinOptions();
  const [currencysList, setCurrencysList] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertBtn = async () => {
    if (!inputAmount || inputAmount <= 0) return;
    getConversionRate(inputAmount, fromCurrency, toCurrency, setIsLoading, setError, setHistory);
  }

  useEffect(() => {
    fetchSupportedCurrencies(setCurrencysList, setFromCurrency, setToCurrency);
  }, []);

  return (
    <div className='w-full mx-auto text-center'>
      <h1 className='text-[#21639C] font-bold text-[40px] mt-20 mb-20 uppercase'>Crypto Calculator</h1>
      <div className='w-full flex justify-center items-center'>
        <div className='relative'>
          <label htmlFor="from" className='text-[#21639C] absolute -top-7 font-semibold'>From</label>
          <input type="number" placeholder="0.00" required name="from" id="from" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
            className='w-[192px] h-[64px] pl-5 mr-5 border-[#E0E0D7] bg-white text-[#353A3E] text-[24px] rounded-lg' 
          />
          <Select setterFn={(e)=> setFromCurrency(e.target.value)} value={fromCurrency}>
            {coinOptions?.map((option) => (
              <option key={option.symbol} value={option.symbol}>
                {option.symbol.toUpperCase()}
              </option>
            ))}
          </Select>
        </div>
        <img src={arrow} alt=""  className='w-10 h-10 mx-5'/>
        <div className='relative'>
          <label htmlFor="to" className='text-[#21639C] absolute -top-7 left-5 font-semibold'>To</label>
          <Select setterFn={(e)=> setToCurrency(e.target.value)} value={toCurrency}>
            {currencysList?.filter(coin => coin !== fromCurrency ).map((coin) => (
              <option key={coin} value={coin}>{coin.toUpperCase()}</option>
            ))}
          </Select>
        </div>
        <Button handleClick={handleConvertBtn} text={'Convert'} />          
      </div>
      <div className='w-full flex justify-center items-center flex-col'>
        <h1 className='text-[#21639C] font-bold text-[16px] mt-20 mb-10 uppercase w-full'>Result</h1>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching data: {error} </div>}

        <div className='w-full ml-10'>
          {history?.sort((a, b) => b.id - a.id).filter((rec, i) => i === 0).map(rec => (
            <p key={rec} className=' text-[#454B51] text-[24px] mb-5'>
              <span className='text-[#353A3E] font-bold uppercase pr-3'>{rec.amountToConvert} {rec.currencyToConvert}</span>
                is worth
              <span className='text-[#353A3E] font-bold uppercase pl-3'>{rec.amountConverted} {rec.currencyConverted}</span>
            </p>
          ))}

          {history?.sort((a,b) => b.id - a.id).map((rec, i) => (
            <p key={i} className='text-[18px] text-[#5F5F5B] font-bold uppercase mb-3'>
              {rec.amountToConvert} {rec.currencyToConvert}
              <span className='font-normal px-3 lowercase'>is worth</span>
              {rec.amountConverted} {rec.currencyConverted}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CryptoCalculator;