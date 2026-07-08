import { getPurokPredictionData } from "../models/purokPrediction.model.js";

const calculatePrediction = (values) => {
  if (values.length === 0) return 0;

  if (values.length === 1) {
    return values[0];
  }

  const growth =
    (values[values.length - 1] - values[0]) /
    (values.length - 1);

  return Math.round(
    values[values.length - 1] + growth
  );
};

const getConsumptionFields = (record) => {
  return Object.keys(record).filter(
    (key) =>
      key !== "year" &&
      key !== "purok"
  );
};

export const generateMonthlyPrediction = () => {
  const records =
    getPurokPredictionData();

  const latestYear = Math.max(
    ...records.map((record) => record.year)
  );

  const latestYearRecords = records.filter(
    (record) => record.year === latestYear
  );

  return latestYearRecords.map((record) => {
    const fields =
      getConsumptionFields(record);

    const historical =
      fields.map((field) => ({
        period: field,
        consumption: record[field],
      }));

    const predictedConsumption =
      calculatePrediction(
        historical.map(
          (item) => item.consumption
        )
      );

    return {
      purok: record.purok,
      latestYear,
      historical,
      predicted: predictedConsumption,
    };
  });
};