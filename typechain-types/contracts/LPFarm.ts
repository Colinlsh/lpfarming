/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface LPFarmInterface extends utils.Interface {
  functions: {
    "checkpoint()": FunctionFragment;
    "claimRewards()": FunctionFragment;
    "claimedRewards(address)": FunctionFragment;
    "deposits(address)": FunctionFragment;
    "factory()": FunctionFragment;
    "isParticipant(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "participate()": FunctionFragment;
    "rewardProportion()": FunctionFragment;
    "startBlockNumber(address)": FunctionFragment;
    "token()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkpoint"
      | "claimRewards"
      | "claimedRewards"
      | "deposits"
      | "factory"
      | "isParticipant"
      | "owner"
      | "participate"
      | "rewardProportion"
      | "startBlockNumber"
      | "token"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkpoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewards",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimedRewards",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "deposits", values: [string]): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isParticipant",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "participate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardProportion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startBlockNumber",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "checkpoint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimedRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isParticipant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "participate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardProportion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "ClaimRewards(address,uint256)": EventFragment;
    "Participated(address)": EventFragment;
    "Withdraw(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimRewards"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Participated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface ClaimRewardsEventObject {
  to: string;
  amount: BigNumber;
}
export type ClaimRewardsEvent = TypedEvent<
  [string, BigNumber],
  ClaimRewardsEventObject
>;

export type ClaimRewardsEventFilter = TypedEventFilter<ClaimRewardsEvent>;

export interface ParticipatedEventObject {
  arg0: string;
}
export type ParticipatedEvent = TypedEvent<[string], ParticipatedEventObject>;

export type ParticipatedEventFilter = TypedEventFilter<ParticipatedEvent>;

export interface WithdrawEventObject {
  to: string;
  amount: BigNumber;
  tokenReward: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface LPFarm extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LPFarmInterface;

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
    checkpoint(overrides?: CallOverrides): Promise<[BigNumber]>;

    claimRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimedRewards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    deposits(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    isParticipant(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    participate(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardProportion(overrides?: CallOverrides): Promise<[BigNumber]>;

    startBlockNumber(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  checkpoint(overrides?: CallOverrides): Promise<BigNumber>;

  claimRewards(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimedRewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  deposits(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  factory(overrides?: CallOverrides): Promise<string>;

  isParticipant(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  participate(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardProportion(overrides?: CallOverrides): Promise<BigNumber>;

  startBlockNumber(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkpoint(overrides?: CallOverrides): Promise<BigNumber>;

    claimRewards(overrides?: CallOverrides): Promise<void>;

    claimedRewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    deposits(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<string>;

    isParticipant(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    participate(overrides?: CallOverrides): Promise<void>;

    rewardProportion(overrides?: CallOverrides): Promise<BigNumber>;

    startBlockNumber(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ClaimRewards(address,uint256)"(
      to?: string | null,
      amount?: null
    ): ClaimRewardsEventFilter;
    ClaimRewards(to?: string | null, amount?: null): ClaimRewardsEventFilter;

    "Participated(address)"(arg0?: string | null): ParticipatedEventFilter;
    Participated(arg0?: string | null): ParticipatedEventFilter;

    "Withdraw(address,uint256,uint256)"(
      to?: string | null,
      amount?: null,
      tokenReward?: null
    ): WithdrawEventFilter;
    Withdraw(
      to?: string | null,
      amount?: null,
      tokenReward?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    checkpoint(overrides?: CallOverrides): Promise<BigNumber>;

    claimRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimedRewards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    deposits(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    isParticipant(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    participate(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardProportion(overrides?: CallOverrides): Promise<BigNumber>;

    startBlockNumber(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkpoint(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimRewards(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimedRewards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isParticipant(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    participate(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardProportion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startBlockNumber(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
