import { dataMapper } from "../models/dataMapper.js";
import emailValidator from "email-validator";
import PasswordValidator from "password-validator";
import argon2 from "argon2";

export const registerController = {
  registerPage(req, res){
    res.render("register", { title: "Inscription" });
  },

  async handleRegister(req, res, next){
    try {
      const error = 0;
      const { email, lastname, firstname, password, confirmation } = req.body;

      const schema = new PasswordValidator();
      schema
          .is()
          .min(8, "Votre mot de passe doit avoir minimum 8 caractères")
          .has()
          .uppercase(1, "Votre mot de passe doit avoir minimum 1 majuscule")
          .has()
          .symbols(1, "Votre mot de passe doit avoir minimum 1 caractère spécial")
          .has()
          .digits(1, "Votre mot de passe doit avoir minimum 1 chiffre");

      
      // * 1. Vérification input remplis
      for(let formValues in req.body){
        if(req.body[formValues] === ""){
          error++;
          return res.render("register", { error: "Les champs ne peuvent pas être vide !", title: "Inscription" });
        };
      };
      
      // * 2. Vérification format email valide
      if (!emailValidator.validate(email)) {
        error++;
        return res.render("register", { error: "L'email ne respecte pas un format valide", title: "Inscription" });
      };

      // * 3. Verification du schéma de mot de passe
      const passwordError = schema.validate(password, { details: true });
      if (passwordError.length > 0) {
        error++;
        let errorMessages;
        for (const error of passwordError) {
          errorMessages = passwordError.map((error) => error.message).join("<br>");
        }
        return res.render("register", { error: errorMessages, title: "Inscription" });
      };

      // * 4. Verification des mot de passe identique
      if (password !== confirmation) {
        error++;
        return res.render("register", { error: "Les deux mots de passes doivent être identique", title: "Inscription" });
      };

      // * 5. Email déjà existant ?
      const emailNotExist = await dataMapper.isExistEmail(email);
      if(emailNotExist !== "0"){
        error++;
        return res.render("register", { error: "Cet email existe déjà", title: "Inscription" });
      }

      if(error === 0){
        // * 6. Hash password
        const hashedPassword = await argon2.hash(password);
  
        // * 7. Créate User en BDD
        const newUser = await dataMapper.insertUser(email, lastname, firstname, hashedPassword);
        req.session.user = newUser;
        
        // * 8 - Redirection Acceuil
        return res.redirect("/");
      }


    } catch (error) {
      next(error);
    }
    // ! A implémenter
  },
};