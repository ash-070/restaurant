import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalRevenue: 0,
  });

useEffect(() => {
    const token = localStorage.getItem('token'); 

    axios.get("http://127.0.0.1:8000/api/reservations", {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then((res) => {
        if (res.data.status === "success") {
          const reservations = res.data.data;
          const revenue = reservations.reduce((sum, item) => sum + (Number(item.Total) || 0), 0);
          
          setStats({
            totalReservations: reservations.length,
            totalRevenue: revenue
          });
        }
      })
     
  }, []);
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minHeight: '120px', backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                All reservations
              </Typography>
              <Typography variant="h3"  color="primary">
                {stats.totalReservations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ minHeight: '120px', backgroundColor: '#e8f5e9' }}>
            <CardContent>
              <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
               profits
              </Typography>
              <Typography variant="h3" color="success.main">
                {stats.totalRevenue} DH
              </Typography>
            </CardContent>
          </Card>
        </Grid>

       
      </Grid>
    </Box>
  );
}