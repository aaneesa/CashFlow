import { generateGoogleToken } from "../services/googleAuthServices.js";

import dotenv from "dotenv";
dotenv.config();

export const googleCallback = (req, res) => {
  try {
    const { token, payload } = generateGoogleToken(req.user);

    const redirectUrl = `${process.env.CLIENT_URL}/user/google/callback?token=${token}&isPremium=${payload.isPremium}&name=${encodeURIComponent(payload.name)}`;

    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google Auth failed" });
  }
};