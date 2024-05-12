import React, { useState, useEffect } from 'react';
import { Card, Table, FormControl, Row, Col, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter} from '@fortawesome/free-solid-svg-icons';
import './application.css';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View} from '@react-pdf/renderer';
import Sidebar from '../../Components/sidebar';



const Applicant = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // New state for selected row
  // State for logged-in user information
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleCustomerClick = (customer, index) => {
    setSelectedCustomer(customer);
    setSelectedRow(index); // Set selectedRow to index of clicked row
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('userRole');
    if (username && role) {
      setLoggedInUsername(username);
      setUserRole(role);
    }
  }, []);

  const handleApprove = async (customer) => {
    try {
      const updatedCustomers = customers.map((c) =>
        c.nic === customer.nic ? { ...c, ApplicationStatus: 'Approved' } : c
      );
      setCustomers(updatedCustomers);
      await axios.put(`http://127.0.0.1:4000/approve-application/${customer.nic}`, {
        applicationStatus: 'Approved',
      });
      console.log(`Customer ${customer.Name} approved and status saved`);
    } catch (error) {
      console.error('Error approving customer:', error);
    }
  };
  
  const handleReject = async (customer) => {
    try {
      const updatedCustomers = customers.map((c) =>
        c.nic === customer.nic ? { ...c, ApplicationStatus: 'Rejected' } : c
      );
      setCustomers(updatedCustomers);
      await axios.put(`http://127.0.0.1:4000/reject-application/${customer.nic}`, {
        applicationStatus: 'Rejected',
      });
      console.log(`Customer ${customer.Name} rejected and status saved`);
    } catch (error) {
      console.error('Error rejecting customer:', error);
    }
  };
  
  const handleFilter = (field, value) => {
    setFilterField(field);
    setFilterValue(value);
    
};
  

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async () => {
    try {
      if (!selectedCustomer) {
        throw new Error('No customer selected');
      }

      await axios.delete(`http://127.0.0.1:4000/delete-customer/${selectedCustomer.nic}`);
      console.log(`Customer ${selectedCustomer.Name} deleted`);
      setCustomers(customers.filter((customer) => customer.nic !== selectedCustomer.nic));
      setSelectedCustomer(null);
      setSelectedRow(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/all-customer-details');
        setCustomers(response.data);

      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, []);

  const generatePDFContent = (customer) => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text>Name: {customer.Name}</Text>
          <Text>Gender: {customer.Gender}</Text>
          <Text>NIC: {customer.nic}</Text>
          <Text>Email: {customer.Email}</Text>
          <Text>TIN: {customer.tin}</Text>
          <Text>Phone Number: {customer.phoneNumber}</Text>
          <Text>Property: {customer.Reality === '1' ? 'Yes' : 'No'}</Text>
          <Text>Property Type: {customer.Property_Type}</Text>
          <Text>Work Phone: {customer.wkphone === '1' ? 'Yes' : 'No'}</Text>
          <Text>Age Category: {customer.Age_Category}</Text>
          <Text>Work Time Category: {customer.Work_Time_Category}</Text>
          <Text>Occupation: {customer.Occupation}</Text>
          <Text>Children Number: {customer.ChldNo}</Text>
          <Text>Income Category: {customer.Income_Category}</Text>
          <Text>Family Size: {customer.Family_Size}</Text>
          <Text>House Type: {customer.House_Type}</Text>
          <Text>Education Type: {customer.Education_Type}</Text>
          <Text>Marital Status: {customer.Marital_Status}</Text>
          <Text>Profile Picture: {customer.profilePic && typeof customer.profilePic === 'string' && customer.profilePic.trim() !== '' ? 'Yes' : 'No'}</Text>
          <Text> Credit Risk: {customer.CreditRisk}</Text>
          <Text>Application Status: {customer.ApplicationStatus === 'Approved' ? 'Approved' : customer.ApplicationStatus === 'Rejected' ? 'Rejected' : 'Pending'}</Text>
         
        </View>
      </Page>
    </Document>
  );
  

  const styles = {
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
      fontSize:10,
    },
    value: {
      marginBottom: 5,
      fontSize:8,
    },
  };
  
  const filteredCustomers = customers.filter((customer) => {
    // Filter based on selected filter (Gender), search query (Name, NIC, TIN), and empty search query
    return (


      (!filterField || customer[filterField] === filterValue) &&
      (
        customer.Name &&
        customer.nic &&
        customer.tin &&
        (
          customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.tin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery.trim() === ''
        )
      )&&
      (customer.ApplicationStatus === filterValue || filterField !== 'Application Status')
    );


    
  });


  return (
    
    <>
    
      <Card id='customerhistory' className='tabel-card'>
        <Card.Header>
          {/* Search, sort, download buttons */}
          <Row className="mb-3">   
        
      </Row>
          <Row>
          {/* Sidebar */}
        <Col md={2} className="sidebar">
          <Sidebar />
        </Col>
            <Col md={2}>
            <InputGroup className="mb-2 length-search ">
                <FormControl
                  className='search-bar-tabel'
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <Col>
            
            <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id='filter'>
              <FontAwesomeIcon icon={faFilter} /> Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilter('Application Status','Approved')}>Approved</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Application Status', 'Rejected')}>Rejected</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Application Status', 'Pending')}>Pending</Dropdown.Item>

              {/* Add more Dropdown.Items for other fields */}
            </Dropdown.Menu>
          </Dropdown>
            
          </Col>
            
                
              </InputGroup>
            </Col>
            
          </Row>
        </Card.Header>
        <Card.Body>
        <div className='horizontal-vertical-scroll'>
        <Table striped bordered hover className='application-tabel'>
            <thead>
              <tr>  
                <th>Name</th>
                <th>NIC</th>
                <th>TIN</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Property</th>
                <th>Property Type</th>
                <th>Phone</th>
                <th>Phone Number</th>
                <th>Age Category</th>
                <th>Work Time Category</th>
                <th>Occupation</th>
                <th>Children Number</th>
                <th>Income Category</th>
                <th>Family Size</th>
                <th>House Type</th>
                <th>Education Type</th>
                <th>Marital Status</th>
                <th>Profile Picture</th>
                <th>Credit Risk</th>
                <th>Application Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} onClick={() => handleCustomerClick(customer, index)}
                  className={selectedRow === index ? 'selected-row' : ''} style={{ backgroundColor: 'blue' }}>
                  <td>{customer.Name}</td>
                  <td>{customer.nic}</td>
                  <td>{customer.tin}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.Gender === '1' ? 'Male' : 'Female'}</td>
                  <td>{customer.Reality === '1' ? 'Yes' : 'No'}</td>
                  <td>{customer.Property_Type}</td>
                  <td>{customer.wkphone === '1' ? 'Yes' : 'No'}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.Age_Category}</td>
                  <td>{customer.Work_Time_Category}</td>
                  <td>{customer.Occupation}</td>
                  <td>{customer.ChldNo}</td>
                  <td>{customer.Income_Category}</td>
                  <td>{customer.Family_Size}</td>
                  <td>{customer.House_Type}</td>
                  <td>{customer.Education_Type}</td>
                  <td>{customer.Marital_Status}</td>
                  <td>
                    {customer.profilePic && typeof customer.profilePic === 'string' && customer.profilePic.trim() !== '' ? (
                      <img src={customer.profilePic} alt="Profile" style={{ width: '50px', height: '57px' }} />
                    ) : (
                      'No Profile Picture'
                    )}
                  </td>
                  <td>{customer.scaled_prediction}</td>
                  <td>
                    {customer.ApplicationStatus === 'Approved' ? 'Approved' :
                     customer.ApplicationStatus === 'Rejected' ? 'Rejected' : 'Pending'}
                  </td>
                  <td><Button variant='danger' onClick={handleDelete}>Delete</Button></td>
                </tr>
              ))}
              
            </tbody>
            
          </Table>
          </div>
        </Card.Body>
        <Card.Footer>
          {/* Record count and number of pages */}
          <Row>
            <Col md={6}>
              {`Showing ${filteredCustomers.length} records`}
            </Col>
            <Col md={6} className="text-end">
              {`Page 1 of 1`}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      {/* Customer Details Card */}
      <Col md={6}>
        {/* Customer Details Card */}
        {/* Customer Details Card */}
{selectedCustomer && (
  <Card className='customer-details-card'>
    <Card.Header>Customer Details</Card.Header>
    <Card.Body>
      {/* customer pic */}
      <p>Name: {selectedCustomer.Name}</p>
      <p>Gender: {selectedCustomer.Gender}</p>
      <p>NIC: {selectedCustomer.nic}</p>
      <p>Email: {selectedCustomer.Email}</p>
      <p>TIN: {selectedCustomer.tin}</p>
      <p>Phone Number: {selectedCustomer.phoneNumber}</p>
      <p>Prediction Result: {selectedCustomer.scaled_prediction}</p>
      {/* Add more customer details as needed */}
      {/* Buttons */}
      <Button
        variant="success"
        className="me-2"
        onClick={() => handleApprove(selectedCustomer)}
        disabled={selectedCustomer.ApplicationStatus === 'Approved'}
      >
        Approve
      </Button>
      <Button
        variant="danger"
        onClick={() => handleReject(selectedCustomer)}
        disabled={selectedCustomer.ApplicationStatus === 'Rejected'}
      >
        Reject
      </Button>

      <Card id='pdf-download'>
            <Col md={6} className="text-center ">
              {selectedCustomer && (
                <PDFDownloadLink document={generatePDFContent(selectedCustomer)} fileName="customer_details.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                </PDFDownloadLink>
              )}
            </Col>
            </Card>
    </Card.Body>
  </Card>

)}

      </Col>
    </>
    
  );
};
export default Applicant;

