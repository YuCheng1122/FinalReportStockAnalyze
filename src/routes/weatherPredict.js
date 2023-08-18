const express = require("express");
const router = express.Router();

router.get("/WPP", (req, res) => {
  const data = {
    percentage: 75.5,
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
