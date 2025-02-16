import { dataMapper } from "../models/dataMapper.js";

export const catalogController = {
  async catalogPage(req, res) {
    try {
      const flavors = await dataMapper.findFlavors();
      if(req.session.filterFlavor) {
        res.locals.products = req.session.filterFlavor;
      }else{
        res.locals.products = await dataMapper.findThirdLastProduct();
      }
      res.render("catalog", { flavors, title: "Notre catalogue" });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Server Error !`);
    }
  },
  async filterFlavorCatagory(req, res) {
    try {
      const idFlavor = parseInt(req.params.idFlavor);
      const coffeeByFlavor = await dataMapper.getCoffeeByFlavor(idFlavor);
      req.session.filterFlavor = coffeeByFlavor;
      res.redirect("/catalog");
    } catch (error) {
      console.error(error);
      res.status(500).send(`Server Error !`);
    }
  },
  async allFlavor(req, res) {
    try {
      const allFlavor = await dataMapper.getAllCoffee();
      req.session.filterFlavor = allFlavor;
      res.redirect("/catalog");
    } catch (error) {
      console.error(error);
      res.status(500).send(`Server Error !`);
    }
  },
};
