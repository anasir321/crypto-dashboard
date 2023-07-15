// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const stockApiBaseUrl = 'https://financialmodelingprep.com/api/v3';
// const apiKey = '19f1eac95fed2cc5cfc92d288592c3e2';

// const stockApiHeaders = {
//   'Content-Type': 'application/json',
// };

// const createRequest = (url) => ({ url, headers: stockApiHeaders });

// export const stockApi = createApi({
//   reducerPath: 'stockApi',
//   baseQuery: fetchBaseQuery({ baseUrl: stockApiBaseUrl }),
//   endpoints: (builder) => ({
//     getStocks: builder.query({
//       query: () => createRequest(`/stock/list?apikey=${apiKey}`),
//     }),
//   }),
//   onError: (err) => {
//     console.error('API request error:', err);
//   },
// });


// export const { useGetStocksQuery } = stockApi;

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const API_URL = 'https://financialmodelingprep.com/api/v3/';
const API_KEY = '19f1eac95fed2cc5cfc92d288592c3e2';

export const stockApi = (count) => {
  const [stocksList, setStocksList] = useState();

  const fetchStocksList = async () => {
    const url = `${API_URL}/stock/list?apikey=${API_KEY}`;
    const response = await axios.get(url);
    console.log(response);

    if (response.status === 200) {
      setStocksList(response.data);
    }
  };

  useEffect(() => {
    fetchStocksList();
  }, [count]);

  console.log(stocksList);

  return { stocksList };
};
