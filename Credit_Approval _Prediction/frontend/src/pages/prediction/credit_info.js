// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './credit_info.css';

// const CreditPredictionForm = ({ setResults }) => {
//     const [formData, setFormData] = useState({
//         Gender: '0',
//         Reality: '0',
//         wkphone: '1',
//         Age_Category: 'gp_Age_category_lowest',
//         Work_Time_Category: 'gp_worktm_category_lowest',
//         Occupation: 'occyp_Laborwk',
//         ChldNo: 'ChldNo_0',
//         Income_Category: 'gp_inc_category_low',
//         Family_Size: 'famsizegp_1',
//         House_Type: 'houtp_House / apartment',
//         Education_Type: 'edutp_Higher education',
//         Marital_Status: 'famtp_Civil marriage'
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log(res.data);
//             setResults(res.data.scaled_prediction);
//             navigate('/result', { scaled_prediction: res.data.scaled_prediction });
//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div>
//             <h1>Credit Prediction</h1>
//             <form onSubmit={handleSubmit}>
//                 {/* Gender */}
//                 <label htmlFor="Gender">Gender:</label>
//                 <select name="Gender" id="Gender" value={formData.Gender} onChange={handleChange}>
//                     <option value="1">Male</option>
//                     <option value="0">Female</option>
//                 </select>
//                 <br /><br />

//                 {/* Reality */}
//                 <label htmlFor="Reality">Reality:</label>
//                 <select name="Reality" id="Reality" value={formData.Reality} onChange={handleChange}>
//                     <option value="1">Yes</option>
//                     <option value="0">No</option>
//                 </select>
//                 <br /><br />

//                 {/* Work Phone */}
//                 <label htmlFor="wkphone">Work Phone:</label>
//                 <select name="wkphone" id="wkphone" value={formData.wkphone} onChange={handleChange}>
//                     <option value="1">Yes</option>
//                     <option value="0">No</option>
//                 </select>
//                 <br /><br />

//                 {/* Age Category */}
//                 <label htmlFor="Age_Category">Age Category:</label>
//                 <select name="Age_Category" id="Age_Category" value={formData.Age_Category} onChange={handleChange}>
//                     <option value="gp_Age_category_lowest">Lowest</option>
//                     <option value="gp_Age_category_low">Low</option>
//                     <option value="gp_Age_category_medium">Medium</option>
//                     <option value="gp_Age_category_high">High</option>
//                     <option value="gp_Age_category_highest">Highest</option>
//                 </select>
//                 <br /><br />

//                 {/* Work Time Category */}
//                 <label htmlFor="Work_Time_Category">Work Time Category:</label>
//                 <select name="Work_Time_Category" id="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange}>
//                     <option value="gp_worktm_category_lowest">Lowest</option>
//                     <option value="gp_worktm_category_low">Low</option>
//                     <option value="gp_worktm_category_medium">Medium</option>
//                     <option value="gp_worktm_category_high">High</option>
//                     <option value="gp_worktm_category_highest">Highest</option>
//                 </select>
//                 <br /><br />

//                 {/* Occupation */}
//                 <label htmlFor="Occupation">Occupation:</label>
//                 <select name="Occupation" id="Occupation" value={formData.Occupation} onChange={handleChange}>
//                     <option value="occyp_Laborwk">Labor Work</option>
//                     <option value="occyp_hightecwk">High Tech Work</option>
//                     <option value="occyp_officewk">Office Work</option>
//                 </select>
//                 <br /><br />

//                 {/* Children Number */}
//                 <label htmlFor="ChldNo">Children Number:</label>
//                 <select name="ChldNo" id="ChldNo" value={formData.ChldNo} onChange={handleChange}>
//                     <option value="ChldNo_0">0</option>
//                     <option value="ChldNo_1">1</option>
//                     <option value="ChldNo_2More">2 or more</option>
//                 </select>
//                 <br /><br />

//                 {/* Income Category */}
//                 <label htmlFor="Income_Category">Income Category:</label>
//                 <select name="Income_Category" id="Income_Category" value={formData.Income_Category} onChange={handleChange}>
//                     <option value="gp_inc_category_low">Low</option>
//                     <option value="gp_inc_category_medium">Medium</option>
//                     <option value="gp_inc_category_high">High</option>
//                 </select>
//                 <br /><br />

//                 {/* Family Size */}
//                 <label htmlFor="Family_Size">Family Size:</label>
//                 <select name="Family_Size" id="Family_Size" value={formData.Family_Size} onChange={handleChange}>
//                     <option value="famsizegp_1">1</option>
//                     <option value="famsizegp_2">2</option>
//                     <option value="famsizegp_3more">3 or more</option>
//                 </select>
//                 <br /><br />

//                 {/* House Type */}
//                 <label htmlFor="House_Type">House Type:</label>
//                 <select name="House_Type" id="House_Type" value={formData.House_Type} onChange={handleChange}>
//                     <option value="houtp_House / apartment">House / Apartment</option>
//                     <option value="houtp_Co-op apartment">Co-op Apartment</option>
//                     <option value="houtp_Municipal apartment">Municipal Apartment</option>
//                     <option value="houtp_Office apartment">Office Apartment</option>
//                     <option value="houtp_Rented apartment">Rented Apartment</option>
//                     <option value="houtp_With parents">With Parents</option>
//                 </select>
//                 <br /><br />

//                 {/* Education Type */}
//                 <label htmlFor="Education_Type">Education Type:</label>
//                 <select name="Education_Type" id="Education_Type" value={formData.Education_Type} onChange={handleChange}>
//                     <option value="edutp_Higher education">Higher Education</option>
//                     <option value="edutp_Incomplete higher">Incomplete Higher</option>
//                     <option value="edutp_Lower secondary">Lower Secondary</option>
//                     <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
//                 </select>
//                 <br /><br />

//                 {/* Marital Status */}
//                 <label htmlFor="Marital_Status">Marital Status:</label>
//                 <select name="Marital_Status" id="Marital_Status" value={formData.Marital_Status} onChange={handleChange}>
//                     <option value="famtp_Civil marriage">Civil Marriage</option>
//                     <option value="famtp_Married">Married</option>
//                     <option value="famtp_Separated">Separated</option>
//                     <option value="famtp_Single / not married">Single / Not Married</option>
//                     <option value="famtp_Widow">Widow</option>
//                 </select>
//                 <br /><br />

//                 <input type="submit" value="Predict" />
//             </form>
//         </div>
//     );
// };

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Col, Form, Button, Card } from 'react-bootstrap';
// import './credit_info.css';

// const CreditPredictionForm = ({ setResults }) => {
//     const [formData, setFormData] = useState({
        // Name: 'shakeeb',
        // nic:'2001443131',
        // tin:'112232',
        // Email: 'ahamed@gmail.com',
        // Gender: '0',
        // Reality: '0',
        // wkphone: '1',
        // Age_Category: 'gp_Age_category_lowest',
        // Work_Time_Category: 'gp_worktm_category_lowest',
        // Occupation: 'occyp_Laborwk',
        // ChldNo: 'ChldNo_0',
        // Income_Category: 'gp_inc_category_low',
        // Family_Size: 'famsizegp_1',
        // House_Type: 'houtp_House / apartment',
        // Education_Type: 'edutp_Higher education',
        // Marital_Status: 'famtp_Civil marriage',
        // car: false,
        // land: false,
        // house: false,
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const newValue = type === 'checkbox' ? checked : value;
//         setFormData({ ...formData, [name]: newValue });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log(res.data);
//             setResults(res.data.scaled_prediction);
//             navigate('/result', { scaled_prediction: res.data.scaled_prediction });
//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <Container fluid className='prediction-from'>
//             <Col md={6}>
//                 <Card className='form-card'>
//                     <h2 className='prediction-title'> Application Form</h2>
//                     <br />
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="Name">
//                             <Form.Label>Name:</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="Name"
//                                 value={formData.Name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="nic">
//                             <Form.Label>NIC:</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your NIC"
//                                 name="NIC"
//                                 value={formData.nic}
//                                 onChange={handleChange}
                                
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="">
//                             <Form.Label>TIN:</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your TIN Number"
//                                 name="TIN"
//                                 value={formData.tin}
//                                 onChange={handleChange}
                                
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="Email">
//                             <Form.Label>Email:</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="Email"
//                                 value={formData.Email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="Gender">
//                             <Form.Label>Gender:</Form.Label>
//                             <Form.Control as="select" name="Gender" value={formData.Gender} onChange={handleChange} required>
//                                 <option value="1">Male</option>
//                                 <option value="0">Female</option>
//                             </Form.Control>
//                         </Form.Group>
                        // <Form.Group controlId="Reality">
                        //     <Form.Label>Properties:</Form.Label>
                        //     <Form.Check
                        //         type="checkbox"
                        //         label="Car"
                        //         name="Reality1"
                        //         checked={formData.Reality1}
                        //         onChange={handleChange}
                        //     />
                        //     <Form.Check
                        //         type="checkbox"
                        //         label="Land"
                        //         name="Reality2"
                        //         checked={formData.Reality2}
                        //         onChange={handleChange}
                        //     />
                        //     <Form.Check
                        //         type="checkbox"
                        //         label="House"
                        //         name="Reality3"
                        //         checked={formData.Reality3}
                        //         onChange={handleChange}
                        //     />
                        // </Form.Group>
//                         <Form.Group controlId="wkphone">
//                             <Form.Label>Phone</Form.Label>
//                             <Form.Control as="select" name="wkphone" value={formData.wkphone} onChange={handleChange} required>
//                                 <option value="1">Yes</option>
//                                 <option value="0">No</option>
//                             </Form.Control>
//                         </Form.Group>
//                         {/* Conditional rendering of phone number input */}
//                         {formData.wkphone === '1' && (
//                             <Form.Group controlId="phoneNumber">
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter phone number"
//                                     name="phoneNumber"
//                                     value={formData.phoneNumber}
//                                     onChange={handleChange}
//                                     required={formData.wkphone === '1'}
//                                 />
//                             </Form.Group>
//                         )}
//                         <Form.Group controlId="Age_Category">
//                             <Form.Label>Age Category:</Form.Label>
//                             <Form.Control as="select" name="Age_Category" value={formData.Age_Category} onChange={handleChange} required>
//                                 <option value="gp_Age_category_lowest">Age 18-25</option>
//                                 <option value="gp_Age_category_low">Age 26-35</option>
//                                 <option value="gp_Age_category_medium">Age 36-55</option>
//                                 <option value="gp_Age_category_high">Age 56-65</option>
//                                 <option value="gp_Age_category_highest">Age 66+</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Work_Time_Category">
//                             <Form.Label>Work Time Category:</Form.Label>
//                             <Form.Control as="select" name="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange} required>
//                                 <option value="gp_worktm_category_lowest"> 0-8 years of work experience</option>
//                                 <option value="gp_worktm_category_low">9-16 years of work experience</option>
//                                 <option value="gp_worktm_category_medium">17-24 years of work experience</option>
//                                 <option value="gp_worktm_category_high">25-32 years of work experience</option>
//                                 <option value="gp_worktm_category_highest">33-40 years of work experience</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Occupation">
//                             <Form.Label>Occupation:</Form.Label>
//                             <Form.Control as="select" name="Occupation" value={formData.Occupation} onChange={handleChange} required>
//                                 <option value="occyp_Laborwk">Labor</option>
//                                 <option value="occyp_hightecwk">Businessman</option>
//                                 <option value="occyp_officewk">Office Worker</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="ChldNo">
//                             <Form.Label>Children Number:</Form.Label>
//                             <Form.Control as="select" name="ChldNo" value={formData.ChldNo} onChange={handleChange} required>
//                                 <option value="ChldNo_0">None</option>
//                                 <option value="ChldNo_1">Only one child</option>
//                                 <option value="ChldNo_2More">Two or more children</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Income_Category">
//                             <Form.Label>Income Category:</Form.Label>
//                             <Form.Control as="select" name="Income_Category" value={formData.Income_Category} onChange={handleChange} required>
//                                 <option value="gp_inc_category_low">$20,000 to $70,000</option>
//                                 <option value="gp_inc_category_medium">$71,000 to $130,000</option>
//                                 <option value="gp_inc_category_high">$131,000 to $200,000+</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Family_Size">
//                             <Form.Label>Family Size:</Form.Label>
//                             <Form.Control as="select" name="Family_Size" value={formData.Family_Size} onChange={handleChange} required>
//                                 <option value="famsizegp_1">Single-member family</option>
//                                 <option value="famsizegp_2">Two members in the family</option>
//                                 <option value="famsizegp_3more">Three or more members in the family</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="House_Type">
//                             <Form.Label>Accommodation Type:</Form.Label>
//                             <Form.Control as="select" name="House_Type" value={formData.House_Type} onChange={handleChange} required>
//                                 <option value="houtp_House / apartment">House / Apartment</option>
//                                 <option value="houtp_Co-op apartment">Co-op Apartment</option>
//                                 <option value="houtp_Municipal apartment">Municipal Apartment</option>
//                                 <option value="houtp_Office apartment">Office Apartment</option>
//                                 <option value="houtp_Rented apartment">Rented Apartment</option>
//                                 <option value="houtp_With parents">With Parents</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Education_Type">
//                             <Form.Label>Education Type:</Form.Label>
//                             <Form.Control as="select" name="Education_Type" value={formData.Education_Type} onChange={handleChange} required>
//                                 <option value="edutp_Higher education">Higher Education</option>
//                                 <option value="edutp_Incomplete higher">Incomplete Higher</option>
//                                 <option value="edutp_Lower secondary"> None</option>
//                                 <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="Marital_Status">
//                             <Form.Label>Marital Status:</Form.Label>
//                             <Form.Control as="select" name="Marital_Status" value={formData.Marital_Status} onChange={handleChange} required>
//                                 <option value="famtp_Civil marriage">Civil Marriage</option>
//                                 <option value="famtp_Married">Married</option>
//                                 <option value="famtp_Separated">Separated</option>
//                                 <option value="famtp_Single / not married">Single / Not Married</option>
//                                 <option value="famtp_Widow">Widow</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <br></br>
//                         <Form.Group controlId="Image">
//                         <input type="file" id="fileInput"  />
//                         </Form.Group>
//                         <Button className='prediction-button' variant='none' type="submit" block>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             </Col>
//         </Container>
//     );
// };

// export default CreditPredictionForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Form, Button, Card } from 'react-bootstrap';
import './credit_info.css';


const CreditPredictionForm = ({ setResults }) => {
    
    const [formData, setFormData] = useState({
        Name: '',
        nic:'',
        tin:'',
        Email: '',
        Gender: '',
        Reality: '',
        Property_Type: [], // Updated to an array for checkboxes
        wkphone: '',
        phoneNumber: '',
        Age_Category: '',
        Work_Time_Category: '',
        Occupation: '',
        ChldNo: '',
        Income_Category: '',
        Family_Size: '',
        House_Type: '',
        Education_Type: '',
        Marital_Status: '',
        profilePic:'',
    });

    const navigate = useNavigate();
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue;
        if (type === 'checkbox') {
            // If checkbox, update Property_Type array based on checked status
            newValue = checked
                ? [...formData.Property_Type, value] // Add value to array if checked
                : formData.Property_Type.filter((item) => item !== value); // Remove value if unchecked
            } else if (type === 'file') {
                // Handle file input
                newValue = e.target.files[0]; // Save the file object directly
        } else {
            newValue = value;
        }
        setFormData({ ...formData, [name]: newValue });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        

        // Mapping object for transforming form data values
      const mappings = {
    Age_Category: {
        gp_Age_category_lowest: 'Age 18-25',
        gp_Age_category_low: 'Age 26-35',
        gp_Age_category_medium: 'Age 36-55',
        gp_Age_category_high: 'Age 56-65',
        gp_Age_category_highest: 'Age 66+',
    },
    Property_Type: {
        Car:'Car',
        Land: 'Land',
        Building: 'Building',

    },
    Work_Time_Category: {
        gp_worktm_category_lowest: '0-8 years of work experience',
        gp_worktm_category_low: '9-16 years of work experience',
        gp_worktm_category_medium: '17-24 years of work experience',
        gp_worktm_category_high: '25-32 years of work experience',
        gp_worktm_category_highest: '33-40 years of work experience',
    },
    Occupation: {
        occyp_Laborwk: 'Labor',
        occyp_hightecwk: 'Businessman',
        occyp_officewk: 'Office Worker',
    },
    ChldNo: {
        ChldNo_0: 'None',
        ChldNo_1: 'Only one child',
        ChldNo_2More: 'Two or more children',
    },
    Income_Category: {
        gp_inc_category_low: '$20,000 to $70,000',
        gp_inc_category_medium: '$71,000 to $130,000',
        gp_inc_category_high: '$131,000 to $200,000+',
    },
    Family_Size: {
        famsizegp_1: 'Single-member family',
        famsizegp_2: 'Two members in the family',
        famsizegp_3more: 'Three or more members in the family',
    },
    House_Type: {
       ' houtp_House apartment': 'House / Apartment',
        'houtp_Co_op apartment': 'Co-op Apartment',
        'houtp_Municipal apartment': 'Municipal Apartment',
        'houtp_Office apartment': 'Office Apartment',
        'houtp_Rented apartment': 'Rented Apartment',
        'houtp_With parents': 'With Parents',
    },
    Education_Type: {
        'edutp_Higher education': 'Higher Education',
        'edutp_Incomplete higher': 'Incomplete Higher',
        'edutp_Lower secondary': 'None',
        'edutp_Secondary / secondary special': 'Secondary / Secondary Special',
    },
    Marital_Status: {
        'famtp_Civil marriage': 'Civil Marriage',
        famtp_Married: 'Married',
        famtp_Separated: 'Separated',
        'famtp_Single / not married': 'Single / Not Married',
        famtp_Widow: 'Widow',
    },
};


        try {
            // Transform the form data before sending
            const transformedData = { ...formData };
            Object.keys(mappings).forEach((key) => {
                if (transformedData[key]) {
                    transformedData[key] = mappings[key][transformedData[key]];
                }
            });



            const predictionRes = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(predictionRes.data);
            setResults(predictionRes.data.scaled_prediction);

    
            // Extract prediction results
      const { scaled_prediction } = predictionRes.data;
  
      // Add prediction results to formData
      const dataToSend = {
        ...transformedData,
        scaled_prediction
      };

            // Perform prediction
            await axios.post('http://127.0.0.1:4000/customer-data', dataToSend );
            

           

             // Extract customer NIC from form data

            

            navigate('/result');

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

            

   

    
    return (
        <Container fluid className='prediction-from'>
            <Col md={6}>
                <Card className='form-card'>
                    <h2 className='prediction-title'> Application Form</h2>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>NIC:</Form.Label>
                            
                            <Form.Control
                                type="text"
                                placeholder="Enter your NIC"
                                name="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>TIN:</Form.Label>
                            
                            <Form.Control
                                type="text"
                                placeholder="Enter your TIN Number"
                                name="tin"
                                value={formData.tin}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email:</Form.Label>
                            
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Gender:</Form.Label>
                            
                            <Form.Control as="select" name="Gender" value={formData.Gender} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Properties:</Form.Label>
                            
                            <Form.Control as="select" name="Reality" value={formData.Reality} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Control>
                        </Form.Group>
                        {/* New Property Type field with checkboxes */}
                        {/* New Property Type field with checkboxes */}
                        <Form.Group>
                            <Form.Label>Property Type:</Form.Label>
                            
                            <Form.Check
                                inline
                                type="checkbox"
                                label="Car"
                                name="Property_Type"
                                value={formData.Property_Type="Car"}
                                onChange={handleChange}
                                
                            />
                            <Form.Check
                                inline
                                type="checkbox"
                                label="Land"
                                name="Property_Type"
                                value={formData.Property_Type="Land"}
                                onChange={handleChange}
                                
                            />
                            <Form.Check
                                inline
                                type="checkbox"
                                label="Building"
                                name="Property_Type"
                                value={formData.Property_Type="Building"}
                                onChange={handleChange}
                                
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control as="select" name="wkphone" value={formData.wkphone} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Control>
                        </Form.Group>
                        {formData.wkphone === '1' && (
                            <Form.Group>
                            
                                
                                <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            </Form.Group>
                        )}
                        <Form.Group >
                            <Form.Label>Age Category:</Form.Label>
                            <Form.Control as="select" name="Age_Category" value={formData.Age_Category} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="gp_Age_category_lowest">Age 18-25</option>
                                <option value="gp_Age_category_low">Age 26-35</option>
                                <option value="gp_Age_category_medium">Age 36-55</option>
                                <option value="gp_Age_category_high">Age 56-65</option>
                                <option value="gp_Age_category_highest">Age 66+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Work Time Category:</Form.Label>
                            <Form.Control as="select" name="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="gp_worktm_category_lowest"> 0-8 years of work experience</option>
                                <option value="gp_worktm_category_low">9-16 years of work experience</option>
                                <option value="gp_worktm_category_medium">17-24 years of work experience</option>
                                <option value="gp_worktm_category_high">25-32 years of work experience</option>
                                <option value="gp_worktm_category_highest">33-40 years of work experience</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Occupation:</Form.Label>
                            <Form.Control as="select" name="Occupation" value={formData.Occupation} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="occyp_Laborwk">Labor</option>
                                <option value="occyp_hightecwk">Businessman</option>
                                <option value="occyp_officewk">Office Worker</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Children Number:</Form.Label>
                            <Form.Control as="select" name="ChldNo" value={formData.ChldNo} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="ChldNo_0">None</option>
                                <option value="ChldNo_1">Only one child</option>
                                <option value="ChldNo_2More">Two or more children</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Income Category:</Form.Label>
                            <Form.Control as="select" name="Income_Category" value={formData.Income_Category} onChange={handleChange} required>
                                <option value="" disabled>Select</option>  
                                <option value="gp_inc_category_low">$20,000 to $70,000</option>
                                <option value="gp_inc_category_medium">$71,000 to $130,000</option>
                                <option value="gp_inc_category_high">$131,000 to $200,000+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Family Size:</Form.Label>
                            <Form.Control as="select" name="Family_Size" value={formData.Family_Size} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="famsizegp_1">Single-member family</option>
                                <option value="famsizegp_2">Two members in the family</option>
                                <option value="famsizegp_3more">Three or more members in the family</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Accommodation Type:</Form.Label>
                            <Form.Control as="select" name="House_Type" value={formData.House_Type} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="houtp_House / apartment">House / Apartment</option>
                                <option value="houtp_Co-op apartment">Co-op Apartment</option>
                                <option value="houtp_Municipal apartment">Municipal Apartment</option>
                                <option value="houtp_Office apartment">Office Apartment</option>
                                <option value="houtp_Rented apartment">Rented Apartment</option>
                                <option value="houtp_With parents">With Parents</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Education Type:</Form.Label>
                            <Form.Control as="select" name="Education_Type" value={formData.Education_Type} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="edutp_Higher education">Higher Education</option>
                                <option value="edutp_Incomplete higher">Incomplete Higher</option>
                                <option value="edutp_Lower secondary"> None</option>
                                <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Marital Status:</Form.Label>
                            <Form.Control as="select" name="Marital_Status" value={formData.Marital_Status} onChange={handleChange} required>
                                <option value="" disabled>Select</option>
                                <option value="famtp_Civil marriage">Civil Marriage</option>
                                <option value="famtp_Married">Married</option>
                                <option value="famtp_Separated">Separated</option>
                                <option value="famtp_Single / not married">Single / Not Married</option>
                                <option value="famtp_Widow">Widow</option>
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Upload Image:</Form.Label>
                            <Form.Control
                                type="file"
                                id="fileInput"
                                name="profilePic"
                                onChange={handleChange} // Add onChange event handler for file input
                            />
                        </Form.Group>
                        {formData.profilePic && typeof formData.profilePic === 'object' && (
                        <div>
                        <p>File Name: {formData.profilePic.name}</p>
                        <p>File Size: {formData.profilePic.size} bytes</p>
                        

                        </div>
                            )}

                        <Button className='prediction-button' variant='none' type="submit" block>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Container>
    );
};

export default CreditPredictionForm;