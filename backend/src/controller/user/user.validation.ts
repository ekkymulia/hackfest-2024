import validate from "../../middlewares/validationMiddleware";
import Joi from "joi";

export const UserSchema = validate(Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    is_verified: Joi.boolean(),
    is_active: Joi.boolean(),
    subscription_status: Joi.number().valid(1, 2, 3).optional(),
    phone: Joi.string().optional(),
    role: Joi.number().valid(1, 2, 3).optional(),
}));