
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlShortener from "./UrlShortener";
import StatsPage from "./StatsPage";
import RedirectPage from "./RedirectPage";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener App
          </Typography>
          <Button color="inherit" href="/">
            Shorten URLs
          </Button>
          <Button color="inherit" href="/stats">
            Statistics
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
