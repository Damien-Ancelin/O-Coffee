import { jest, beforeEach, afterAll } from "@jest/globals";
import client from "../models/database.js";

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  client.end();
});