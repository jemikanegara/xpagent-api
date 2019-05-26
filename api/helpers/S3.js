const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");

AWS.config.update({
  accessKeyId: process.env.AWS_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

AWS.config.setPromisesDependency(Promise);

const S3 = new AWS.S3();

async function uploadImage(image) {
  try {
    const buffer = fs.readFileSync(image);
    const type = fileType(buffer);
    const params = {
      ACL: "public-read",
      Body: buffer,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: type.mime,
      Key: `${Date.now().toString()}.${type.ext}`
    };

    // Upload Image
    const data = await S3.upload(params).promise();

    return data;
  } catch (err) {
    return err;
  }
}

async function getImage(image) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image
    };

    // Download Image
    const data = await S3.getObject(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

async function deleteImage(image) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image
    };

    // Delete Image
    const data = await S3.deleteObject(params).promise();

    return data;
  } catch (err) {
    return err;
  }
}

module.exports = {
  uploadImage,
  getImage,
  deleteImage
};
