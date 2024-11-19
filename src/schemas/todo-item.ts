import Joi from "joi";

const todoItemSchema = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().required(),
    completed: Joi.boolean().required(),
});

export default todoItemSchema;