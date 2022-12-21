const httpStatus = require("http-status");

const Values = require("../utils/values");
const Video = require("../models/video.model");
const ApiError = require("../utils/ApiError");

const getVideos = async (title, contentRating, genres, sortBy) => {
  const titleMatch = { title: { $regex: new RegExp(title, "i") } };

  const contentRatings = getPossibleContentRating(contentRating);
  const contentRatingMatch = { contentRating: { $in: contentRatings } };

  let genreMatch = { genre: { $in: genres } };
  if (genres.includes("All")) genreMatch = null;

  const videos = await Video.find({
    ...titleMatch,
    ...contentRatingMatch,
    ...genreMatch,
  });
  if (!videos) throw new ApiError(httpStatus.NOT_FOUND, "No Videos Found");

  const sortedVideos = sortVideos(videos, sortBy);

  return sortedVideos;
};

const getPossibleContentRating = (contentRating) => {
  let contentRatings = [...Values.contentRating];

  if (contentRating === "Anyone" || contentRating === "") return contentRatings;

  const contentRatingIndex = contentRatings.indexOf(contentRating);
  const possibleContentRating = contentRatings.splice(
    0,
    contentRatingIndex + 1
  );

  return possibleContentRating;
};

const sortVideos = (videos, sortBy) => {
  videos.sort((video1, video2) => {
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];

    if (sortBy === "releaseDate") {
      field1 = new Date(field1).getTime();
      field2 = new Date(field2).getTime();
    }

    if (field1 > field2) return -1;

    return 1;
  });

  return videos;
};

const getVideoByID = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video)
    throw new ApiError(httpStatus.NOT_FOUND, "No Video Found for the given ID");

  return video;
};

const createVideo = async (body) => {
  const video = await Video.create({ ...body });
  if (!video)
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create Video");

  return video;
};

const changeVote = async (id, vote, change) => {
  const video = await Video.findById(id);
  if (!video) throw new ApiError(httpStatus.BAD_REQUEST, "Video Not Found");

  let changeVoteType = "";
  if (vote === "upVote") {
    changeVoteType = "upVotes";
  } else {
    changeVoteType = "downVotes";
  }

  if (change === "increase") {
    video.votes[changeVoteType] += 1;
  } else {
    video.votes[changeVoteType] = Math.max(video.votes[changeVoteType] - 1, 0);
  }

  await video.save();
  return;
};

const changeViews = async (id) => {
  const video = await Video.findById(id);
  if (!video) throw new ApiError(httpStatus.BAD_REQUEST, "Video Not Found");

  video.views += 1;
  await video.save();
  return;
};

module.exports = {
  getVideos,
  getVideoByID,
  createVideo,
  changeVote,
  changeViews,
};
