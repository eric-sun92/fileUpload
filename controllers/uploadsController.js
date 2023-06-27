const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
  //checks: if file exists, file type, size

  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image with request");
  }

  const maxUploadSize = 1024 * 1024;
  if (productImage.size > maxUploadSize) {
    throw new CustomError.BadRequestError(
      "Image size too large, please upload smaller image"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
