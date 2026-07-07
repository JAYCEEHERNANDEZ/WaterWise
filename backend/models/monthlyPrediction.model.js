import mockBillingData, {
  overallPrediction,
} from "../data/mockBillingData.js";

export const getMonthlyPrediction = () => {
  const monthlyTotals = {};

  // Aggregate monthly consumption
  mockBillingData.forEach((record) => {
    const month = record.billing_date.slice(0, 7);

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + record.cubic_used;
  });

  const monthlyData = Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, consumption]) => ({
      month,
      consumption,
      predicted: false,
    }));

  monthlyData.push({
    month: overallPrediction.monthly.predictedMonth.slice(0, 7),
    consumption:
      overallPrediction.monthly.predictedConsumption,
    predicted: true,
  });

  return monthlyData;
};