import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchEmployees, deleteEmployee } from '../store/employeeSlice';
import EmployeeForm from './EmployeeForm';
import Modal from 'react-modal';
interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
}

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status } = useSelector((state: RootState) => state.employees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const openModal = (employee: Employee | null) => {
    setEditingEmployee(employee);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditingEmployee(null);
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <button
        onClick={() => openModal(null)}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add New Employee
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Department</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-300 hover:bg-gray-100">
              <td className="py-3 px-6">{employee.name}</td>
              <td className="py-3 px-6">{employee.email}</td>
              <td className="py-3 px-6">{employee.department}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => openModal(employee)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Employee */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
        <h2 className="text-2xl font-bold mb-4">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <EmployeeForm employee={editingEmployee} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
