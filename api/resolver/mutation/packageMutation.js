const Agent = require("../../../models/agent");
const Package = require("../../../models/package");
const { uploadImage, deleteImage } = require("../../helpers/S3");

// MUTATION : Create Package
exports.createPackage = async (root, { tourPackage }, { decoded }) => {
  // Check if user have verified token
  if (!decoded) throw Error("No access");

  // Check agent with client's user id
  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  // Throw error if no agent match with client's user id
  if (!findAgent) throw Error("No Access");

  // Deconstructure package value
  const { packageName, packagePrice, packageDescription, packageImage, packageDuration, packageCustomer } = tourPackage

  // Get Image Value
  const packageImageValue = await packageImage

  // Upload Image
  const packageUploadedImage = await uploadImage(packageImageValue)

  // Throw error if upload failed
  if (!packageUploadedImage.Key) throw Error("Upload Failed");

  // Create package instance
  const newPackage = new Package({
    packageName,
    packagePrice,
    packageDescription,
    packageImage: packageUploadedImage.Key,
    packageDuration, packageCustomer,
    packageAgent: findAgent._id
  });

  // Save to database
  return await newPackage.save();
};

// MUTATION : Update Package
exports.updatePackage = async (root, { tourPackage }, { decoded }) => {

  // CHECK: Agent
  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  // ERROR : Token & Package & Agent
  if (!decoded || !tourPackage._id || !findAgent) {
    throw Error("No access");
  }

  // Deconstructure package value
  const { _id, packageImage } = tourPackage

  // Check if package agent match with client's agent id
  const isAuthorized = await Package.findById(_id).then(tourPackage => tourPackage.packageAgent.toString() === findAgent._id.toString())

  // Throw error if id not match with package agent
  if (!isAuthorized) throw Error('No access')

  // New package properties
  const newPackageElements = {}

  for (let packageElement in tourPackage) {

    // If packageImage then upload to S3 and return the key
    if (packageElement === 'packageImage') {
      newPackageElements[packageElement] = await uploadImage(await packageImage).Key
      if (newPackageElements[packageElement]) {
        const packageImage = await Package.findById(_id).then(package => package.packageImage)
        deleteImage(packageImage)
      }
    }

    // If not packageImage then assign to element value
    if (packageElement !== 'packageImage' || packageElement !== '_id') newPackageElements[packageElement] = tourPackage[packageElement]
  }

  return await Package.findByIdAndUpdate(_id, { ...newPackageElements }, { new: true });
};

// MUTATION : Delete Package
exports.deletePackage = async (root, { tourPackage }, { decoded }) => {

  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  if (!decoded || !tourPackage._id || !findAgent) {
    throw Error("No access");
  }

  const { _id } = tourPackage

  const packageImage = await Package.findById(_id).then(package => package.packageImage)

  const deletedImage = await deleteImage(packageImage)

  if (deletedImage) return await Package.findByIdAndDelete(tourPackage._id);
  else throw Error('database delete failed')
};
