"use client";
import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
 
export default function ScoringPage() {
  const [date, setDate] = useState("");
 
  const handleSchedule = () => {
    alert(`Scoring scheduled for ${date || "[no date selected]"}`);
  };
 
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        background: '#f7f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 900,
          width: '98vw',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Schedule the Scoring
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mt={3}>
          <TextField
            label="Select Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={date}
            onChange={e => setDate(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ScheduleIcon />}
            onClick={handleSchedule}
            sx={{ minWidth: 140 }}
          >
            Schedule
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}