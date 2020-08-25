
const jwtDecode = require("jwt-decode");

module.exports = {
  hasReadPermission,
  hasUpdatePermission,
  hasDeletePermission,
  hasCreatePermission,
  isSuperAdmin,
};

async function createToken(req) {
  return req.headers.authorization
    .replace("bearer ", "")
    .replace("Bearer ", "");
}

async function hasReadPermission(request, response, next) {
  const token = await createToken(request);
  const result = await jwtDecode(token)
  if (result && result.permissions.includes("read:systemData"))
    return next(); // so continue on the next middleware
  else {
    return response.status(403).json({ message: "Forbidden" }); // user is forbidden
  }
}

async function hasUpdatePermission(request, response, next) {
  const token = await createToken(request);
  const result = await jwtDecode(token)
  if (result && result.permissions.includes("update:systemData"))
    return next(); // so continue on the next middleware
  else {
    return response.status(403).json({ message: "Forbidden" }); // user is forbidden
  }
}

async function hasDeletePermission(request, response, next) {
  const token = await createToken(request);
  const result = await jwtDecode(token)
  if (result && result.permissions.includes("delete:systemData"))
    return next(); // so continue on the next middleware
  else {
    return response.status(403).json({ message: "Forbidden" }); // user is forbidden
  }
}

async function hasCreatePermission(request, response, next) {
  const token = await createToken(request);
  const result = await jwtDecode(token)
  if (result && result.permissions.includes("create:systemData"))
    return next(); // so continue on the next middleware
  else {
    return response.status(403).json({ message: "Forbidden" }); // user is forbidden
  }
}

async function isSuperAdmin(request, response, next) {
  const token = await createToken(request);
  const result = await jwtDecode(token)
  if (result && result.permissions.includes("superAdmin"))
    return next(); // so continue on the next middleware
  else {
    return response.status(403).json({ message: "Forbidden" }); // user is forbidden
  }
}