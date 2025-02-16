import emailjs from "@emailjs/nodejs";

export const contactController = {
  contactPage(req, res) {
    res.render("contact", { title: "Contact" });
  },

  handleMessage(req, res) {
    const { name, email, subject, message } = req.body;
    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        process.env.SERVICE_ID_EMAILJS,
        process.env.TEMPLATE_ID_EMAILJS,
        templateParams,
        {
          publicKey: process.env.PUBLIC_KEY_EMAILJS,
          privateKey: process.env.PRIVATE_KEY_EMAILJS,
        }
      )
      .then((response) =>
        console.log("SUCCESS!", response.status, response.text)
      )
      .catch((err) => console.log("FAILED...", err));

    res.status(201).redirect("/");
  },
};
