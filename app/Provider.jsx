"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
function Provider({ children }) {
 
  return (
    
    <SessionProvider>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </SessionProvider>
    
  );
}

export default Provider;
