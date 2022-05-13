export interface DIDResponse {
  id: string
  content: any
}
export interface IDidManager {
  createDID: (options?: any)=> Promise<DIDResponse>
  getDIDs: ()=> Promise<Array<DIDResponse>>
  saveDID: (walletDocument: any)=> Promise<DIDResponse>
  getWallet: ()=> any
}
