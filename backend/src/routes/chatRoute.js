import { Router } from "express";
import {makeGroup,getUserGroups, joinGroup} from "../controllers/index.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",makeGroup);
router.post("/join",verifyJWT,joinGroup);
router.get("/getAllGroups",verifyJWT,getUserGroups)
export default router;
