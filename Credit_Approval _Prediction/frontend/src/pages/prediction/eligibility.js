
// import React from 'react';

import { useEffect } from "react";

// const ResultPage = ({ scaled_prediction }) => {
//   console.log(scaled_prediction,"this= is woring...")
//   return (
//     <div>
//       <h1>Prediction Result</h1>
//       <p>Prediction Percentage: {scaled_prediction}%</p>
//     </div>
//   );
// };

// export default ResultPage;


// import React from 'react';

// const ResultPage = ({  scaled_prediction }) => {
//   // Access the scaled_prediction value from the location state
//   // const { scaled_prediction } = location;

//   console.log(scaled_prediction,"working.....")

//   return (
//     <div>
//       <h1>Prediction Result</h1>
//       {/* Check if scaled_prediction exists before displaying */}
//       {scaled_prediction && (
//         <p>Prediction Percentage: {scaled_prediction}%</p>
//       )}
//     </div>
//   );
// };

// export default ResultPage;



const ResultPage = (props) => {
  console.log(props, "props in ResultPage");

  const { results} = props;

  useEffect(()=>{

  },[])

  console.log(results, "working.....");

  return (
    <div>
      <h1>Prediction Result</h1>
      {/* Check if scaled_prediction exists before displaying */}
      {results && results && (
        <p>Prediction Percentage: {results}%</p>
      )}
    </div>
  );
};


export default ResultPage;