import express from "express";

import { generateMonthlyPrediction } from "../services/monthlyPrediction.service.js";
import { generateYearlyPrediction } from "../services/yearlyPrediction.service.js";

const router = express.Router();

router.get("/monthly", (req, res) => {
  const predictions =
    generateMonthlyPrediction();

  res.status(200).json(predictions);
});

router.get("/yearly", (req, res) => {
  const predictions =
    generateYearlyPrediction();

  res.status(200).json(predictions);
});

export default router;