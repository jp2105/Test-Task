import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkServer } from '../mirage/utility';

interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
}

interface EmployeeState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EmployeeState = {
  employees: [],
  status: 'idle',
};

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    await checkServer();
    const response = await axios.get('/api/employees');
    return response.data.employees; // Ensure this matches the MirageJS response
  });
  
  // Async thunk for adding an employee
  export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee: Omit<Employee, 'id'>) => {
    await checkServer();
    const response = await axios.post('/api/employees', employee);
    return response.data?.employee;
  });
  
  // Async thunk for updating an employee
  export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee) => {
    await checkServer();
    const response = await axios.put(`/api/employees/${employee.id}`, employee);
    return response.data?.employee; // Assuming it returns the updated employee
  });
  
  // Async thunk for deleting an employee
  export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
    await checkServer();
    await axios.delete(`/api/employees/${id}`);
    return id; // Return the ID for state update
  });
  
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        console.log('action.payload', action.payload)
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  }
});

export default employeeSlice.reducer;
