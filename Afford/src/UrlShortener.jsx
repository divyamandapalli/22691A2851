import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { loggerMiddleware } from "./loggerMiddleware";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "urls";

export default function UrlShortener() {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);
  const [inMemoryUrlDB, setInMemoryUrlDB] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setInMemoryUrlDB(stored);
  }, []);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleShorten = () => {
    const newResults = [];
    const updatedDB = [...inMemoryUrlDB];

    inputs.forEach((input) => {
      if (!validateUrl(input.url)) {
        alert(`Invalid URL: ${input.url}`);
        return;
      }

      let shortcode = input.shortcode || uuidv4().slice(0, 6);
      let uniqueCheck = updatedDB.find((e) => e.shortcode === shortcode);

      if (uniqueCheck) {
        alert(`Shortcode collision detected: ${shortcode}`);
        return;
      }

      const validMinutes = input.validity
        ? parseInt(input.validity)
        : 30;

      const expiry = new Date(Date.now() + validMinutes * 60 * 1000);

      const record = {
        id: uuidv4(),
        longUrl: input.url,
        shortcode,
        createdAt: new Date().toISOString(),
        expiresAt: expiry.toISOString(),
        clickCount: 0,
        clicks: [],
      };

      updatedDB.push(record);
      newResults.push(record);

      loggerMiddleware("Shortened URL created", record);
    });

    setInMemoryUrlDB(updatedDB);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDB));
    setResults(newResults);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs
      </Typography>

      {inputs.map((inp, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={inp.url}
              onChange={(e) =>
                handleChange(idx, "url", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Validity (min)"
              fullWidth
              type="number"
              value={inp.validity}
              onChange={(e) =>
                handleChange(idx, "validity", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={inp.shortcode}
              onChange={(e) =>
                handleChange(idx, "shortcode", e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" onClick={addInput} sx={{ mr: 2 }}>
        Add More URLs
      </Button>
      <Button variant="contained" color="primary" onClick={handleShorten}>
        Shorten
      </Button>

      <div style={{ marginTop: 20 }}>
        {results.map((r) => (
          <div key={r.id}>
            <Typography>
              Short URL:{" "}
              <a href={`/${r.shortcode}`}>{window.location.origin}/{r.shortcode}</a>
              <br />
              Expires At: {new Date(r.expiresAt).toLocaleString()}
            </Typography>
            <hr />
          </div>
        ))}
      </div>
    </Paper>
  );
}

export { STORAGE_KEY };
