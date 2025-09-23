import { Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">
        Siron<sup>®</sup>One – Client Assist
      </Typography>
      <Typography variant="body1">
          Welcome to IMTF Siron<sup>®</sup>One Client Assist.
      </Typography>
      <Typography variant="body1">
        Please use the navigation links to access the different sections of the
        application.
      </Typography>
    </Paper>
  );
}
