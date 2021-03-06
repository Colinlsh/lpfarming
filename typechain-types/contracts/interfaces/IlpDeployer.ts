/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface IlpDeployerInterface extends utils.Interface {
  functions: {
    "lpParameters()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "lpParameters"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "lpParameters",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "lpParameters",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IlpDeployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IlpDeployerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    lpParameters(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber] & {
        factory: string;
        owner: string;
        token: string;
        rewardProportion: BigNumber;
      }
    >;
  };

  lpParameters(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber] & {
      factory: string;
      owner: string;
      token: string;
      rewardProportion: BigNumber;
    }
  >;

  callStatic: {
    lpParameters(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber] & {
        factory: string;
        owner: string;
        token: string;
        rewardProportion: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    lpParameters(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    lpParameters(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
