import jwt from "jsonwebtoken";

export const generateGoogleToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, type: "user", isPremium: user.isPremium },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    payload: {
      id: user._id,
      name: user.name,
      isPremium: user.isPremium,
    },
  };
};