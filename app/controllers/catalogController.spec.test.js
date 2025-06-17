import { catalogController } from "./catalogController";
import { dataMapper } from "../models/dataMapper.js";
import { describe, jest, test, beforeEach } from "@jest/globals";

describe("catalogController", () => {

  describe("catalogPage", () => {
    test("should render catalog page with products and flavors", async () => {
      const req = { session: {} };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        locals: {},
      };
      const mockFlavors = [{ id: 1, name: "Flavor1" }];
      const mockProducts = [{ id: 1, name: "Coffee" }];
      jest.spyOn(dataMapper, "findFlavors").mockResolvedValue(mockFlavors);
      jest
        .spyOn(dataMapper, "findThirdLastProduct")
        .mockResolvedValue(mockProducts);

      await catalogController.catalogPage(req, res);

      expect(dataMapper.findFlavors).toHaveBeenCalled();
      expect(dataMapper.findThirdLastProduct).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith("catalog", {
        flavors: mockFlavors,
        title: "Notre catalogue",
      });
    });

    test("should render catalog page with products from session if filterFlavor exists", async () => {
      const req = { session: { filterFlavor: [{ id: 2, name: "SessionCoffee" }] } };
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        locals: {},
      };
      const mockFlavors = [{ id: 1, name: "Flavor1" }];
      jest.spyOn(dataMapper, "findFlavors").mockResolvedValue(mockFlavors);
      // On ne spy que si besoin, mais on vérifie bien l'appel
      const findThirdLastProductSpy = jest.spyOn(dataMapper, "findThirdLastProduct");

      await catalogController.catalogPage(req, res);

      expect(dataMapper.findFlavors).toHaveBeenCalled();
      // Correction : on vérifie que la fonction n'est pas appelée
      expect(findThirdLastProductSpy).not.toHaveBeenCalled();
      expect(res.locals.products).toEqual(req.session.filterFlavor);
      expect(res.render).toHaveBeenCalledWith("catalog", {
        flavors: mockFlavors,
        title: "Notre catalogue",
      });
    });

    test("should handle errors and respond with server error", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const mockError = new Error("Database error");
      jest.spyOn(dataMapper, "findFlavors").mockRejectedValue(mockError);

      await catalogController.catalogPage(req, res);

      expect(dataMapper.findFlavors).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error !");
    });
  });

  describe("filterFlavorCatagory", () => {
    test("should filter products by flavor and redirect to catalog", async () => {
      const req = { params: { idFlavor: "1" }, session: {} };
      const res = { redirect: jest.fn() };
      const mockCoffeeByFlavor = [{ id: 1, name: "Coffee" }];
      jest
        .spyOn(dataMapper, "getCoffeeByFlavor")
        .mockResolvedValue(mockCoffeeByFlavor);

      await catalogController.filterFlavorCatagory(req, res);

      expect(dataMapper.getCoffeeByFlavor).toHaveBeenCalledWith(1);
      expect(req.session.filterFlavor).toEqual(mockCoffeeByFlavor);
      expect(res.redirect).toHaveBeenCalledWith("/catalog");
    });

    test("should handle errors and respond with server error", async () => {
      const req = { params: { idFlavor: "1" }, session: {} };
      const res = {
        redirect: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const mockError = new Error("Database error");
      jest.spyOn(dataMapper, "getCoffeeByFlavor").mockRejectedValue(mockError);

      await catalogController.filterFlavorCatagory(req, res);

      expect(dataMapper.getCoffeeByFlavor).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error !");
    });
  });
});
