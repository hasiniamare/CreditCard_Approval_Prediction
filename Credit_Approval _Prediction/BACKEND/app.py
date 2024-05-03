from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the model and define feature names
with open('New_credit_model.pkl', 'rb') as file:
    model = pickle.load(file)

feature_names = [
    'Gender', 'Reality', 'ChldNo_0', 'ChldNo_1', 'ChldNo_2More', 'gp_inc_category_high', 'gp_inc_category_low',
    'gp_inc_category_medium', 'wkphone', 'gp_Age_category_high', 'gp_Age_category_highest', 'gp_Age_category_low',
    'gp_Age_category_lowest', 'gp_Age_category_medium', 'gp_worktm_category_high', 'gp_worktm_category_highest',
    'gp_worktm_category_low', 'gp_worktm_category_lowest', 'gp_worktm_category_medium', 'occyp_Laborwk',
    'occyp_hightecwk', 'occyp_officewk', 'famsizegp_1', 'famsizegp_2', 'famsizegp_3more', 'houtp_House / apartment',
    'houtp_Co-op apartment', 'houtp_Municipal apartment', 'houtp_Office apartment', 'houtp_Rented apartment',
    'houtp_With parents', 'edutp_Higher education', 'edutp_Incomplete higher', 'edutp_Lower secondary',
    'edutp_Secondary / secondary special', 'famtp_Civil marriage', 'famtp_Married', 'famtp_Separated',
    'famtp_Single / not married', 'famtp_Widow'
]

def create_input_vector(data):
    vector = np.zeros(len(feature_names), dtype=int)

    category_rules = {
        'gp_inc_category_': ['gp_inc_category_high', 'gp_inc_category_medium', 'gp_inc_category_low'],
        'gp_Age_category_': ['gp_Age_category_high', 'gp_Age_category_highest', 'gp_Age_category_low',
                             'gp_Age_category_lowest'],
        'gp_worktm_category_': ['gp_worktm_category_high', 'gp_worktm_category_highest', 'gp_worktm_category_low',
                                'gp_worktm_category_medium', 'gp_worktm_category_lowest'],
        'ChldNo_': ['ChldNo_1', 'ChldNo_2More'],
        'occyp_': ['occyp_Laborwk', 'occyp_hightecwk', 'occyp_officewk'],
        'famsizegp_': ['famsizegp_1', 'famsizegp_2', 'famsizegp_3more'],
        'houtp_': ['houtp_House / apartment', 'houtp_Co-op apartment', 'houtp_Municipal apartment',
                   'houtp_Office apartment', 'houtp_Rented apartment', 'houtp_With parents'],
        'edutp_': ['edutp_Higher education', 'edutp_Incomplete higher', 'edutp_Lower secondary',
                   'edutp_Secondary / secondary special'],
        'famtp_': ['famtp_Civil marriage', 'famtp_Married', 'famtp_Separated', 'famtp_Single / not married',
                   'famtp_Widow']
    }

    for key, value in data.items():
        if key != 'Gender':  # Exclude Gender feature
            if value == 1:
                index = feature_names.index(key)
                vector[index] = 1

                for category, subcategories in category_rules.items():
                    if key in subcategories:
                        for subcategory in subcategories:
                            if subcategory != key:
                                subcategory_index = feature_names.index(subcategory)
                                vector[subcategory_index] = 0

    return vector

@app.route('/')
def index():
    return "Hello, this is the credit prediction app!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    input_vector = create_input_vector(data)
    probabilities = model.predict_proba([input_vector])[0]

    # Adjust probabilities based on user input and apply scaling
    scaled_prediction = calculate_scaled_prediction(probabilities[1], data)

    return jsonify({
        "scaled_prediction": scaled_prediction
    })

def calculate_scaled_prediction(probability, data):
    adjusted_probability = probability

    if data.get('Income_Category') == 'gp_inc_category_low':
        adjusted_probability *= 2.0
    elif data.get('Income_Category') == 'gp_inc_category_medium':
        adjusted_probability *= 1.7
    elif data.get('Income_Category') == 'gp_inc_category_high':
        adjusted_probability *= 1.3

    if data.get('Work_Time_Category') == 'gp_worktm_category_lowest':
        adjusted_probability *= 2.3
    elif data.get('Work_Time_Category') == 'gp_worktm_category_low':
        adjusted_probability *= 1.9
    elif data.get('Work_Time_Category') == 'gp_worktm_category_medium':
        adjusted_probability *= 1.7
    elif data.get('Work_Time_Category') == 'gp_worktm_category_high':
        adjusted_probability *= 1.3
    elif data.get('Work_Time_Category') == 'gp_worktm_category_highest':
        adjusted_probability *= 1.0

    if data.get('ChldNo') == 'ChldNo_2More':
        adjusted_probability *= 1.9
    elif data.get('ChldNo') == 'ChldNo_1':
        adjusted_probability *= 1.7
    elif data.get('ChldNo') == 'ChldNo_0':
        adjusted_probability *= 1.3

    if data.get('Family_Size') == 'famsizegp_3more':
        adjusted_probability *= 1.9
    elif data.get('Family_Size') == 'famsizegp_2':
        adjusted_probability *= 1.7
    elif data.get('Family_Size') == 'famsizegp_1':
        adjusted_probability *= 1.3

    if data.get('Age_Category') == 'gp_Age_category_highest':
        adjusted_probability *= 1.9
    elif data.get('Age_Category') == 'gp_Age_category_high':
        adjusted_probability *= 1.7
    elif data.get('Age_Category') == 'gp_Age_category_lowest':
        adjusted_probability *= 1.3
    elif data.get('Age_Category') == 'gp_Age_category_low':
        adjusted_probability *= 1.0
    elif data.get('Age_Category') == 'gp_Age_category_medium':
        adjusted_probability *= 0.7

    if data.get('Occupation') == 'occyp_Laborwk':
        adjusted_probability *= 2.0
    elif data.get('Occupation') == 'occyp_officewk':
        adjusted_probability *= 1.7
    elif data.get('Occupation') == 'occyp_hightecwk':
        adjusted_probability *= 0.9

    if data.get('House_Type') == 'houtp_Office apartment':
        adjusted_probability *= 2.2
    elif data.get('House_Type') == 'houtp_Rented apartment':
        adjusted_probability *= 1.9
    elif data.get('House_Type') == 'houtp_Municipal apartment':
        adjusted_probability *= 1.7
    elif data.get('House_Type') == 'houtp_House / apartment':
        adjusted_probability *= 1.3
    elif data.get('House_Type') == 'houtp_Co-op apartment':
        adjusted_probability *= 1.1
    elif data.get('House_Type') == 'houtp_With parents':
        adjusted_probability *= 0.9

    if data.get('Education_Type') == 'edutp_Lower secondary':
        adjusted_probability *= 1.9
    elif data.get('Education_Type') == 'edutp_Secondary / secondary special':
        adjusted_probability *= 1.7
    elif data.get('Education_Type') == 'edutp_Incomplete higher':
        adjusted_probability *= 1.3
    elif data.get('Education_Type') == 'edutp_Higher education':
        adjusted_probability *= 0.9

    if data.get('Marital_Status') == 'famtp_Single / not married':
        adjusted_probability *= 2.4
    elif data.get('Marital_Status') == 'famtp_Widow':
        adjusted_probability *= 1.9
    elif data.get('Marital_Status') == 'famtp_Separated':
        adjusted_probability *= 1.5
    elif data.get('Marital_Status') == 'famtp_Civil marriage':
        adjusted_probability *= 1.1
    elif data.get('Marital_Status') == 'famtp_Married':
        adjusted_probability *= 0.7

    # Apply scaling
    min_percentage = 10
    max_percentage = 95  # Adjusted to 100
    scaled_prob = (adjusted_probability - 0.5) * 2
    scaled_prediction = min_percentage + ((scaled_prob + 1) * 0.5 * (max_percentage - min_percentage))

    # Ensure scaled_prediction remains within the desired range
    scaled_prediction = max(min(scaled_prediction, max_percentage), min_percentage)
    
    return scaled_prediction

if __name__ == '__main__':
    app.run(debug=True)

