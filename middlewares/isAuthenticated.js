module.exports = function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } 
  return res.redirect('/');
}