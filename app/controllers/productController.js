import { dataMapper } from "../models/dataMapper.js";

export const productController = {
  async productPage(req, res, next) {
    try {
      const idCoffee = parseInt(req.params.idCoffee, 10);

      const howManyProducts = res.locals.howManyProducts;
      
      const howManyProduct = await dataMapper.howManyProduct();
        if(idCoffee > howManyProducts){
            next();
            return;
        }
      const product = await dataMapper.findOneCoffee(idCoffee);
      res.render("product", { product, title: product.name });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Server Error !`);
    }
  },
};
