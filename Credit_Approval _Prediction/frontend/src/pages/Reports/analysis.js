import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get('http://127.0.0.1:4000/all-customer-details/status');

        // Extract counts from the response
        const { approvedCount, rejectedCount, pendingCount } = response.data;

        // Prepare chart data
        const newChartData = {
          series: [
            { name: 'Approved', data: [approvedCount] },
            { name: 'Rejected', data: [rejectedCount] },
            { name: 'Pending', data: [pendingCount] },
          ],
          options: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: ['Count'],
            },
            yaxis: {
              title: {
                text: 'Count',
              },
            },
            colors: ['#00E396', '#FEB019', '#FF4560'],
          },
        };

        // Update chart data state
        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;








