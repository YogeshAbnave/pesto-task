import React, { useState } from 'react';
import { Table, Button, Badge, Form } from 'react-bootstrap';

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({ field: 'title', ascending: true });

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const fieldA = a[sortOrder.field].toLowerCase();
    const fieldB = b[sortOrder.field].toLowerCase();

    if (fieldA < fieldB) {
      return sortOrder.ascending ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortOrder.ascending ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <Form className="mb-3 mt-3">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Button
                variant="link"
                onClick={() => setSortOrder({ field: 'title', ascending: !sortOrder.ascending })}
              >
                Title {sortOrder.field === 'title' && (sortOrder.ascending ? '↑' : '↓')}
              </Button>
            </th>
            <th>Description</th>
            <th>
              <Button
                variant="link"
                onClick={() => setSortOrder({ field: 'status', ascending: !sortOrder.ascending })}
              >
                Status {sortOrder.field === 'status' && (sortOrder.ascending ? '↑' : '↓')}
              </Button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Badge variant="info">{task.status}</Badge>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <select
                    value={task.status}
                    onChange={(e) => onUpdateStatus(task, e.target.value)}
                    className="mr-2"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <Button variant="danger" onClick={() => onDelete(task)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
