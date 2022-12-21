const Joi = require("joi");
const customValidator = require("./custom.validation");
const Values = require("../utils/values");

const searchVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.string().custom(customValidator.genres),
    contentRating: Joi.string().custom(customValidator.contentRating),
    sortBy: Joi.string().valid(...Values.sortBy),
  }),
};

const getVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(customValidator.objectId),
  }),
};

const createVideo = {
  body: Joi.object()
    .keys({
      videoLink: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string()
        .required()
        .valid(...Values.genres, "All"),
      contentRating: Joi.string()
        .required()
        .valid(...Values.contentRating),
      releaseDate: Joi.string().required(),
    })
    .unknown(),
};

const changeVotes = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(customValidator.objectId),
  }),
  body: Joi.object().keys({
    vote: Joi.string().required().valid("upVote", "downVote"),
    change: Joi.string().required().valid("increase", "decrease"),
  }),
};

module.exports = { searchVideos, getVideo, createVideo, changeVotes };
