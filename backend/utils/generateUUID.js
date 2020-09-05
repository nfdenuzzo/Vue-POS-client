
const generate = require('nanoid/generate')

module.exports = {
  generateUUID,
};

function generateUUID() {
  return (
    new Date().getFullYear().toString().substring(2) +
    generate("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4)
  );
}
