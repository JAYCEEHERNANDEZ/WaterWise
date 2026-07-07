import mockBillingData, {
  overallPrediction,
} from "../data/mockBillingData.js";

export const getYearlyPrediction = () => {
  const yearlyTotals = {};

  // Aggregate yearly consumption
  mockBillingData.forEach((record) => {
    const year = record.billing_date.slice(0, 4);

    yearlyTotals[year] =
      (yearlyTotals[year] || 0) + record.cubic_used;
  });

  const yearlyData = Object.entries(yearlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, consumption]) => ({
      year: Number(year),
      consumption,
      predicted: false,
    }));

  yearlyData.push({
    year: Number(overallPrediction.yearly.predictedYear),
    consumption:
      overallPrediction.yearly.predictedConsumption,
    predicted: true,
  });

  return yearlyData;
};