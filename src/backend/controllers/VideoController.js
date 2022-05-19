import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function () {
  try {
    return new Response(200, {}, { videos: this.db.videos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */

// TODO: postVideoHandler

export const addNewVideoHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const { uploadvideo } = JSON.parse(request.requestBody);
    const newVideo = { _id: uuid(), ...uploadvideo };
    user.uploadedvideo.push(newVideo)

    // const videos = this.db.videos
    // videos.push(...user.uploadedvideo);
  
    return new Response(201, {}, { uploadedvideo: user.uploadedvideo });
  }
  return new Response(
    404,
    {},
    {
      errors: ["The email you entered is not Registered. Not Found error"],
    }
  );
};


//video page
export const getPagedVideosHandler = function (schema, request) {
  const pageNum = Number(request.params.pageNum);
  const videos = this.db.videos.slice(pageNum * 4, pageNum * 4 + 4);

  try {
      return new Response(200, {}, { videos });
  } catch (error) {
      return new Response(
          500,
          {},
          {
              error,
          }
      );
  }
};

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/user/videos/:videoId
 * */

export const getVideoHandler = function (schema, request) {
  const { videoId } = request.params;
  try {
    const video = schema.videos.findBy({ _id: videoId }).attrs;
    return new Response(200, {}, { video });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

