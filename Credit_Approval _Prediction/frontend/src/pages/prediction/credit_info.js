import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreditPredictionForm = ({ setResults }) => {
    const [formData, setFormData] = useState({
        Gender: '0',
        Reality: '0',
        wkphone: '1',
        Age_Category: 'gp_Age_category_lowest',
        Work_Time_Category: 'gp_worktm_category_lowest',
        Occupation: 'occyp_Laborwk',
        ChldNo: 'ChldNo_0',
        Income_Category: 'gp_inc_category_low',
        Family_Size: 'famsizegp_1',
        House_Type: 'houtp_House / apartment',
        Education_Type: 'edutp_Higher education',
        Marital_Status: 'famtp_Civil marriage'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data);
            setResults(res.data.scaled_prediction);
            navigate('/result', { scaled_prediction: res.data.scaled_prediction });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Credit Prediction</h1>
            <form onSubmit={handleSubmit}>
                {/* Gender */}
                <label htmlFor="Gender">Gender:</label>
                <select name="Gender" id="Gender" value={formData.Gender} onChange={handleChange}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
                <br /><br />

                {/* Reality */}
                <label htmlFor="Reality">Reality:</label>
                <select name="Reality" id="Reality" value={formData.Reality} onChange={handleChange}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <br /><br />

                {/* Work Phone */}
                <label htmlFor="wkphone">Work Phone:</label>
                <select name="wkphone" id="wkphone" value={formData.wkphone} onChange={handleChange}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <br /><br />

                {/* Age Category */}
                <label htmlFor="Age_Category">Age Category:</label>
                <select name="Age_Category" id="Age_Category" value={formData.Age_Category} onChange={handleChange}>
                    <option value="gp_Age_category_lowest">Lowest</option>
                    <option value="gp_Age_category_low">Low</option>
                    <option value="gp_Age_category_medium">Medium</option>
                    <option value="gp_Age_category_high">High</option>
                    <option value="gp_Age_category_highest">Highest</option>
                </select>
                <br /><br />

                {/* Work Time Category */}
                <label htmlFor="Work_Time_Category">Work Time Category:</label>
                <select name="Work_Time_Category" id="Work_Time_Category" value={formData.Work_Time_Category} onChange={handleChange}>
                    <option value="gp_worktm_category_lowest">Lowest</option>
                    <option value="gp_worktm_category_low">Low</option>
                    <option value="gp_worktm_category_medium">Medium</option>
                    <option value="gp_worktm_category_high">High</option>
                    <option value="gp_worktm_category_highest">Highest</option>
                </select>
                <br /><br />

                {/* Occupation */}
                <label htmlFor="Occupation">Occupation:</label>
                <select name="Occupation" id="Occupation" value={formData.Occupation} onChange={handleChange}>
                    <option value="occyp_Laborwk">Labor Work</option>
                    <option value="occyp_hightecwk">High Tech Work</option>
                    <option value="occyp_officewk">Office Work</option>
                </select>
                <br /><br />

                {/* Children Number */}
                <label htmlFor="ChldNo">Children Number:</label>
                <select name="ChldNo" id="ChldNo" value={formData.ChldNo} onChange={handleChange}>
                    <option value="ChldNo_0">0</option>
                    <option value="ChldNo_1">1</option>
                    <option value="ChldNo_2More">2 or more</option>
                </select>
                <br /><br />

                {/* Income Category */}
                <label htmlFor="Income_Category">Income Category:</label>
                <select name="Income_Category" id="Income_Category" value={formData.Income_Category} onChange={handleChange}>
                    <option value="gp_inc_category_low">Low</option>
                    <option value="gp_inc_category_medium">Medium</option>
                    <option value="gp_inc_category_high">High</option>
                </select>
                <br /><br />

                {/* Family Size */}
                <label htmlFor="Family_Size">Family Size:</label>
                <select name="Family_Size" id="Family_Size" value={formData.Family_Size} onChange={handleChange}>
                    <option value="famsizegp_1">1</option>
                    <option value="famsizegp_2">2</option>
                    <option value="famsizegp_3more">3 or more</option>
                </select>
                <br /><br />

                {/* House Type */}
                <label htmlFor="House_Type">House Type:</label>
                <select name="House_Type" id="House_Type" value={formData.House_Type} onChange={handleChange}>
                    <option value="houtp_House / apartment">House / Apartment</option>
                    <option value="houtp_Co-op apartment">Co-op Apartment</option>
                    <option value="houtp_Municipal apartment">Municipal Apartment</option>
                    <option value="houtp_Office apartment">Office Apartment</option>
                    <option value="houtp_Rented apartment">Rented Apartment</option>
                    <option value="houtp_With parents">With Parents</option>
                </select>
                <br /><br />

                {/* Education Type */}
                <label htmlFor="Education_Type">Education Type:</label>
                <select name="Education_Type" id="Education_Type" value={formData.Education_Type} onChange={handleChange}>
                    <option value="edutp_Higher education">Higher Education</option>
                    <option value="edutp_Incomplete higher">Incomplete Higher</option>
                    <option value="edutp_Lower secondary">Lower Secondary</option>
                    <option value="edutp_Secondary / secondary special">Secondary / Secondary Special</option>
                </select>
                <br /><br />

                {/* Marital Status */}
                <label htmlFor="Marital_Status">Marital Status:</label>
                <select name="Marital_Status" id="Marital_Status" value={formData.Marital_Status} onChange={handleChange}>
                    <option value="famtp_Civil marriage">Civil Marriage</option>
                    <option value="famtp_Married">Married</option>
                    <option value="famtp_Separated">Separated</option>
                    <option value="famtp_Single / not married">Single / Not Married</option>
                    <option value="famtp_Widow">Widow</option>
                </select>
                <br /><br />

                <input type="submit" value="Predict" />
            </form>
        </div>
    );
};

export default CreditPredictionForm;
