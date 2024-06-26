<<<<<<< HEAD
import {Router} from 'express'
import {registerUser, checkUsername, loginUser , logoutUser, verifyEmail, forgetPasswordHandler, forgetPasswordVerify} from '../controllers/index.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
=======
import { Router } from "express";
import {
  registerUser,
  checkUsername,
  loginUser,
  logoutUser,
  verifyEmail,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar
} from "../controllers/index.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
>>>>>>> b7b8d364344cb2455b6140b67103a84dfedf1160

const router = Router();

<<<<<<< HEAD

router.get('/',(req,res)=>{
    res.send("HII")
})
router.get('/checkUsername/:username',checkUsername) // to check whether username is available or not
router.post('/register',upload.single('avatarImage'),registerUser) // to register user
router.post('/login',loginUser)
router.post('/verifyEmail/:id',verifyEmail)
router.post('/logout',verifyJWT,logoutUser)
router.get('/forget/:id',forgetPasswordHandler)
router.get('/forget/:id/verify',forgetPasswordVerify)

export default router
=======
router.get("/", (req, res) => {
  res.send("HII");
});
router.get("/checkUsername/:username", checkUsername); // to check whether username is available or not
router.post("/register", upload.single("avatarImage"), registerUser); // to register user
router.post("/login", loginUser);
router.post("/verifyEmail/:id", verifyEmail);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar") , updateUserAvatar)
export default router;
>>>>>>> b7b8d364344cb2455b6140b67103a84dfedf1160
