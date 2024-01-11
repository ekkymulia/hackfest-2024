import Joi from "joi";
import validate from "../../middlewares/validationMiddleware";

export const ClientProjectSchema = validate(Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  owner_id: Joi.string().required(),
}));

// export const ProjectByIdSchema = validate(Joi.object({
//   projectId: Joi.string().required()
// }));

export const UpdateProjectSchema = validate(Joi.object({
  projectId: Joi.string().required(),
  status: Joi.number().required(),
  asignee_needed: Joi.string(),
  wanted_deadline: Joi.string(),
  target_deadline: Joi.string(),
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
}))

export const DeletedProjectSchema = validate(Joi.object({
  userId: Joi.string().required(),
}))