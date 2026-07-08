import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { generateMonthlyPrediction } from "../services/purokmonthlyPrediction.service.js";
import { getPurokPredictionData } from "../models/purokPrediction.model.js";

vi.mock(
  "../models/purokPrediction.model.js",
  () => ({
    getPurokPredictionData: vi.fn(),
  })
);

describe(
  "generateMonthlyPrediction",
  () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it(
      "It should generate monthly prediction for every purok in the latest year.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2024,
            purok: "Purok 1",
            january: 40,
            february: 42,
            march: 44,
            april: 46,
            may: 48,
          },
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 52,
            march: 54,
            april: 56,
            may: 58,
          },
          {
            year: 2025,
            purok: "Purok 2",
            january: 60,
            february: 62,
            march: 64,
            april: 66,
            may: 68,
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result).toEqual([
          {
            purok: "Purok 1",
            latestYear: 2025,
            historical: [
              {
                period: "january",
                consumption: 50,
              },
              {
                period: "february",
                consumption: 52,
              },
              {
                period: "march",
                consumption: 54,
              },
              {
                period: "april",
                consumption: 56,
              },
              {
                period: "may",
                consumption: 58,
              },
            ],
            predicted: 60,
          },
          {
            purok: "Purok 2",
            latestYear: 2025,
            historical: [
              {
                period: "january",
                consumption: 60,
              },
              {
                period: "february",
                consumption: 62,
              },
              {
                period: "march",
                consumption: 64,
              },
              {
                period: "april",
                consumption: 66,
              },
              {
                period: "may",
                consumption: 68,
              },
            ],
            predicted: 70,
          },
        ]);
      }
    );

    it(
      "It should return the same value when only one month exists.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
            january: 80,
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(80);
      }
    );

    it(
      "It should return zero when there are no consumption fields.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
          },
        ]);

        // Act
        const result =
          generateMonthlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(0);
      }
    );
  }
);