import Joi from "joi";
import validate from "../../middlewares/validationMiddleware";

export const ClientProjectSchema = validate(Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  owner_id: Joi.string().required(),
  wanted_deadline: Joi.string().required(),
  target_deadline: Joi.string().required(),
  status: Joi.number().required(),
}));

// export const ProjectByIdSchema = validate(Joi.object({
//   projectId: Joi.string().required()
// }));

export const UpdateProjectSchema = validate(Joi.object({
  owner_id: Joi.string().required(),
  status: Joi.number().required(),
  asignee_needed: Joi.number(),
  wanted_deadline: Joi.string(),
  target_deadline: Joi.string(),
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
  asignee: Joi.array(),
  asignee_uid: Joi.array().items(Joi.string()),
  submission: Joi.array().items(Joi.string()),
}))


export const DeletedProjectSchema = validate(Joi.object({
  userId: Joi.string().required(),
}))