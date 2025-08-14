export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "Not authenticated", notAuthenticated: true });
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Forbidden", notAuthenticated: true });
  };
}
