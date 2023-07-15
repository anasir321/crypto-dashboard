import React, { useEffect, useState, useRef } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { stockApi } from '../services/stockApi';
import Loader from './Loader';

const SAndP500Stocks = () => {
  const count = 10;
  const { data: stocksList, isFetching } = stockApi(count);
  const [stocks, setStocks] = useState();
  const stocksRef = useRef(null);

  console.log('stocksList', stocksList);

  useEffect(() => {
    stocksRef.current = stocksList;
  }, [stocksList]);

  useEffect(() => {
    setStocks(stocksRef.current?.data?.companies);
  }, [stocksRef]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]} className="stock-card-container">
        {stocks?.map((stock) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="stock-card"
            key={stock.ticker}
          >

            {/* Note: Change stock.id to stock.ticker  */}
            <Link key={stock.ticker} to={`/stock/${stock.ticker}`}>
              <Card
                title={`${stock.rank}. ${stock.name}`}
                extra={<img className="stock-image" src={stock.logo} />}
                hoverable
              >
                <p>Price: {millify(stock.price)}</p>
                <p>Market Cap: {millify(stock.marketCap)}</p>
                <p>Daily Change: {stock.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SAndP500Stocks;