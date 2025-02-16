export const MW404 = function (req, res) {
  res.status(404).render("page404", { title: "Erreur 404" });
};
