// import React from 'react';
// import { Typography, Row, Col, Statistic } from 'antd';
// import { useGetStocksQuery } from '../services/stockApi';
// import Loader from './Loader';
// import StockList from './StockList';

// const StocksPage = () => {
//   const { data, isFetching } = useGetStocksQuery();

//   console.log(data)

//   if (isFetching) {
//     return <Loader />;
//   }

//   const stocks = data || [];

//   return (
//     <div>
//       <Typography.Title level={2} className="heading">
//         S&P 500 Stocks
//       </Typography.Title>
//       <Row gutter={[32, 32]}>
//         <Col span={12}>
//           <Statistic title="Total Stocks" value={stocks.length} />
//         </Col>
//         {/* Add more statistics here as needed */}
//       </Row>
//       <div className="home-heading-container">
//         <Typography.Title level={2} className="home-title">
//           Top 10 Stocks
//         </Typography.Title>
//         {/* Add a link to a dedicated stocks page if desired */}
//       </div>
//       <StockList stocks={stocks.slice(0, 10)} />
//     </div>
//   );
// };


// export default StocksPage;
