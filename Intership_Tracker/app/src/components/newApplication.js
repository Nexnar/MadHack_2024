import { applicationFactory, writeToDatabase } from '@/scripts/database';
import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const NewApplication = ({ navigateBack }) => {
  const [status, setStatus] = useState('PENDING'); 
  const [showDropdown, setShowDropdown] = useState(false); // State to control visibility of dropdown
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const statusData = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ACCEPTED', value: 'ACCEPTED' },
    { label: 'REJECTED', value: 'REJECTED' },
    { label: 'INTERVIEW', value: 'INTERVIEW'},
  ];

  const handleStatusSelect = (value) => {
    setStatus(value);      
    setShowDropdown(false);  // Close dropdown after selection
  };
  async function handleWritingData(){
    await writeToDatabase(applicationFactory(company, jobTitle, status));
    navigateBack();
  }

  const handleSubmit = () => {
    // Here you can later incorporate the data with your backend or state
    //Alert.alert("Form Submitted", `Company: ${company}\nJob Title: ${jobTitle}\nStatus: ${status}`);
    handleWritingData();
  };

  return (
    <View style={styles.container}>
      {/* Go Back Button at the top-left corner */}
      <TouchableOpacity onPress={navigateBack} style={styles.goBackButton}>
        <Text style={styles.goBackText}>{'X'}</Text>
      </TouchableOpacity>

      <Text style={styles.formLabel}>New Application</Text>

      {/* Form Inputs */}
      <TextInput 
        placeholder="Company" 
        style={styles.inputStyle} 
        value={company}
        onChangeText={setCompany} // Track the company input
      />
      <TextInput 
        secureTextEntry={true} 
        placeholder="Job Title" 
        style={styles.inputStyle} 
        value={jobTitle}
        onChangeText={setJobTitle} // Track the job title input
      />

      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
      >
        <Text style={styles.dropdownButtonText}>Status: {status}</Text>
      </TouchableOpacity>

      {/* Show Dropdown if visible */}
      {showDropdown && (
        <FlatList
          data={statusData}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleStatusSelect(item.value)}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color for the screen
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formLabel: {
    fontSize: 30,
    color: '#fff',
    marginTop: 40, // Space below the Go Back button
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  // Dropdown button style
  dropdownButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'white',
  },
  // Dropdown item style
  dropdownItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: 300,
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#356859',
  },
  // Go Back Button Styles
  goBackButton: {
    position: 'absolute',  // Ensure it's fixed in the top-left corner
    top: 40,               // Position the button 40px from the top of the screen
    left: 20,              // Position the button 20px from the left of the screen
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 10,
    zIndex: 10,            // Ensure it appears above other elements
    width: 40,             // Make sure it's big enough to be clicked
    height: 40,            // Make the button a square
    justifyContent: 'center', // Center the text inside the button
    alignItems: 'center',  // Center the text inside the button
  },
  goBackText: {
    fontSize: 24,
    color: '#fff',
  },
  // Submit Button Styles
  submitButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
