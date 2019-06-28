// Model
const Agent = require("../../../models/agent");
const User = require("../../../models/user")
const { uploadImage, deleteImage } = require("../../helpers/S3");

exports.agentEmailCheck = async (root, { email }) => {
  const user = await User.findOne({ userEmail: email }).exec()
  if (!user) return false
  if (user) return true
  else return false
}

exports.agentTokenCheck = async (root, args, { decoded }) => {
  let tokenCheck = {
    valid: false,
    isAgent: false
  }
  if (!decoded) return tokenCheck
  const user = await User.findById(decoded._id)
  if (!user) return tokenCheck
  const agent = await Agent.findOne({ agentUser: user._id })
  if (agent) return { valid: true, isAgent: true }
  if (user && !agent) return { valid: true, isAgent: false }
  else return tokenCheck
}

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
  if (!agentUploadedPhoto.Key) {
    throw Error("Upload Failed");
  }

  const newAgent = new Agent({
    agentName,
    agentPhoto: agentUploadedPhoto.Key,
    agentDescription,
    agentUser: decoded._id
  });

  return await newAgent.save();
};

exports.updateAgent = async (
  root,
  { agentName, agentPhoto, agentDescription },
  { decoded }
) => {
  if (!decoded) {
    throw Error("No Access");
  }

  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();
  if (!findAgent) {
    throw Error("No Access");
  }

  const agentPhotoValue = await agentPhoto;

  if (agentName) {
    Agent.findByIdAndUpdate(findAgent._id, { agentName });
  }

  if (agentDescription) {
    Agent.findByIdAndUpdate(findAgent._id, { agentDescription });
  }

  if (agentPhotoValue) {
    const oldPhoto = Agent.findById(decoded._id).then(
      agent => agent.agentPhoto
    );
    deleteImage(oldPhoto);
    const agentUploadedPhoto = await uploadImage(agentPhotoValue);
    if (!agentUploadedPhoto.Key) {
      throw Error("Upload Failed");
    }

    Agent.findByIdAndUpdate(findAgent._id, {
      agentPhoto: agentUploadedPhoto.Key
    });
  }
};
