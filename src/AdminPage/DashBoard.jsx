import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urls = [
    "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetLichSuDatXeOto",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          urls.map((url) => fetch(url).then((response) => response.json()))
        );
        setData(results.flat());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = {
    labels: data.map((item) => Date(item.Date)),
    datasets: [
      {
        label: "Lịch Sử Đặt Xe Ô Tô",
        data: data.map((item) => item.MaKH), // Example: Replace this with actual data
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Lịch Sử Đặt Xe Ô Tô</h1>
      <Bar key={Math.random()} data={chartData} />
      <table>
        <thead>
          <tr>
            <th>Mã KH</th>
            <th>Mã ĐX</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.MaKH}</td>
              <td>{item.MaDX}</td>
              <td>{item.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoard;
