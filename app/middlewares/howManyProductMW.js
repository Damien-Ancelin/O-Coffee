import { dataMapper } from "../models/dataMapper.js";

export const howManyProductsMW = async function (req, res, next) {
  try {
    const howManyProducts = await dataMapper.howManyProduct();
    res.locals.howManyProducts = howManyProducts;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(`Server Error !`);
  }
};
