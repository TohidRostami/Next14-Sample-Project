import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Title({ children }: { children?: React.ReactNode }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}
