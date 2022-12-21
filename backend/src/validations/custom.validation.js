const Values = require("../utils/values");

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const genres = (value, helpers) => {
  if (value.indexOf(",") > -1) {
    let valueArray = value.split(",");
    let filteredArray = valueArray.filter((item) =>
      Values.genres.includes(item)
    );
    if (!filteredArray.length > 0) {
      return helpers.message(
        '"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]'
      );
    }
    return filteredArray;
  } else {
    if (!Values.genres.includes(value)) {
      return helpers.message(
        '"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]'
      );
    }
    return [value];
  }
};

const contentRating = (value, helpers) => {
  if (!Values.contentRating.includes(value)) {
    return helpers.message(
      '"{{#label}}" must be one of [Anyone, 7+, 12+, 16+, 18+]'
    );
  }
  return value;
};

module.exports = { objectId, genres, contentRating };
