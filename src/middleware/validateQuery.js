import Joi from 'joi';

export const validateProfileUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {  
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateProfileCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};