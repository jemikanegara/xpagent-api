const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

AWS.config.setPromisesDependency(Promise);

const S3 = new AWS.S3();

const uploadImage = async (image) => {
  try {
    const params = {
      ACL: "public-read",
      Body: image.createReadStream(),
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: image.mimetype,
      Key: `${Date.now().toString()}.${image.filename}`
    };

    // Upload Image
    const data = await S3.upload(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

const uploadMultiImages = async (images) => {
  const packageUploadedPromise = await images.map(async singleImg => {
    const packageUploadedImage = await uploadImage(singleImg)
    if (!packageUploadedImage.Key) throw Error("Upload Failed");
    return packageUploadedImage.Key
  })
  const packageUploadedImage = await Promise.all(packageUploadedPromise)
  console.log("jalan")
  return packageUploadedImage
}

const getImage = async (image) => {
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

const deleteImage = async (image) => {
  console.log(image)
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image
    };

    // Delete Image
    const data = await S3.deleteObject(params).promise()

    return data;
  } catch (err) {
    return err;
  }
}

const deleteMultiImages = async (images) => {
  const imagesParams = images.map(image => ({ Key: image }))
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Delete: {
      Objects: imagesParams,
      Quiet: false
    }
  };
  return await S3.deleteObjects(params).promise();
}

module.exports = {
  uploadImage,
  uploadMultiImages,
  getImage,
  deleteImage,
  deleteMultiImages
};
