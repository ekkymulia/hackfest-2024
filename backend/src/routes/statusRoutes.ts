import { Router } from "express";
import { 
  listData,
  insertData,
  dataById,
  updateData,
  deleteById,
  getAllProjectStatus
  // detailData,
  // createData,
  // updateData
} from "../controller/project/projectController";
import { ClientProjectSchema, UpdateProjectSchema, DeletedProjectSchema } from "../controller/project/project.validation";
// import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/", listData);
router.get("/:id", dataById);

// router.get("/:id", detailData);
router.post("/", ClientProjectSchema, insertData);
router.put("/:id", UpdateProjectSchema, updateData);

router.delete("/:id", DeletedProjectSchema, deleteById);

router.get("/projectstatus", getAllProjectStatus);


// router.put("/:id", usersSchema, updateData);

export default router;