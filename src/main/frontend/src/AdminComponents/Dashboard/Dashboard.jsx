import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Grid, Typography, Paper } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import admin from "../../images/admin.png";

export const Dashboard = () => {
  const jwt = localStorage.getItem('jwt');
  const [user, setUser] = useState(null); // Initialize user state as null

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get("/api/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}` 
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <Container maxWidth="lg" className="m-10">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom sx={{margin:"3rem"}}>
            Добре дошли в таблото за управление на администратора  <WavingHandIcon sx={{ fontSize: '2.5rem', marginRight: '0.5rem' }}/>
          </Typography>

          <div className="flex flex-col justify-center items-center m-10">
            <img src={admin} alt="" style={{ width: '275px', height: '300px' }} />
            {user && (
              <>
                <h1 className="py-5 text-2xl font-semibold">{user.firstName} {user.lastName}</h1>
                <p>Email: {user.email}</p>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <Typography variant="body1">
              Това е вашето администраторско табло, където можете да управлявате различни аспекти на вашето приложение.
            </Typography>
            <Typography variant="body1" className="mt-2">
              Можете да управлявате поръчки, да актуализирате менюто, да управлявате категории и много повече.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
