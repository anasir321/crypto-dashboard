// import React, { useState } from "react";
// import millify from "millify";
// import { Typography, Row, Col, Statistic } from "antd";
// import { Link } from "react-router-dom";

// import { useGetCryptosQuery } from "../services/cryptoApi";
// import Cryptocurrencies from "./Cryptocurrencies";
// import Loader from "./Loader";
// import { Bar } from "react-chartjs-2";

// const { Title } = Typography;

// // const ChartToggle = ({ onToggle }) => {
// //   return (
// //     <button onClick={onToggle}>
// //       Show {chartDataType === 'marketCap' ? 'Price Change' : 'Market Cap'}
// //     </button>
// //   );
// // };
// // const ChartToggle = ({ chartDataType, onToggle }) => {
// //   return (
// //     <button onClick={onToggle}>
// //       Show {chartDataType === 'marketCap' ? 'Price Change' : 'Market Cap'}
// //     </button>
// //   );
// // };
// const ChartToggle = ({ chartDataType, onToggle }) => {
//   const handleClick = () => {
//     onToggle();
//   };

//   return (
//     <button onClick={handleClick}>
//       Show {chartDataType === "marketCap" ? "Price Change" : "Market Cap"}
//     </button>
//   );
// };

// const Homepage = () => {
//   const { data, isFetching } = useGetCryptosQuery(10);
//   const globalStats = data?.data?.stats;

//   const topCryptos = data?.data?.coins;

//   const [chartDataType, setChartDataType] = useState("marketCap");

//   const toggleChartDataType = () => {
//     setChartDataType((prevType) =>
//       prevType === "marketCap" ? "priceChange" : "marketCap"
//     );
//   };

//   if (isFetching || !topCryptos) {
//     return <Loader />;
//   }

//   const chartData = {
//     labels: topCryptos.map((crypto) => crypto.name),
//     datasets: [
//       {
//         label: chartDataType === "marketCap" ? "Market Cap" : "Price Change",
//         data: topCryptos.map((crypto) =>
//           chartDataType === "marketCap" ? crypto.marketCap : crypto.change
//         ),
//         backgroundColor: "#0071bd", // Change the color as desired
//       },
//     ],
//   };

//   // Configuration options for the bar chart
//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => {
//             if (chartDataType === "marketCap") {
//               return `$${millify(value)}`;
//             }
//             return `${millify(value)}%`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <Title level={2} className="heading">
//         Global Crypto Stats
//       </Title>
//       <Row gutter={[32, 32]}>
// <Col span={12}>
//   <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
// </Col>
// <Col span={12}>
//   <Statistic
//     title="Total Exchanges"
//     value={millify(globalStats.totalExchanges)}
//   />
// </Col>
// <Col span={12}>
//   <Statistic
//     title="Total Market Cap:"
//     value={`$${millify(globalStats.totalMarketCap)}`}
//   />
// </Col>
// <Col span={12}>
//   <Statistic
//     title="Total 24h Volume"
//     value={`$${millify(globalStats.total24hVolume)}`}
//   />
// </Col>
// <Col span={12}>
//   <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
// </Col>
// <Col span={12}>
//   <Statistic
//     title="Total Markets"
//     value={millify(globalStats.totalMarkets)}
//   />
// </Col>
//       </Row>
//       <div className="home-heading-container">
// <Title level={2} className="home-title">
//   Top 10 Cryptos In The World
// </Title>
// <Title level={3} className="show-more">
//   <Link to="/cryptocurrencies">Show more</Link>
// </Title>
//       </div>
//       <Cryptocurrencies simplified />
//       <div className="bar-chart-container">
//         <Bar data={chartData} options={chartOptions} />
//         <ChartToggle
//           chartDataType={chartDataType}
//           onToggle={toggleChartDataType}
//         />
//       </div>
//     </>
//   );
// };

// export default Homepage;
import React, { useState } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Select } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";
import { Bar } from "react-chartjs-2";

const { Title } = Typography;
const { Option } = Select;

const ChartToggle = ({ chartDataType, onToggle }) => {
  const handleSelect = (value) => {
    onToggle(value);
  };

  return (
    <Select
      defaultValue="marketCap"
      onChange={handleSelect}
      style={{ width: 200, marginBottom: 16 }}
    >
      <Option value="marketCap">Market Cap</Option>
      <Option value="priceChange">Price Change</Option>
      <Option value="volume24h">24h Volume</Option>
    </Select>
  );
};

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const topCryptos = data?.data?.coins;

  const [chartDataType, setChartDataType] = useState("marketCap");

  const toggleChartDataType = (value) => {
    setChartDataType(value);
  };

  if (isFetching || !topCryptos) {
    return <Loader />;
  }

  const chartData = {
    labels: topCryptos.map((crypto) => crypto.name),
    datasets: [
      {
        label:
          chartDataType === "marketCap"
            ? "Market Cap"
            : chartDataType === "priceChange"
            ? "Price Change"
            : "24h Volume",
        data: topCryptos.map((crypto) => {
          if (chartDataType === "marketCap") {
            return crypto.marketCap;
          } else if (chartDataType === "priceChange") {
            return crypto.change;
          } else {
            return crypto?.[`24hVolume`];
          }
        }),
        backgroundColor: "#0071bd", // Change the color as desired
      },
    ],
  };

  // Configuration options for the bar chart
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            if (chartDataType === "marketCap") {
              return `$${millify(value)}`;
            } else if (chartDataType === "priceChange") {
              return `${millify(value)}%`;
            } else {
              return `$${millify(value)}`;
            }
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap:"
            value={`$${millify(globalStats.totalMarketCap)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$${millify(globalStats.total24hVolume)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="bar-chart-container">
        <Bar data={chartData} options={chartOptions} />
        <ChartToggle
          chartDataType={chartDataType}
          onToggle={toggleChartDataType}
        />
      </div>
    </>
  );
};

export default Homepage;
