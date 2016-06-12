"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _convict = require("convict");

var _convict2 = _interopRequireDefault(_convict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define a schema
var config = (0, _convict2.default)({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3030,
    env: "PORT"
  },
  facebook: {
    shortToken: {
      doc: "Facebook Short token",
      format: String,
      default: "",
      env: "FB_SHORT_TOKEN"
    },
    longToken: {
      doc: "Facebook Long token",
      format: String,
      default: "",
      env: "FB_LONG_TOKEN"
    },
    appId: {
      doc: "Facebook Application ID",
      format: String,
      default: "",
      env: "FB_APPLICATION_ID"
    },
    appSecret: {
      doc: "Facebook Application Secret",
      format: String,
      default: "",
      env: "FB_APPLICATION_SECRET"
    },
    pageId: {
      doc: "Facebook Page ID",
      format: String,
      default: "",
      env: "FB_PAGE_ID"
    },
    apiUrl: {
      doc: "Facebook API URL",
      format: String,
      default: "",
      env: "FB_API_URL"
    }
  },
  alchemy: {
    apiUrl: {
      doc: "Alchemy API URL",
      format: String,
      default: "",
      env: "ALCHEMY_API_URL"
    },
    token: {
      doc: "Alchemy token",
      format: String,
      default: "",
      env: "ALCHEMY_TOKEN"
    }
  },
  secureToken: {
    doc: "Our token",
    format: String,
    default: "",
    env: "MINT_TOKEN"
  }
});

// Perform validation
config.validate({ strict: true });

exports.default = config;