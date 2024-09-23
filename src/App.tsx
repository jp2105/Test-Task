import React from 'react';
import EmployeeList from './components/EmployeeList';

const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Employee Management</h1>
      <EmployeeList />
    </div>
  );
};

export default App;
