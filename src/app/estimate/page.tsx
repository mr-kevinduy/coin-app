'use client';

import { useState, useEffect } from 'react';
import EstimateRow from '../ui/EstimateRow';
import EstimateRowTitle from '../ui/EstimateRowTitle';

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const depositTotalCalc = (d, u_rate, d_fee) => (((d / u_rate) - d_fee).toFixed(2));
const depositCalc = (d, u_rate, d_fee) => (((d + d_fee) * u_rate).toFixed(2));
const buyTotalCalc = (b_price, b_amount, b_fee) => (((b_price * b_amount) - (b_price * b_fee)).toFixed(2));
const sellTotalCalc = (s_price, s_amount, s_fee) => (((s_price * s_amount) - s_fee).toFixed(2));
const percentCalc = (b_price, s_price) => (((s_price - b_price) * 100 / b_price).toFixed(2));
const profitCalc = (b_price, s_amount, percent) => ((b_price * s_amount * percent / 100).toFixed(2));
const amountCalc = (d_total, b_price, b_fee) => ((d_total / b_price).toFixed(10));
// const amountCalc = (d_total, b_price, b_fee) => (((d_total / b_price) - (b_price * b_fee)).toFixed(10));
const usdtToVND = (value, rate) => numberWithCommas((value * rate).toFixed(0));

const formDefault = {
  deposit_total: 0,
  deposit: 300000,
  deposit_fee: 0.05,
  usdt_rate: 25896,
  buy_price: 1.2547,
  buy_fee: 0.0091,
  sell_price: 1.4,
  sell_fee: 0.0126,
};

export default function EstimatePage() {
  const [form, setForm] = useState(formDefault);

  useEffect(() => {
    let newDepositTotal = depositTotalCalc(form.deposit, form.usdt_rate, form.deposit_fee);
    setForm(prev => ({ ...prev, deposit_total: newDepositTotal }));
  }, []);

  const handleChange = (event) => {
    const { name, value: val } = event.target;

    setForm(prev => ({ ...prev, [name]: parseFloat(val) }));
  };

  const handleDepositChange = (event) => {
    const { name, value: val } = event.target;

    console.log('val: ',parseFloat(val));
    console.log('usdt_rate: ',form.usdt_rate);
    console.log('deposit_fee: ',form.deposit_fee);
    if (name === 'deposit_total') {
      const newDeposit = depositCalc(parseFloat(val), form.usdt_rate, form.deposit_fee);
      console.log('newDeposit:', newDeposit);
      setForm(prev => ({ ...prev, [name]: parseFloat(val), deposit: newDeposit }));
    } else if (name === 'deposit') {
      const newDepositTotal = depositTotalCalc(parseFloat(val), form.usdt_rate, form.deposit_fee);
      setForm(prev => ({ ...prev, [name]: parseFloat(val), deposit_total: newDepositTotal }));
    }
  };

  let depositTotal = depositTotalCalc(form.deposit, form.usdt_rate, form.deposit_fee);
  let amount = amountCalc(depositTotal, form.buy_price, form.buy_fee);
  let buyTotal = buyTotalCalc(form.buy_price, amount, form.buy_fee);
  let sellTotal = sellTotalCalc(form.sell_price, amount, form.sell_fee);
  let percent = percentCalc(form.buy_price, form.sell_price);
  let profit = profitCalc(form.buy_price, amount, percent);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <h1 className="block text-center font-sans text-lg antialiased font-bold leading-bold text-blue-gray-900 bg-gray-300">Finance Estimate</h1>

          <table className="w-full text-left table-auto min-w-max">
            <tbody>
              <EstimateRowTitle
                text="Deposit (Nạp tiền)"
                value={depositTotal}
                suffixText="USDT"
              />

              <EstimateRow
                className="font-bold leading-bold"
                name="deposit_total"
                lable="Deposit (USDT)"
                suffixText="USDT"
                value={form.deposit_total}
                onChange={handleDepositChange}
              />

              <EstimateRow
                className="bg-yellow-100"
                name="deposit"
                lable="Deposit (VND)"
                suffixText="VND"
                value={form.deposit}
                onChange={handleDepositChange}
              />

              <EstimateRow
                name="usdt_rate"
                lable="USDT Rate"
                suffixText="VND"
                value={form.usdt_rate}
                onChange={handleChange}
              />

              <EstimateRow
                name="deposit_fee"
                lable="Deposit Fee"
                suffixText="USDT"
                value={form.deposit_fee}
                onChange={handleChange}
              />

              <EstimateRowTitle
                text="Buy"
                value={`- Amount: ${amount} - Total: ${buyTotal}`}
                suffixText="USDT"
              />

              <EstimateRow
                className="bg-yellow-100"
                name="buy_price"
                lable="Buy Price"
                suffixText="USDT"
                value={form.buy_price}
                onChange={handleChange}
              />

              <EstimateRow
                name="buy_fee"
                lable="Buy Fee"
                suffixText="COIN"
                value={form.buy_fee}
                onChange={handleChange}
              />

              <EstimateRowTitle
                text="Sell"
                value={sellTotal}
                suffixText="USDT"
              />

              <EstimateRow
                className="bg-yellow-100"
                name="sell_price"
                lable="Sell Price"
                suffixText="USDT"
                value={form.sell_price}
                onChange={handleChange}
              />

              <EstimateRow
                name="sell_fee"
                lable="Sell Fee"
                suffixText="USDT"
                value={form.sell_fee}
                onChange={handleChange}
              />

              <EstimateRowTitle
                text="Percent"
                value={percent}
                suffixText="%"
              />
              <EstimateRowTitle
                text="Finance (Đầu tư)"
                value={`${depositTotal} USDT ~ ${numberWithCommas(form.deposit)} VND`}
              />
              <EstimateRowTitle
                text="Profit (Lợi nhuận)"
                value={`${profit} USDT ~ ${usdtToVND(profit, form.usdt_rate)} VND`}
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
