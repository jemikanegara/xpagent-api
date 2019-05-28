// Model
const Agent = require("../../../models/agent");
const { uploadImage, deleteImage } = require("../../helpers/S3");

exports.createAgent = async (root, { agent }, { decoded }) => {
  if (!decoded) {
    throw Error("No access");
  }
  const { agentName, agentPhoto, agentDescription } = agent;
  const agentPhotoValue = await agentPhoto;
  const alreadyCreated = await Agent.findOne({ agentUser: decoded._id });

  if (alreadyCreated) {
    throw Error("Profile already created");
  }
  const agentUploadedPhoto = await uploadImage(agentPhotoValue);
  console.log(agentUploadedPhoto);
  if (!agentUploadedPhoto.Key) {
    throw Error("Upload Failed");
  }

  const newAgent = new Agent({
    agentName,
    agentPhoto: agentUploadedPhoto.Key,
    agentDescription,
    agentUser: decoded._id
  });

  console.log("pass schema");
  return await newAgent.save();
};
