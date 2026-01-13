export const mentorOnly = (req, res, next) => {
  if (req.user.role === "mentor" || req.user.role === "both") {
    next();
  } else {
    res.status(403).json({ message: "Mentor access only" });
  }
};
