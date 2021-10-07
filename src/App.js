import './App.css';
import CurrencyRow from './CurrencyRow';
import { useEffect, useState } from 'react';

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [amount, setAmount] = useState(1);
	const [fromCurrencyAmount, setfromCurrencyAmount] = useState(true);
	const [exchangeRate, setExchangeRate] = useState();
	const baseUrl = 'http://data.fixer.io/api/';
	let fromAmount, toAmount;

	if (fromCurrencyAmount) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setfromCurrencyAmount(true);
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setfromCurrencyAmount(false);
	}

	//console.log(currencyOptions)
	useEffect(() => {
		const url = `${baseUrl}latest?access_key=${process.env.REACT_APP_API_KEY}`;

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const firstCurrency = Object.keys(data.rates)[0];
				setCurrencyOptions([...Object.keys(data.rates)]);
				setFromCurrency(data.base);
				setToCurrency(firstCurrency);
				setExchangeRate(data.rates[firstCurrency]);
			})
			.catch((e) => console.log(e));
	}, []);

	useEffect(() => {
		console.log(fromAmount, toAmount);
		if (fromCurrency != null && toCurrency != null) {
			const url = `${baseUrl}convert?from=${fromCurrency}&to=${toCurrency}&amount=${fromAmount}&access_key=${process.env.REACT_APP_API_KEY}`;

			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					if (data.rates) setExchangeRate(data.rates[toCurrency]);
				})
				.catch((e) => console.log(e));
		}
	}, [fromCurrency, toCurrency]);

	return (
		<>
			<h1>Currency Converter</h1>
			<CurrencyRow
				id={'from'}
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onCurrencyChanged={(e) => setFromCurrency(e.target.value)}
				amount={fromAmount}
				onChangeAmount={handleFromAmountChange}
			></CurrencyRow>

			<div className="equal">=</div>

			<CurrencyRow
				id={'to'}
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onCurrencyChanged={(e) => setToCurrency(e.target.value)}
				amount={toAmount}
				onChangeAmount={handleToAmountChange}
			></CurrencyRow>
		</>
	);
}

export default App;
