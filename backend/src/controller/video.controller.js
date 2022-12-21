const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const videoService = require("../services/video.services");

const getVideos = catchAsync(async (req, res) => {
  const title = req.query.title ? req.query.title : "";
  const contentRating = req.query.contentRating ? req.query.contentRating : "";
  const genres = req.query.genres ? req.query.genres : ["All"];
  const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

  const videos = await videoService.getVideos(
    title,
    contentRating,
    genres,
    sortBy
  );
  res.status(httpStatus.OK).send({ videos: videos });
});

const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const video = await videoService.getVideoByID(videoId);

  res.status(httpStatus.OK).send(video);
});

const postVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
});

const changeVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote, change } = req.body;

  await videoService.changeVote(videoId, vote, change);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  await videoService.changeViews(videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideos,
  getVideoById,
  postVideo,
  changeVotes,
  changeViews,
};
