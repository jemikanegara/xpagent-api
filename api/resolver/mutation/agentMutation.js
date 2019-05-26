// Model
const User = require("../../../models/user");
const Agent = require("../../../models/agent");
const { uploadImage, deleteImage } = require("../../helpers/S3");

exports.createAgent = async (
  root,
  { agentName, agentPhoto, agentDescription },
  { decoded, image }
) => {
  if (!decoded) {
    throw Error("No access");
  }

  const alreadyCreated = await Agent.findOne({ agentUser: decoded._id });

  if (alreadyCreated) {
    throw Error("Profile already created");
  }

  const agentPhoto = await uploadImage(image);
  if (!agentPhoto) {
    throw Error("Upload Failed");
  }
  const newAgent = new Agent({
    agentName,
    agentPhoto,
    agentDescription,
    agentUser
  });

  return await newAgent.save();
};
