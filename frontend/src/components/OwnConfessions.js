import React, { useEffect, useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import { getOwnConfessions } from "../services/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  function OwnConfessions() {
  const [confessions, setConfessions] = useState([]);

  //  Fetch user’s confessions
  const fetchOwnConfessions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to view confessions");
        return;
      }

      const data = await getOwnConfessions(token);
      setConfessions(data);
    } catch (error) {
      toast.error("Error fetching your confessions");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOwnConfessions();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4" style={{ color: "#4a148c" }}>
        My Confessions
      </h3>

      {confessions.length === 0 ? (
        <h5 className="text-center text-muted">No confessions found</h5>
      ) : (
        <Table bordered hover responsive className="shadow-sm text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Title</th>
              <th>Content</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {confessions.map((confession) => (
              <tr key={confession.confession_id}>
                <td>{confession.confession_id}</td>
                <td>{confession.category}</td>
                <td>{confession.title}</td>
                <td>{confession.content}</td>
                <td>
                  <Badge
                    bg={
                      confession.status === "accepted"
                        ? "success"
                        : confession.status === "rejected"
                        ? "danger"
                        : "secondary"
                    }
                  >
                    {confession.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
