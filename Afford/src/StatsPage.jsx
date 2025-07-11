import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STORAGE_KEY } from "./UrlShortener";

export default function StatsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setRows(stored);
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Short URL Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((record) => (
              <Row key={record.id} row={record} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <a href={`/${row.shortcode}`}>
            {window.location.origin}/{row.shortcode}
          </a>
        </TableCell>
        <TableCell>{row.longUrl}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
        <TableCell>{new Date(row.expiresAt).toLocaleString()}</TableCell>
        <TableCell>{row.clickCount}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open}>
            <Paper sx={{ m: 2, p: 2 }}>
              <Typography variant="subtitle2">Click Details:</Typography>
              {row.clicks.length === 0 ? (
                <Typography>No clicks yet.</Typography>
              ) : (
                row.clicks.map((c, i) => (
                  <Typography key={i} sx={{ ml: 2 }}>
                    • {c.timestamp} from {c.source} (location: {c.location})
                  </Typography>
                ))
              )}
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
