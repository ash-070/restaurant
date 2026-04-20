import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Edit from "./edit";
// import Link from '@mui/material/Link';

export default function List() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

const fetchReservations = () => {
    
    const token = localStorage.getItem('token');

    axios.get("http://127.0.0.1:8000/api/reservations", {
    
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then((res) => {
        if (res.data.status === "success") {
          setReservations(res.data.data);
        } else {
          console.error("Error:", res.data.message);
        }
      })
      .catch((err) => {
         console.error("Axios Error:", err);
      });
  };


  const handleDelete = (id) => {
    console.log(id)
    axios.delete("http://127.0.0.1:8000/api/reservations", { data: { id } })
      .then((res) => {
        if (res.data.status === "success") {

          setReservations(reservations.filter(r => r.id !== id));
        } else {
          alert("erroe");
        }
      })
   
  };
console.log(reservations)
  const UsersList =reservations.map(user => (
          <tr key={user.id}>
            <td>{user.Visiteur}</td>
            <td>{user.Passeport}</td>
            <td>{user.Tel}</td>
            <td>{user.Chambre}</td>
            <td>{user.Type}</td>
            <td>
              <Link to={`/edit/${user.id}`}>
                <Button variant="contained" size="small">Edit</Button>
              </Link>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
  return (
    <>
    
   
    <table border={1}>
      <thead>
        <tr>
          <th>Visiteur</th>
          <th>Passeport</th>
          <th>Tel</th>
          <th>Chambre</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {UsersList}
      </tbody>
    </table>
    </>
  );
}
