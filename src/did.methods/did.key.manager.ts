import { driver } from '@digitalbazaar/did-method-key';
import { IDidManager, DIDResponse } from '../interface/i.did.manager';

// import {Wallet} from '@docknetwork/wallet-sdk-core/lib/modules/wallet';
import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
import {CryptoLD} from 'crypto-ld';

const {Wallet} = require('@docknetwork/wallet-sdk-core/lib/modules/wallet')
export class DidKeyManager  implements IDidManager{
  private static instance: IDidManager;

  private readonly wallet;

  private constructor() {
    this.wallet = Wallet.getInstance();
  }
  async createDID(options = {}): Promise<DIDResponse> {
    const cryptoLd = new CryptoLD();
    cryptoLd.use(Ed25519VerificationKey2020);

    const keyPair = await cryptoLd.generate({type: 'Ed25519VerificationKey2020'});
    const keyPairResponse = await this.saveDID({
      type: 'KEY',
      ...keyPair
    })
    const {didDocument} = await driver().publicKeyToDidDoc({publicKeyDescription: keyPair});
    if (!Array.isArray(didDocument.correlation)){
      didDocument.correlation = []
    }
    didDocument.correlation.push(keyPairResponse.id)
    return this.saveDID(didDocument)
  }


  public static getInstance(): IDidManager {
    if (!DidKeyManager.instance) {
      DidKeyManager.instance = new DidKeyManager();
    }
    return DidKeyManager.instance;
  }


  saveDID(walletDocument: any): Promise<DIDResponse> {
    return  this.wallet.add(walletDocument)
  }

  getWallet(): any {
    return this.wallet
  }

  async getDIDs(): Promise<Array<DIDResponse>> {
    return  this.wallet.query({
      type: 'DID',
    });
  }
}
