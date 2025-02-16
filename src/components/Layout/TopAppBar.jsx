// src/components/Layout/TopAppBar.js
"use client";

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopAppBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CMS Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
