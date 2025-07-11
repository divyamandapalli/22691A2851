import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loggerMiddleware } from "./loggerMiddleware";
import { STORAGE_KEY } from "./UrlShortener";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = stored.findIndex((r) => r.shortcode === shortcode);

    if (index === -1) {
      alert("Short URL not found!");
      navigate("/");
      return;
    }

    const record = stored[index];

    // simulate geo-location
    const clickData = {
      timestamp: new Date().toISOString(),
      source: document.referrer || "Direct",
      location: "Approx Geo Stub",
    };

    record.clicks.push(clickData);
    record.clickCount++;

    stored[index] = record;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    loggerMiddleware("Short URL visited", {
      shortcode,
      clickData,
    });

    window.location.href = record.longUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
