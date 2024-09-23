/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer, Model } from 'miragejs';

// Define types for the employee data
interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
}

export function makeServer() {
    return createServer({
      models: {
        employee: Model.extend<Partial<Employee>>({}),
      },
  
    seeds(server) {
        server.create('employee', { id: "1", name: 'John Doe', email: 'johndoe@example.com', department: 'Sales' });
        server.create('employee', { id: "2", name: 'Jane Smith', email: 'janesmith@example.com', department: 'Marketing' });
        server.create('employee', { id: "3", name: 'Michael Johnson', email: 'michaeljohnson@example.com', department: 'Engineering' });
        server.create('employee', { id: "4",name: 'Michael Johnson', email: 'emilydavis@example.com', department: 'Human Resources' });
        server.create('employee', { id: "5", name: 'David Lee', email: 'davidlee@example.com', department: 'Finance' });
        server.create('employee', { id: "6", name: 'Olivia Taylor', email: 'oliviataylor@example.com', department: 'Sales' });
        server.create('employee', { id: "7", name: 'Noah Brown', email: 'noahbrown@example.com', department: 'Marketing' });
        server.create('employee', { id: "8", name: 'Emma Jones', email: 'emmajones@example.com', department: 'Engineering' });
        server.create('employee', { id: "9", name: 'Ava Miller', email: 'avamiller@example.com', department: 'Human Resources' });
        server.create('employee', { id: "10", name: 'Liam Garcia', email: 'liamgarcia@example.com', department: 'Finance' });
    },

    routes() {
        this.namespace = 'api';

        this.get('/employees', (schema: any) => {
            return schema.employees.all();
        });

        this.post('/employees', (schema: any, request) => {
            const attrs = JSON.parse(request.requestBody);
            return schema.employees.create(attrs);
        });

        this.put('/employees/:id', (schema: any, request) => {
            const id = request.params.id;
            const attrs = JSON.parse(request.requestBody);
            const employee = schema.employees.find(id);
            return employee?.update(attrs);
        });

        this.delete('/employees/:id', (schema: any, request) => {
            const id = request.params.id;
            const employee = schema.employees.find(id);
            return employee?.destroy();
        });
    },
})
}

