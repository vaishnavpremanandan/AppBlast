const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// Adds a escapeHTML method to joi and checks if the 
// a input contains HTML elements

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.projectSchema = Joi.object({
    title: Joi.string().escapeHTML().required(),
    description: Joi.string().escapeHTML().required(),
    link: Joi.string().escapeHTML().required(),
    date: Joi.number().required(),
    image: Joi.object(
        {
            url: Joi.string().escapeHTML().required(),
            filename: Joi.string().escapeHTML().required()
        }
    ).required(),
    author: Joi.string().escapeHTML().required()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().escapeHTML().required(),
    author: Joi.string().escapeHTML().required()
});

module.exports.userSchema = Joi.object({
    email: Joi.string().escapeHTML().required(),
    username: Joi.string().escapeHTML().required(),
    password: Joi.string().escapeHTML().required(),
});

