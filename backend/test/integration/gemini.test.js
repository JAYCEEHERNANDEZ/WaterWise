import { describe, it, expect } from "vitest";
import {
  ai,
  GEMINI_MODELS,
} from "../../config/gemini.js";

describe("Validate Gemini Integration", () => {
  it("should have a configured API key", () => {
  // Arrange
  const apiKey = process.env.GEMINI_API_KEY;
  // Act
  const isConfigured = Boolean(apiKey);
  // Assert
  expect(apiKey).toBeDefined();
  expect(isConfigured).toBe(true);
});

  it("should initialize the Gemini client", () => {
  // Arrange
  const client = ai;
  // Act
  const isInitialized = Boolean(client);
  // Assert
  expect(isInitialized).toBe(true);
});

  it(
    "should successfully connect to Gemini API",
    async () => {
      // Arrange
      const model = GEMINI_MODELS[0];
      // Act
      const response = await ai.models.generateContent({
        model,
        contents: "Say hello",
      });
      // Assert
      expect(response).toBeDefined();
      expect(response.text).toBeTruthy();
    },
    30000
  );
});