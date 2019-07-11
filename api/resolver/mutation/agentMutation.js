// Model
const Agent = require("../../../models/agent");
const User = require("../../../models/user")
const { uploadImage, deleteImage } = require("../../helpers/S3");
const sharp = require('sharp')

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

exports.updateAgent = async (root, { agent }, { decoded }) => {

  const { agentName, agentPhoto, agentDescription } = agent

  if (!decoded) {
    throw Error("No Access");
  }

  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();
  if (!findAgent) {
    throw Error("No Access");
  }

  // Resolve photo
  const agentPhotoValue = await agentPhoto[0];

  // Empty Object for update query
  const newAgent = {}

  if (agentName) newAgent.agentName = agentName
  if (agentDescription) newAgent.agentDescription = agentDescription
  if (agentPhotoValue) {
    const readed = await agentPhotoValue.createReadStream()
    // const fullRead = readed.read()
    let chunks = []
    readed.on("data", function (chunk) {
      chunks.push(chunk)
    })
    let resized = { data: "", mimetype: agentPhotoValue.mimetype, filename: agentPhotoValue.filename }
    readed.on("end", function () {
      sharp(Buffer.concat(chunks)).resize(200, 200, { fit: 'inside' }).toBuffer({ resolveWithObject: true }).then(({ data }) => { resized.data = data })
    })
    console.log(agentPhotoValue)
    // Delete Image on AWS
    const deleteOldPhoto = await deleteImage(findAgent.agentPhoto);
    // Upload New Image on AWS
    console.log(resized)
    const agentUploadedPhoto = deleteOldPhoto && await uploadImage(resized ? resized : agentPhotoValue);

    console.log(agentUploadedPhoto)
    if (!agentUploadedPhoto.Key) {
      throw Error("Upload Failed");
    } else {
      newAgent.agentPhoto = agentUploadedPhoto.Key
    }
  }

  console.log('new agent')
  console.log(newAgent)

  if (Object.keys(newAgent).length > 0) return await Agent.findByIdAndUpdate(findAgent._id, newAgent, { new: true })
  else throw Error('Empty Field')
};
