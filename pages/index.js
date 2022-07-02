import React, { useEffect, useState, useContext } from "react";
import { registerCustomer } from '../services/customer-api-service';
import { Button, notification, Alert } from 'antd';
import TransportContext from "../context";
import { useRouter } from "next/router"
const HomePage = () => {
  const context = useContext(TransportContext);
  const router = useRouter();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");

  const [nameBlur, setNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [phoneNumberBlur, setPhoneNumberBlur] = useState(false);

  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);

  useEffect(() => {
    if (enteredName) {
      console.log("Name is valid");
    }
  }, [enteredName]);

  useEffect(() => {
    if (enteredEmail) {
      console.log("Email is valid");
    }
  }, [enteredEmail]);

  useEffect(() => {
    if (enteredPhoneNumber) {
      console.log("PhoneNumber is valid");
    }
  }, [enteredPhoneNumber]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    // validateEmail(event.target.value);
    // if(enteredEmailIsValid){
    setEnteredEmail(event.target.value);
    // }
  };

  const phoneNumberInputChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };
  const disableSubmit =
    !enteredName ||
    !enteredPhoneNumber ||
    !enteredEmail ||
    !enteredEmail.includes("@");
  function validateEmail(email) {
    setEnteredEmailIsValid(false);
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result) {
      setEnteredEmailIsValid(true);
    }
  }

  const saveFormData = async () => {
    const formData = {
      fullName: enteredName,
      email: enteredEmail,
      mobile: enteredPhoneNumber
    }
    context.setCustomerDetails(formData);
    return await registerCustomer(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    setNameBlur(true);
    setEmailBlur(true);
    setPhoneNumberBlur(true);

    if (!enteredName || !enteredEmail || !enteredPhoneNumber) return;
    try {
      let saveResponse = await saveFormData();
      console.log('saveRes', saveResponse.data)
      if (saveResponse.data.status) {
        alert(saveResponse.data.message)
        setEnteredName("");
        setEnteredEmail("");
        setEnteredPhoneNumber("");
        router.push("/otp")
      } else {
        console.log("i am in else", saveResponse.data.error.error.details[0].message)
        notification.open({
          type: 'error',
          message: 'Error',
          description: saveResponse.data.error.error.details[0].message,
        });
      }

    } catch (e) {
      alert(`Submission failed! ${e.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold mt-10 p-30">
        Find out how much your moving will cost you?
      </h1>
      <form className="max-w-xl m-auto py-10 mt-10 px-12 border">
        <div className="mb-10">
          <label className="text-gray-600 font-medium text-lg">Full Name</label>
          <input
            className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700 "
            type="text"
            placeholder=""
            autoFocus
            required
            onChange={nameInputChangeHandler}
            value={enteredName}
            onBlur={() => setNameBlur(true)}
          />
          {nameBlur && !enteredName && (
            <div className="text-red-400">Name must not be empty.</div>
          )}
        </div>
        <div className="mb-10">
          <label className="text-gray-600 font-medium text-lg">
            Email Address
          </label>
          <input
            className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700"
            type="email"
            placeholder=""
            required
            onChange={emailInputChangeHandler}
            value={enteredEmail}
            onBlur={() => setEmailBlur(true)}
          />
          {emailBlur && (!enteredEmail || !enteredEmail.includes("@")) && (
            <p className="text-red-400">Email address must be valid.</p>
          )}
        </div>
        <div className="mb-10">
          <label className="text-gray-600 font-medium text-lg">
            Phone Number
          </label>
          <input
            className="border-solid border-gray-200 border py-2 px-4 w-full rounded text-gray-700"
            type="text"
            required
            placeholder=""
            onChange={phoneNumberInputChangeHandler}
            value={enteredPhoneNumber}
            onBlur={() => setPhoneNumberBlur(true)}
          />
          {phoneNumberBlur && !enteredPhoneNumber && (
            <p className="text-red-400">Phone Number must not be empty.</p>
          )}
        </div>
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-green-100 border py-3 px-6 font-semibold text-lg rounded disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          disabled={disableSubmit}
          type="submit"
          onClick={handleSubmit}
        >
          Calculate Your Moving Cost
        </button>
        <p className="text-xs text-center text-gray-500 py-3 px-6">
          Trusted By 100K+ Happy Customers.
        </p>
      </form>
    </div>
  );
};

export default HomePage;