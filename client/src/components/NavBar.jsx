import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const NavBar = () => {

  const theme = useTheme()
  return (
    <Box
      width={"100%"}
      p="1rem 6%"
      backgroundColor={theme.palette.background.alt}
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        AI GPT Clone
      </Typography>
      <Link to="/register" p={1}>
        Sign up
      </Link>
      <Link to="/login" p={1}>
        Login
      </Link>
    </Box>
  );
};

export default NavBar;
