exports.user = (root, { id }) => (User.findById(id))