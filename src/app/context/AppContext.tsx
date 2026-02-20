import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FreelancerProfile, EmployerProfile, UserType, Connection } from '@/app/types';

interface AppContextType {
  userType: UserType | null;
  setUserType: (type: UserType | null) => void;
  userIntent: UserType | null;
  setUserIntent: (intent: UserType | null) => void;
  currentUser: FreelancerProfile | EmployerProfile | null;
  setCurrentUser: (user: FreelancerProfile | EmployerProfile | null) => void;
  freelancers: FreelancerProfile[];
  setFreelancers: (freelancers: FreelancerProfile[]) => void;
  employers: EmployerProfile[];
  setEmployers: (employers: EmployerProfile[]) => void;
  connections: Connection[];
  setConnections: (connections: Connection[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userIntent, setUserIntent] = useState<UserType | null>(null);
  const [currentUser, setCurrentUser] = useState<FreelancerProfile | EmployerProfile | null>(null);
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);
  const [employers, setEmployers] = useState<EmployerProfile[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        userIntent,
        setUserIntent,
        currentUser,
        setCurrentUser,
        freelancers,
        setFreelancers,
        employers,
        setEmployers,
        connections,
        setConnections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};