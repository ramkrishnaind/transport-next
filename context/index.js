import { createContext, useState } from "react";

//Please add more properties as needed
const initContext = {
  userState,
  step3State,
  setUserState: () => {},
  setStep3State: () => {},
};
const TransportContext = createContext(initContext);

export const Provider = ({ children }) => {
  const [userState, setUserState] = useState();
  const [step3State, setStep3State] = useState();
  return (
    <TransportContext.Provider
      value={{
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
