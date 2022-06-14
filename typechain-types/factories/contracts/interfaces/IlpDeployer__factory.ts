/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IlpDeployer,
  IlpDeployerInterface,
} from "../../../contracts/interfaces/IlpDeployer";

const _abi = [
  {
    inputs: [],
    name: "lpParameters",
    outputs: [
      {
        internalType: "address",
        name: "factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rewardProportion",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IlpDeployer__factory {
  static readonly abi = _abi;
  static createInterface(): IlpDeployerInterface {
    return new utils.Interface(_abi) as IlpDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IlpDeployer {
    return new Contract(address, _abi, signerOrProvider) as IlpDeployer;
  }
}