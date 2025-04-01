import React, { createContext, useContext, useState } from 'react';

interface AgreementContextType {
  value?: any;
}

const AgreementContext = createContext<AgreementContextType | undefined>(undefined);

export const AgreementProvider: React.FC<{ children: React.ReactNode, value?: any }> = ({ value, children }) => {

  return (
    <AgreementContext.Provider value={{ value }}>
      {children}
    </AgreementContext.Provider>
  );
};

export const useAgreement = () => {
  const context = useContext(AgreementContext);
  if (context === undefined) {
    throw new Error('useAgreement must be used within an AgreementProvider');
  }
  return context;
}; 