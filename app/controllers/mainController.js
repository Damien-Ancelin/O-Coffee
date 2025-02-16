import { dataMapper } from "../models/dataMapper.js";
export const mainController = {
  async homePage(req, res) {
  console.log(res.locals);
    try {
      const products = await dataMapper.findThirdLastProduct();
      res.render("home", { products, title: "Acceuil" });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Server Error !`);
    }
  },
  aboutUsPage(req, res) {
    res.render("aboutUs", { title: "à propos de nous" });
  },
};
