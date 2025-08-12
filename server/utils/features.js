import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64 } from "../lib/helpe.js";

const cookieOptions = {
  maxAge: 1000 * 3600 * 24 * 15,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chat_Fusion" })
    .then((data) => {
      console.log(`connected to database ${data.connection.host} ${data.connection.name}`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  //console.log('user', user);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(code)
    .cookie("chat-token", token, cookieOptions)
    .json({ success: true, message });
};

const emitEvent = (req, event, users, data) => {
  console.log("emitting event", event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((res, rej) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (err, result) => {
          if (err) return rej(err);
          res(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((res) => {
      return {
        public_id: res.public_id,
        url: res.secure_url,
      };
    });
    return formattedResults;
  } catch (error) {
    throw new Error("Error while uploading to cloudinary", error)
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
};
