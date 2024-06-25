import { registerUser } from "./register.controller.js";
import { checkUsername } from "./checkUsername.controller.js";
import { loginUser } from "./login.controller.js";
import { logoutUser } from "./logout.controller.js";
import { verifyEmail } from "./verifyEmail.controller.js";
import { refreshAccessToken } from "./refreshAccessToken.js";
import { changeCurrentPassword } from "./changeCurrentPassword.js";
import { updateAccountDetails } from "./updateAccountDetails.js";
import { updateUserAvatar } from "./updateAvatar.js";

export {
   registerUser,
   checkUsername,
   loginUser,
   logoutUser,
   verifyEmail,
   refreshAccessToken,
   changeCurrentPassword,
   updateAccountDetails,
   updateUserAvatar
}