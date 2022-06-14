// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);
  const LpFactory = await ethers.getContractFactory("LPFactory");
  const LpDeployer = await ethers.getContractFactory("LPDeployer");
  const RewardToken = await ethers.getContractFactory("RewardToken");

  const lpFactory = await LpFactory.deploy();
  const lpDeployer = await LpDeployer.deploy();
  const rewardToken = await RewardToken.deploy();

  await lpFactory.deployed();
  await lpDeployer.deployed();
  await rewardToken.deployed();

  const [owner, signer1, signer2] = await ethers.getSigners();

  // // transfer balance to signer 1 and signer 2
  // rewardToken.transfer(signer1.address, BigNumber.from(1000000));
  // rewardToken.transfer(signer2.address, BigNumber.from(1000000));

  const lpFarmByteCode = (await ethers.getContractFactory("LPFarm")).bytecode;

  const lp50 = await lpFactory
    .connect(owner)
    .createLPFarm(rewardToken.address, 50);
  console.log(lp50);
  const lp50Address = getAddress(
    RewardToken,
    signer1,
    lpFactory,
    lpFarmByteCode,
    50
  );
  console.log(lp50Address);
  const lp30 = await lpFactory
    .connect(owner)
    .createLPFarm(rewardToken.address, 30);
  const lp30Address = getAddress(
    RewardToken,
    signer1,
    lpFactory,
    lpFarmByteCode,
    30
  );
  console.log(lp30Address);

  const lp20 = await lpFactory
    .connect(owner)
    .createLPFarm(rewardToken.address, 20);
  const lp20Address = getAddress(
    RewardToken,
    signer1,
    lpFactory,
    lpFarmByteCode,
    20
  );
  console.log(lp20Address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const getAddress = (
  RewardToken: any,
  signer1: any,
  lpFactory: any,
  lpFarmByteCode: any,
  proportion: any
) => {
  const functionParams = utils.defaultAbiCoder.encode(
    ["address", "address", "address", "uint256"],
    [lpFactory.address, signer1.address, RewardToken.address, proportion]
  );

  return ethers.utils.getCreate2Address(
    lpFactory.address,
    utils.keccak256(functionParams),
    utils.keccak256(lpFarmByteCode)
  );
};
