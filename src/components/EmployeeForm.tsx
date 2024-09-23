import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addEmployee, updateEmployee } from '../store/employeeSlice';

interface EmployeeFormProps {
  employee?: { id: string; name: string; email: string; department: string } | null;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose }) => {
  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setDepartment(employee.department);
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, name, email, department }));
    } else {
      dispatch(addEmployee({ name, email, department }));
    }
    onClose(); // Close modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Department:</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {employee ? 'Update' : 'Add'} Employee
      </button>
      <button type="button" onClick={onClose} className="ml-2 text-gray-500">
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
