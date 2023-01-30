import { createContext, useState } from "react";

//Please add more properties as needed
const initContext = {
  OTP: null,
  setOTP: () => {},
  isAuth: Boolean,
  setIsAuth: () => {},
  booking: {},
  setBooking: () => {},
  userState: {},
  customerDetails: {},
  setCustomerDetails: () => {},
  setUserState: () => {},
  step3State: {},
  setUserState: () => {},
  setStep3State: () => {},
  step1State: {},
  setStep1State: () => {},
  step2State: {},
  setStep2State: () => {},
  step4State: {},
  setStep4State: () => {},
  step4Items: [],
  setStep4Items: () => {},
  step5State: {},
  setStep5State: () => {},
  quotation: {},
  setQuotation: () => {},
};
const TransportContext = createContext(initContext);

export const AppProvider = ({ children }) => {
  const [userState, setUserState] = useState();
  const [OTP, setOTP] = useState();
  const [step1State, setStep1State] = useState();
  const [step2State, setStep2State] = useState();
  const [step3State, setStep3State] = useState();
  const [step4State, setStep4State] = useState();
  const [step5State, setStep5State] = useState();
  const [step4StepResults, setStep4StepResults] = useState();
  const [step4Items, setStep4Items] = useState();
  const [quotation, setQuotation] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [customerDetails, setCustomerDetails] = useState();
  const [booking, setBooking] = useState();
  return (
    <TransportContext.Provider
      value={{
        OTP,
        setOTP,
        isAuth,
        setIsAuth,
        customerDetails,
        setCustomerDetails,
        booking,
        setBooking,
        userState,
        step3State,
        setUserState,
        setStep3State,
        step1State,
        setStep1State,
        step2State,
        setStep2State,
        step4State,
        setStep4State,
        step4Items,
        setStep4Items,
        step4StepResults,
        setStep4StepResults,
        step5State,
        setStep5State,
        quotation,
        setQuotation,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};
export default TransportContext;
