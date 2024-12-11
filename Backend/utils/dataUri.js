// const DataUriParser = require("datauri/parser");
import DataUriParser from "datauri/parser.js";
import Path from "path";
// const Path = require("path");

const parser = new DataUriParser();

const getDataUri = (file)=>{
    const extName = Path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer).content;
};

export default getDataUri; // Make sure this line is present

// module.exports = { getDataUri };

