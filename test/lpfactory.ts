import { expect } from "chai";
import { BigNumber, ContractFactory, utils } from "ethers";
import { ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { LPFactory, RewardToken } from "../typechain-types/index";
import { JsonRpcSigner } from "@ethersproject/providers";

describe("lpfarm", () => {
  let owner: JsonRpcSigner, signer1: JsonRpcSigner, signer2: JsonRpcSigner;
  let ownerAddress: string, signer1Address: string, signer2Address: string;

  let lpFactory: LPFactory;
  let rewardToken: RewardToken;
  let lpAddress: string;

  let lpFarmByteCode: string;
  // eslint-disable-next-line camelcase
  let lpFarmContractFactory: ContractFactory;

  const reward50 = 50;
  const reward30 = 30;
  const reward20 = 20;

  const url = "http://localhost:7545";
  const provider = new ethers.providers.JsonRpcProvider(url);

  before("before", async () => {
    owner = provider.getSigner(0);
    signer1 = provider.getSigner(1);
    signer2 = provider.getSigner(2);

    ownerAddress = await owner.getAddress();
    signer1Address = await signer1.getAddress();
    signer2Address = await signer2.getAddress();

    const _lpFactory = await ethers.getContractFactory("LPFactory");
    lpFactory = (await _lpFactory.deploy()) as LPFactory;
    await lpFactory.deployed();

    const RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = (await RewardToken.deploy()) as RewardToken;
    await rewardToken.deployed();

    lpFarmContractFactory = await ethers.getContractFactory("LPFarm");

    // transfer RewardToken, token2, token3 to signer1 and signer2
    rewardToken.transfer(signer1Address, BigNumber.from(1000000));
    rewardToken.transfer(signer2Address, BigNumber.from(1000000));
  });

  before("load store bytecode", async () => {
    lpFarmByteCode = (await ethers.getContractFactory("LPFarm")).bytecode;
  });

  it("owner is deployer", async () => {
    expect(await lpFactory.admin()).to.eq(ownerAddress);
  });

  it("should create store", async () => {
    const lpCreate = await lpFactory
      .connect(signer1)
      .createLPFarm(rewardToken.address, reward50);

    const lpCreate2 = await lpFactory
      .connect(signer1)
      .createLPFarm(rewardToken.address, reward30);

    const lpCreate3 = await lpFactory
      .connect(signer1)
      .createLPFarm(rewardToken.address, reward20);

    const functionParams = utils.defaultAbiCoder.encode(
      ["address", "address", "address", "uint256"],
      [lpFactory.address, signer1Address, rewardToken.address, reward50]
    );

    lpAddress = ethers.utils.getCreate2Address(
      lpFactory.address,
      utils.keccak256(functionParams),
      utils.keccak256(lpFarmByteCode)
    );

    await expect(lpCreate)
      .to.emit(lpFactory, "LPCreated")
      .withArgs(signer1Address, lpAddress);

    const lp = lpFarmContractFactory.attach(lpAddress);

    expect(await lp.isParticipant(signer1Address)).to.equal(false);
  });

  it("should allow participations", async () => {
    const lp = lpFarmContractFactory.attach(lpAddress);

    const participate = await lp
      .connect(signer1)
      .participate({ value: ethers.utils.parseUnits("0.1", "ether") });

    await expect(participate)
      .to.emit(lp, "Participated")
      .withArgs(signer1Address);

    expect(await lp.isParticipant(signer1Address)).to.equal(true);
  });

  it("should deposit and start earning yield", async () => {
    const lp = lpFarmContractFactory.attach(lpAddress);
    const rewardBefore = await rewardToken.balanceOf(signer1Address);
    // block before
    const blockNumBefore = BigNumber.from(
      await lp.startBlockNumber(signer1Address)
    );

    expect(await lp.isParticipant(signer1Address)).to.equal(true);

    // advance by 1 day
    await network.provider.send("evm_mine");

    const rewards = await lp.connect(signer1).claimRewards();

    const blockNumAfter = BigNumber.from(
      await ethers.provider.getBlockNumber()
    );

    const _blknum = BigNumber.from(await lp.startBlockNumber(signer1Address));

    expect(blockNumAfter).to.equal(_blknum);

    const rawRewardTokenYield = BigNumber.from(
      blockNumAfter.sub(blockNumBefore).mul(50)
    );

    await expect(rewards)
      .to.emit(lp, "ClaimRewards")
      .withArgs(signer1Address, rawRewardTokenYield);

    expect(await rewardToken.balanceOf(signer1Address)).to.equal(
      rewardBefore.add(rawRewardTokenYield)
    );
  });

  it("should withdraw staking", async () => {
    const lp = lpFarmContractFactory.attach(lpAddress);

    const depositAmount = await lp.deposits(signer1Address);
    const rewardBefore = await rewardToken.balanceOf(signer1Address);

    // block before
    const blockNumBefore = BigNumber.from(
      await lp.startBlockNumber(signer1Address)
    );

    const withdraw = await lp.connect(signer1).withdraw();

    const blockNumAfter = BigNumber.from(
      await ethers.provider.getBlockNumber()
    );

    const expectRewardTokenNum = blockNumAfter.sub(blockNumBefore).mul(50);

    expect(await rewardToken.balanceOf(signer1Address)).to.equal(
      rewardBefore.add(expectRewardTokenNum)
    );

    await expect(withdraw)
      .to.emit(lp, "Withdraw")
      .withArgs(signer1Address, depositAmount, expectRewardTokenNum);

    expect(await lp.deposits(signer1Address)).to.equal(0);
  });

  it("should retrieve all LP", async () => {
    const farmsProportions = await lpFactory
      .connect(signer1)
      .getLPFarmsRewardProportion(rewardToken.address);

    const farms: string[] = [];

    for (let index = 0; index < farmsProportions.length; index++) {
      const g = await lpFactory
        .connect(signer1)
        .getLPFarmsAddress(rewardToken.address, farmsProportions[index]);

      farms.push(g);
    }

    console.log(farmsProportions);
    console.log(farms);

    expect(farms.length).to.equal(3);

    const lp1 = await lpFactory
      .connect(signer1)
      .getLPFarmsAddress(rewardToken.address, reward50);

    expect(lp1).to.equal(lpAddress);
  });
});
