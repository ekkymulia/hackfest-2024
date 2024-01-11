import { Router } from "express";
import { 
  listData,
  // detailData,
  // createData,
  // updateData
} from "../controller/user/userController";
// import { usersSchema } from "@controllers/users/users.validation";
// import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/", listData);
// router.get("/:id", detailData);
// router.post("/", usersSchema, createData);
// router.put("/:id", usersSchema, updateData);

export default router;