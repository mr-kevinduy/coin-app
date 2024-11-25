'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

type CurrencyQuote = {
  market_cap: number;
  price: number;
  fully_diluted_market_cap: number;
  market_cap_dominance: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  last_updated: number;
};

interface CurrencyQuoteRecord {
   [key: string]: CurrencyQuote
}

type Currency = {
  id: number;
  slug: string;
  name: string;
  symbol: string;
  date_added: string;
  last_updated: string;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  num_market_pairs: number;
  // quote: CurrencyQuoteRecord;
  market_cap: number;
  price: number;
  fully_diluted_market_cap: number;
  market_cap_dominance: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
};

type TableHeaderItem = {
  name: string;
  label: string;
  order: string;
};

let initialHeader: TableHeaderItem[] = [
  {name: 'id', label: 'ID', order: 'desc'},
  {name: 'name', label: 'Name', order: 'desc'},
  {name: 'market_cap', label: 'Market cap', order: 'desc'},
  {name: 'volume_24h', label: 'Volume(24h)', order: 'desc'},
  {name: 'price', label: 'Price', order: 'desc'},
  {name: 'date_added', label: 'Published Date', order: 'desc'},
];

let initialSorting = {
  name: 'volume_24h',
  order: 'desc'
};

export default function HomePage() {
  const [sorting, setSorting] = useState(initialSorting);
  const [header, setHeader] = useState(initialHeader);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // let fetchListRes = await fetch('https://www.binance.com/bapi/apex/v1/public/apex/marketing/symbol/list');
      let fetchListRes = await fetch('https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-products?includeEtf=true');
      let listRes = await fetchListRes.json();

      console.log(listRes.data);

      let fetchRes = await fetch('https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/listings/latest?limit=100&start=1');
      let res = await fetchRes.json();

      if (res && 'success' in res && res.success) {
        const data = res.data.body.data.map((value: any) => flattenObj(value));
        // console.log(data);
        setItems(data);
        setSorting({...{name: 'market_cap', order: 'desc'}});
      }
    }

    fetchData();
  }, []);

  const handlSort = (sortBy: string) => {
    if (! items.length) {
      return;
    }

    // Get current sort column.
    const nextHeader = [...header];
    const headerItem:any|TableHeaderItem = nextHeader.find((value: TableHeaderItem): boolean => (value.name === sortBy));
    headerItem.order = (headerItem.order === 'desc') ? 'asc' : 'desc';

    // Sort data
    const nextItems = [...items];
    nextItems.sort(function(a, b) {
      if (headerItem.order === 'asc') {
        return sortAny(a[sortBy], b[sortBy]);
      }

      if (headerItem.order === 'desc') {
        return sortAny(b[sortBy], a[sortBy]);
      }

      return 0;
    });

    setItems(nextItems);
    setHeader(nextHeader);
    setSorting({...{name: sortBy, order: headerItem.order}});
  }

  function flattenObj(obj: any) {
    let newObj:any = {};
    Object.keys(obj).forEach(function(key, index) {
      if (key !== 'quote') {
        newObj[key] = obj[key];
      } else {
        newObj = {...newObj, ...obj['quote']['USD']};
      }
    });

    return newObj;
  }

  function sortAny(a: any, b: any) {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  };

  function nativeDate(value: string) {
    var d = new Date(value);

    return d.toLocaleString('en-US', { timeZone: 'America/New_York' });
  }

  function nativeCurrency (n: number) {
    const value = (Math.round(n * 10000000) / 10000000).toFixed(7);

    // Nine Zeroes for Billions
    return Math.abs(Number(value)) >= 1.0e+9
      ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(value)) >= 1.0e+6
      ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(value)) >= 1.0e+3
      ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"
      : Math.abs(Number(value));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {header.map((value, index) => {
                  let activeClass = (value.name === sorting.name);

                  return (
                    <th
                      className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                      key={index}
                    >
                      <p
                        className="flex items-center font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
                        onClick={() => handlSort(value.name)}
                      >
                        {
                          value.order === 'desc'
                          ? (<svg className={activeClass ? "w-4 h-4 cursor-pointer text-black rotate-0" : "w-4 h-4 cursor-pointer text-[#BCBDBE] rotate-0"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>)
                          : (<svg className={activeClass ? "w-4 h-4 cursor-pointer text-black group-hover:text-black rotate-180 rotate-0" : "w-4 h-4 cursor-pointer text-[#BCBDBE] group-hover:text-black rotate-180 rotate-0"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>)
                        }
                        {value.label}
                      </p>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {items.map((item: Currency) => (
                <tr key={item.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {item.id}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                      <a href={`https://www.binance.com/en/price/${item.slug}`} target="_href">
                        {item.name} ({item.symbol})
                      </a>
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {nativeCurrency(item.market_cap)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {nativeCurrency(item.volume_24h)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {nativeCurrency(item.price)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {nativeDate(item.date_added)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
