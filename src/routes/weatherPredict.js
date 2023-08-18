// wppRoutes.js
const express = require("express");
const router = express.Router();

router.get("/WPP", (req, res) => {
  const data = {
    percentage: 75.5, // 這只是一個示例值，您可以根據需要更改
    details: {
      description: "This is a detailed description of the WPP data.",
      source: "Data source name or URL",
      lastUpdated: new Date().toISOString(),
    },
    relatedMetrics: {
      metric1: 45.2,
      metric2: 89.6,
    },
  };

  res.json(data);
});

module.exports = router;
