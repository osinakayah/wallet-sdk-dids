import { IDidManager, DIDResponse } from '../interface/i.did.manager';
export declare class DidKeyManager implements IDidManager {
    private static instance;
    private constructor();
    createDID(options?: {}): Promise<DIDResponse>;
    static getInstance(): IDidManager;
    saveDID(walletDocument: any): Promise<DIDResponse>;
    getWallet(): any;
    getDIDs(): Promise<Array<DIDResponse>>;
}
