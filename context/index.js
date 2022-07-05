import { createContext, useState } from "react";

//Please add more properties as needed
const initContext = {
  isAuth: Boolean,
  setIsAuth: () => { },
  userState: {},
  customerDetails: {},
  setCustomerDetails: () => { },
  setUserState: () => { },
  step3State: {},
  setUserState: () => { },
  setStep3State: () => { },
};
const TransportContext = createContext(initContext);

export const AppProvider = ({ children }) => {
  const [userState, setUserState] = useState();
  const [step3State, setStep3State] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [customerDetails, setCustomerDetails] = useState();
  return (
    <TransportContext.Provider
      value={{
        isAuth,
        setIsAuth,
        customerDetails,
        setCustomerDetails,
        userState,
        step3State,
        setUserState,
        setStep3State,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};
export default TransportContext;