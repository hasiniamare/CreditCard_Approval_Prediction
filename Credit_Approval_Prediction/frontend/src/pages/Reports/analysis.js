// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactApexChart from 'react-apexcharts';
// import Sidebar from '../../Components/sidebar';
// import { Card } from 'react-bootstrap'; // Import Card component from react-bootstrap
// import './analysis.css';


// const ApexChart = () => {
//   const [chartData, setChartData] = useState({ series: [], options: {} });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from your API endpoint
//         const response = await axios.get('http://127.0.0.1:4000/all-customer-details/status');

//         // Extract counts from the response
//         const { approvedCount, rejectedCount} = response.data;

//         // Prepare chart data
//         const newChartData = {
//           series: [
//             { name: 'Approved', data: [approvedCount] },
//             { name: 'Rejected', data: [rejectedCount] },
            
//           ],
//           options: {
//             chart: {
//               height: 350,
//               type: 'bar',
//             },
//             plotOptions: {
//               bar: {
//                 horizontal: false,
//                 columnWidth: '55%',
//                 endingShape: 'rounded',
//               },
//             },
//             dataLabels: {
              
//               enabled: false,
//             },

//             xaxis: {
//               categories: ['Count'],
//               labels: {
//                 style: {
//                   colors: 'whitesmoke', // Set font color to whitesmoke for x-axis labels
//                 },
//               },
//             },
//             yaxis: {
//               title: {
//                 text: 'Count',
//                 style: {
//                   color: 'beige', // Set font color to whitesmoke for y-axis title
//                 },
                
//               },
//               labels: {
//                 style: {
//                   colors: 'whitesmoke', // Set font color to whitesmoke for y-axis labels
//                 },
//               },
//             },
//             colors: ['#00E396', '#FF4560',],
//           },
//         };

//         // Update chart data state
//         setChartData(newChartData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs only once

//   return (
//     <>
//       <Sidebar />
//       <div>
//         <Card className ="countapproved">
//           <Card.Body className='count-color'>
//             <Card.Title className='count-text' >Approved Count Analysis</Card.Title>
//             <div id="chart">
//               <ReactApexChart
//                 className = "chart-1"
//                 options={chartData.options}
//                 series={chartData.series}
//                 type="bar"
//                 height={350}
                
//               />
//             </div>
//             <div id="html-dist"></div>
//           </Card.Body>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default ApexChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import Sidebar from '../../Components/sidebar';
import './analysis.css';

const ApexChart = () => {
  const [barChartData, setBarChartData] = useState({ series: [], options: {} });
  const [pieChartData, setPieChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/all-customer-details/status');
        const { approvedCount, rejectedCount } = response.data;

        const newBarChartData = {
          series: [
            { name: 'Approved', data: [approvedCount] },
            { name: 'Rejected', data: [rejectedCount] },
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
              labels: {
                style: {
                  colors: 'whitesmoke',
                },
              },
            },
            yaxis: {
              title: {
                text: 'Count',
                style: {
                  color: 'beige',
                },
              },
              labels: {
                style: {
                  colors: 'whitesmoke',
                },
              },
            },
            colors: ['#00E396', '#FF4560'],
          },
        };

        const newPieChartData = {
          series: [approvedCount, rejectedCount],
          options: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Approved', 'Rejected'],
            dataLabels: {
              style: {
                colors: ['whitesmoke', 'whitesmoke'],
              },
            },
            colors: ['#00E396', '#FF4560'], // Green for Approved, Red for Rejected
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: 'left',
                  },
                },
              },
            ],
          },
        };
        

        setBarChartData({ series: newBarChartData.series, options: newBarChartData.options });
        setPieChartData({ series: newPieChartData.series, options: newPieChartData.options });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div>
        <Card className="countapproved">
          <Card.Body className="count-color">
            <Card.Title className="count-text">Approved Count Analysis</Card.Title>
            <Row>
              <Col md={6}>
                <div id="barChart">
                  <ReactApexChart
                    options={barChartData.options}
                    series={barChartData.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div id="pieChart">
                  <ReactApexChart
                    options={pieChartData.options}
                    series={pieChartData.series}
                    type="pie"
                    width={380}
                  />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ApexChart;
