import { useEffect, useState } from "react";
import {  Container,  Table, } from "react-bootstrap";
import { getAllUsers } from "../services/UserService";

export function AllUsers() {
  const [users, setUsers] = useState([]);

  //  Fetch all users info
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="mt-1">
      

      {users.length === 0 ? (
        <h4 className="text-center mt-4">No Users Found</h4>
      ) : (
        <Table striped bordered hover responsive className="mt-4 text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
