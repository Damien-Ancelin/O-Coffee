export const loadUserToLocals = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }

  if(req.session.filterFlavor){
    res.locals.filterFlavor = req.session.filterFlavor;
  }else {
    res.locals.filterFlavor = null;
  }

  next();
};