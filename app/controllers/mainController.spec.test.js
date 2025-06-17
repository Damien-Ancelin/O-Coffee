import { mainController } from "./mainController";
import { dataMapper } from "../models/dataMapper.js";
import { describe, jest, test } from "@jest/globals";

describe("mainController", () => {
  describe("homePage", () => {
    test("should render home page with products", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const mockProducts = [{ id: 1, name: "Coffee" }];
      jest.spyOn(dataMapper, "findThirdLastProduct").mockResolvedValue(mockProducts);

      await mainController.homePage(req, res);

      expect(dataMapper.findThirdLastProduct).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith("home", { products: mockProducts, title: "Acceuil" });
    });

    test("should handle errors and respond with server error", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const mockError = new Error("Database error");
      jest.spyOn(dataMapper, "findThirdLastProduct").mockRejectedValue(mockError);

      await mainController.homePage(req, res);

      expect(dataMapper.findThirdLastProduct).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error !");
    });
  });

  describe("aboutUsPage", () => {
    test("should render about us page", () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      mainController.aboutUsPage(req, res);

      expect(res.render).toHaveBeenCalledWith("aboutUs", { title: "à propos de nous" });
    });
  });
});