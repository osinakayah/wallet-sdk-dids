"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.DidKeyManager = void 0;
const did_key_manager_1 = require("./did.methods/did.key.manager");
Object.defineProperty(exports, "DidKeyManager", { enumerable: true, get: function () { return did_key_manager_1.DidKeyManager; } });
const hello = () => {
    console.log('hello');
};
exports.hello = hello;
