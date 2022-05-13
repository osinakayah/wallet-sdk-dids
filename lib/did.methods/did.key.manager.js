"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidKeyManager = void 0;
const did_method_key_1 = require("@digitalbazaar/did-method-key");
// import {Wallet} from '@docknetwork/wallet-sdk-core/lib/modules/wallet';
const ed25519_verification_key_2020_1 = require("@digitalbazaar/ed25519-verification-key-2020");
const crypto_ld_1 = require("crypto-ld");
// const {Wallet} = require('@docknetwork/wallet-sdk-core/lib/modules/wallet')
class DidKeyManager {
    // private readonly wallet;
    constructor() {
        // this.wallet = Wallet.getInstance();
    }
    createDID(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const cryptoLd = new crypto_ld_1.CryptoLD();
            cryptoLd.use(ed25519_verification_key_2020_1.Ed25519VerificationKey2020);
            const keyPair = yield cryptoLd.generate({ type: 'Ed25519VerificationKey2020' });
            const keyPairResponse = yield this.saveDID(Object.assign({ type: 'KEY' }, keyPair));
            const { didDocument } = yield (0, did_method_key_1.driver)().publicKeyToDidDoc({ publicKeyDescription: keyPair });
            if (!Array.isArray(didDocument.correlation)) {
                didDocument.correlation = [];
            }
            didDocument.correlation.push(keyPairResponse.id);
            return this.saveDID(didDocument);
        });
    }
    static getInstance() {
        if (!DidKeyManager.instance) {
            DidKeyManager.instance = new DidKeyManager();
        }
        return DidKeyManager.instance;
    }
    // @ts-ignore
    saveDID(walletDocument) {
        // return  this.wallet.add(walletDocument
    }
    getWallet() {
        // return this.wallet
    }
    // @ts-ignore
    getDIDs() {
        return __awaiter(this, void 0, void 0, function* () {
            // return  this.wallet.query({
            //   type: 'DID',
            // });
        });
    }
}
exports.DidKeyManager = DidKeyManager;
