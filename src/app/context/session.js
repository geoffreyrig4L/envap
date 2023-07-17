"use client";

import { createContext, useState } from "react";

const SessionContext = createContext({});

export const SessionContextProvider = (props) => {
  const [user, setUser] = useState({});

  return <SessionContext.Provider {...props} value={{ user, setUser }} />;
};

export default SessionContext;
