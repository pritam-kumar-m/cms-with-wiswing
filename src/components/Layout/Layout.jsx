"use client";

import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import TopAppBar from "./TopAppBar";

const Layout = ({ children }) => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopAppBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
