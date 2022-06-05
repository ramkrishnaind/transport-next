import React, { useEffect, useState } from "react";

const HomePage = () => {

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [enteredPhoneNumberIsValid, setEnteredPhoneNumberIsValid] = useState(false);

  
  const nameInputChangeHandler = (event) =>{
    setEnteredName(event.target.value);
  }

  const emailInputChangeHandler = (event) =>{
    setEnteredEmail(event.target.value);
  }

  const phoneNumberInputChangeHandler = (event) =>{
    setEnteredPhoneNumber(event.target.value);
  }

    
  // const [values, setValues] = useState({ 
  //   name: '',
  //   email: '', 
  //   phoneNumber: '' 
  // });

  
  // const set = name => {
  //   return ({ target: { value } }) => {
  //     setValues(oldValues => ({...oldValues, [name]: value }));
  //   }
  // };

  const saveFormData = async () => {
    const response = await fetch('/api/', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission

    if( enteredName.trim() === ''){
      setEnteredNameIsValid(false);
      return;
    }
      setEnteredNameIsValid(true);

    if( enteredEmail.trim() === ''){
      setEnteredEmailIsValid(false);
      return;
    }
    setEnteredEmailIsValid(true);

    if( enteredPhoneNumber.trim() === ''){
      setEnteredPhoneNumberIsValid(false);
      return;
    }
    setEnteredPhoneNumberIsValid(true);

    try {
      //await saveFormData();
      console.log(enteredName + enteredEmail + enteredPhoneNumber );
      alert('Success!' );
      setEnteredName('');
      setEnteredEmail('');
      setEnteredPhoneNumber('');
      
    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold mt-10 p-30">
        Find out how much your moving will cost you?
      </h1>
      <form className="max-w-xl m-auto py-10 mt-10 px-12 border">
        <label className="text-gray-600 font-medium text-lg">Full Name</label>
        <input
          className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 mb-10"
          name="name"
          type="text"
          placeholder=""
          autoFocus
          required
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        <label className="text-gray-600 font-medium text-lg">Email Address</label>
        <input
          className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 mb-10"
          name="email"
          type="email"
          placeholder=""
          required
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        <label className="text-gray-600 font-medium text-lg">Phone Number</label>
        <input
          className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 mb-10"
          name="phoneNumber"
          type="text" required 
          placeholder=""
          onChange={phoneNumberInputChangeHandler}
          value={enteredPhoneNumber}
        />
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-green-100 border py-3 px-6 font-semibold text-lg rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Calculate Your Moving Cost
        </button>
        <p className="text-xs text-center text-gray-500 py-3 px-6">Trusted By 100K+ Happy Customers.</p>
      </form>
    </div>
  );
};

export default HomePage;
