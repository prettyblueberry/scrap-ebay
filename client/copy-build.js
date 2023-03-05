const fs = require("fs-extra");

const src = './build';
const dest = '../server/dist';
fs.removeSync(dest);
fs.copySync(src, dest, { overwrite: true })
console.log("Success copy '" + src + "' to '" + dest + "'");