import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table, Badge } from "react-bootstrap";
import { getAllConfessions1 } from "../services/UserService";

export function ConfessionsList() {
  const [confessions, setConfessions] = useState([]);

  //  Fetch all confessions using service function
  const fetchConfessions = async () => {
    try {
      const data = await getAllConfessions1();
      setConfessions(data);
    } catch (error) {
      console.error("Error fetching confessions:", error);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  return (
    <Container className="mt-1">
      

      {confessions.length === 0 ? (
        <h4 className="text-center mt-4">No Confessions Found</h4>
      ) : (
        <Table striped bordered hover responsive className="mt-4 text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>User ID</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {confessions.map((confession) => (
              <tr key={confession.confession_id}>
                <td>{confession.confession_id}</td>
                <td>{confession.title}</td>
                <td>{confession.content}</td>
                <td>{confession.id}</td>
                <td>{confession.category}</td>
                <td>{confession.status} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
