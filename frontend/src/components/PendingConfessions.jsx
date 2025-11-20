import { useEffect, useState } from "react";
import {   Container, Table, Button } from "react-bootstrap";
import { getPendingConfessions, updateConfessionStatus } from "../services/UserService";

export function PendingConfessions() {
  const [confessions, setConfessions] = useState([]);

  const fetchConfessions = async () => {
    try {
      const data = await getPendingConfessions();
      setConfessions(data);
    } catch (error) {
      console.error("Error fetching confessions:", error);
    }
  };

  const handleStatusChange = async (confession_id, status) => {
    try {
      await updateConfessionStatus(confession_id, status);
      alert(`Confession ${status} successfully!`);
      fetchConfessions(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  return (
    <Container className="mt-3">
      {confessions.length === 0 ? (
        <h4 className="text-center mt-4">No Pending Confessions Found</h4>
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
              <th>Actions</th>
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
                <td>{confession.status}</td>
                <td>
                  <Button className="mb-1"
                    variant="success"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(confession.confession_id, "accepted")
                    }
                  >
                    Accept
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(confession.confession_id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
