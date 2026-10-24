import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
const validationSchema = Joi.object({
  email: Joi.string().trim().email().max(254).required().messages({ "string.email": "Please provide a valid email address." }),
  password: passwordComplexity({ min: 8, max: 128, lowerCase: 1, upperCase: 1, numeric: 1, symbol: 1 }).required(),
});
export function checkFormat(data) {
  const { error, value } = validationSchema.validate(data);
  return error ? { valid: false, error: error.details[0].message } : { valid: true, value };
}
