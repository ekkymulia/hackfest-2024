import { Router } from "express";
import { 
  listData,
  checkUser,
  createData,
  // updateData
} from "../controller/user/userController";
import { UserSchema } from "../controller/user/user.validation";
// import { usersSchema } from "@controllers/users/users.validation";
// import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/", listData);
router.post("/", checkUser);
router.post("/addnew", UserSchema, createData);
// router.post("/", usersSchema, createData);
// router.put("/:id", usersSchema, updateData);

export default router;