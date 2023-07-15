// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // const CustomBarChart = ({ data }) => {
// //   return (
// //     <ResponsiveContainer width="100%" height={400}>
// //       <BarChart data={data}>
// //         <CartesianGrid stroke="#f5f5f5" />
// //         <XAxis dataKey="title" />
// //         <YAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => `${value}%`} />
// //         <Tooltip />
// //         <Bar dataKey="value" fill="#0071bd" />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   );
// // };
// // const CustomBarChart = ({ data, isExtrapolated }) => {
// //   return (
// //     <ResponsiveContainer width="100%" height={400}>
// //       <BarChart data={data}>
// //         <CartesianGrid stroke="#f5f5f5" />
// //         <XAxis dataKey="title" />
// //         <YAxis type="number" domain={[0, 'auto']} tickFormatter={(value) => `${value}%`} />
// //         <Tooltip />
// //         <Bar dataKey={isExtrapolated ? 'extrapolatedValue' : 'value'} fill={isExtrapolated ? '#00C0FF' : '#8884d8'} />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   );
// // };

// // export default CustomBarChart;

// import { animated } from "react-spring";

// const AnimatedBar = animated(Bar);

// const CustomBarChart = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data}>
//         <CartesianGrid stroke="#f5f5f5" />
//         <XAxis dataKey="title" />
//         <YAxis type="number" domain={[0, "dataMax"]} tickFormatter={(value) => `${value}%`} />
//         <Tooltip />
//         <AnimatedBar dataKey="value" fill="#1890ff" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomBarChart;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { animated } from 'react-spring';

const AnimatedBarChart = animated(BarChart);
const AnimatedBar = animated(Bar);

const CustomBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AnimatedBarChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="title" />
        <YAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={(value) => `${value}%`} />
        <Tooltip />
        <AnimatedBar dataKey="value" fill="#00C0FF" />
      </AnimatedBarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;

