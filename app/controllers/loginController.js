import { EmailJSResponseStatus } from "@emailjs/nodejs";
import { dataMapper } from "../models/dataMapper.js";
import argon2 from "argon2";

export const loginController = {
  loginPage(req, res){
    res.render("login", { title: "Connection" });
  },
  async handleLogin(req, res, next){
    try {
      const { email, password } = req.body;

      for(let formValues in req.body){
        if(req.body[formValues] === ""){
          return res.render("login", { error: "Les champs ne peuvent pas être vide !", title: "Connection" });
        };
      };
      
      const validatedUser = await dataMapper.isExistUser(email);
      
      if(!validatedUser){
        return res.render("login", { error: "Le couple email/password n'est pas valide !", title: "Connection" });
      }

      if(await argon2.verify(validatedUser.password, password)){
        delete validatedUser.lastname;
        delete validatedUser.password;
        req.session.user = validatedUser;
      } else {
        return res.render("login", { error: "Le couple email/password n'est pas valide !", title: "Connection" });
      }
      
      res.status(202).redirect("/");
    } catch (error) {
      next(error);
    }
  },

  logout(req, res){
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect('/');
},
};