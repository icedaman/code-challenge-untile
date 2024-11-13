import axios from "axios";

const coinOptions = [
  {
    symbol: 'btc',
    name: 'bitcoin'
  },
  {
    symbol: 'eth',
    name: 'ethereum'
  },
  {
    symbol: 'sol',
    name: 'solana'
  },
  {
    symbol: 'xrp',
    name: 'ripple'
  },
];

export const getCoinOptions = () => coinOptions;

export const fetchSupportedCurrencies = async (setCurrencysList, setFromCurrency, setToCurrency) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`);
    setCurrencysList(response.data);
    setFromCurrency(response.data[0]);
    setToCurrency(response.data[1]);
  } catch (error) {
    console.log(error.message);
  }
}

export const getConversionRate = async (inputAmount, fromCurrency, toCurrency, setIsLoading, setError, setHistory) => {
  setIsLoading(true);
  const currencyToConvert = coinOptions.filter(coin => coin.symbol === fromCurrency.toLowerCase())[0].name;
  let exchangeRate = 0;

  try {
    const getExchangeRates = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currencyToConvert}&vs_currencies=${toCurrency}`);
    exchangeRate = getExchangeRates.data[currencyToConvert][toCurrency];
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
  
  addRecordToHistory(fromCurrency, inputAmount, toCurrency, exchangeRate, setHistory);
}

const addRecordToHistory = (currencyToConvert, inputAmount, toCurrency, exchangeRate, setHistory) => {
  const newRecord = {
    id: Date.now(),
    currencyToConvert: currencyToConvert,
    amountToConvert: inputAmount,
    currencyConverted: toCurrency,
    amountConverted: Number((inputAmount * exchangeRate).toFixed(2)),
  }

  setHistory(prevHistory => [...prevHistory, newRecord]);
}

export const getCoinTickersByExchange = async (currencyToConvert, market, setResults, setIsLoading, setError) => {
  setIsLoading(true); 
  try {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${currencyToConvert}/tickers?exchange_ids=${market}`)
    setResults(data.tickers);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
