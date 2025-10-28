/**
 * Purpose:
 * Vitest test setup and global configuration.
 * Configures test environment, mocks, and utilities for all test files.
 *
 * Context:
 * - Runs before each test suite
 * - Sets up global test utilities and matchers
 * - Configures happy-dom environment
 */

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test case (important for React components)
afterEach(() => {
  cleanup();
});

// Add custom matchers if needed
// Example: expect.extend({...})
