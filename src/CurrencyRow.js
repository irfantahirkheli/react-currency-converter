import React from 'react';

export default function CurrencyRow(props) {
	const {
		id,
		currencyOptions,
		selectedCurrency,
		onCurrencyChanged,
		amount,
		onChangeAmount,
	} = props;

	return (
		<div>
			<input
				type="number"
				className="input"
				value={amount}
				onChange={onChangeAmount}
			></input>
			<select id={id} value={selectedCurrency} onChange={onCurrencyChanged}>
				{currencyOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}
