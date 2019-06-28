const Agent = require("../../../models/agent");
const Package = require("../../../models/package");
const { uploadImage, uploadMultiImages, deleteMultiImages, deleteImage } = require("../../helpers/S3");

// MUTATION : Create Package
exports.createPackage = async (root, { tourPackage }, { decoded }) => {

  // Check if user have verified token
  if (!decoded) throw Error("No access");

  // Check agent with client's user id
  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  // Throw error if no agent match with client's user id
  if (!findAgent) throw Error("No Access");

  // Deconstructure package value
  const { packageName, packagePrice, packageDescription, packageImages, packageDuration, packageCustomer } = tourPackage

  // Get Images Value
  const images = await Promise.all(packageImages).then(img => img)

  // Upload Image
  const packageUploadedImage = await uploadMultiImages(images)

  // Create package instance
  const newPackage = new Package({
    packageName,
    packagePrice,
    packageDescription,
    packageImages: packageUploadedImage,
    packageDuration, packageCustomer,
    packageAgent: findAgent._id
  });

  // Save to database
  return await newPackage.save();
};

// MUTATION : Update Package
exports.updatePackage = async (root, { tourPackage }, { decoded }) => {
  console.log("run")
  // CHECK: Agent
  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  // ERROR : Token & Package & Agent
  if (!decoded || !tourPackage._id || !findAgent) {
    throw Error("No access");
  }

  console.log(tourPackage.packageName)

  // Deconstructure package value
  const { _id, packageImages, packageImage = null } = tourPackage

  if (!_id || !packageImages) {
    throw Error("Data Error");
  }

  // Check if package agent match with client's agent id
  const isAuthorized = await Package.findById(_id).then(tourPackage => tourPackage.packageAgent.toString() === findAgent._id.toString())

  // Throw error if id not match with package agent
  if (!isAuthorized) throw Error('No access')

  // New package properties
  const newPackageElements = {}

  for (let packageElement in tourPackage) {

    // If packageImage then upload to S3 and return the key
    if (packageElement === 'packageImage') {
      newPackageElements[packageElement] = await uploadMultiImages(await packageImages).Key
      if (newPackageElements[packageElement]) {
        const packageImages = await Package.findById(_id).then(package => package.packageImages)
        deleteImage(packageImages)
      }
    }

    // If not packageImage then assign to element value
    if (packageElement !== 'packageImage' || packageElement !== '_id') newPackageElements[packageElement] = tourPackage[packageElement]
  }

  return await Package.findByIdAndUpdate(_id, { ...newPackageElements }, { new: true });
};

// MUTATION : Delete Package
exports.deletePackage = async (root, { tourPackage }, { decoded }) => {

  // CHECK : Agent
  const findAgent = await Agent.findOne({ agentUser: decoded._id }).exec();

  // ERROR : Token & ID & Agent
  if (!decoded || !tourPackage._id || !findAgent) throw Error("No access");

  // Deconstructure
  const { _id } = tourPackage

  // Check if package agent match with client's agent id
  const isAuthorized = await Package.findById(_id).then(tourPackage => tourPackage.packageAgent.toString() === findAgent._id.toString())

  // Throw error if id not match with package agent
  if (!isAuthorized) throw Error('No access')

  // Get Old Package image
  const packageImages = await Package.findById(_id).then(package => package.packageImages)

  // Delete Old Package Image
  const deletedImage = await deleteMultiImages(packageImages)

  // If Delete image file success then delete the package in database
  if (deletedImage) return await Package.findByIdAndDelete(tourPackage._id);

  // Throw error if delete failed
  else throw Error('database delete failed')
};
