// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./interfaces/IERC20LP.sol";

contract LpFarm {
    address public owner;
    address public factory;
    address public immutable token;
    address public immutable baseToken;
    uint256 public immutable rewardProportion;

    mapping(address => bool) public isProvider;
    mapping(address => uint256) public providerTokenBalance;
    mapping(address => uint256) public providerbaseTokenBalance;
    mapping(address => uint256) public startTime;

    uint256 public constant DAY = 86400;

    event Deposit(address indexed, uint256, uint256);
    event ClaimRewards(address indexed to, uint256 amount);
    event Withdraw(address indexed to, uint256 tokenAmount, uint256 baseAmount);

    modifier onlyProviders(address sender) {
        require(isProvider[sender] == true, "only provider can access");
        _;
    }

    constructor() {
        (factory, owner, token, baseToken, rewardProportion) = IlpDeployer(
            msg.sender
        ).lpParameters();
    }

    function checkpoint(address provider) public {}

    function balance() private view returns (uint256) {
        (bool success, bytes memory data) = token.staticcall(
            abi.encodeWithSelector(IERC20.balanceOf.selector, address(this))
        );
        require(success && data.length >= 32);
        return abi.decode(data, (uint256));
    }

    function deposit(uint256 tokenAmount, uint256 baseTokenAmount) public {
        require(
            tokenAmount > 0 && baseTokenAmount > 0,
            "deposit amount must be more than 0"
        );

        IERC20LP(token).transferFrom(msg.sender, address(this), tokenAmount);

        providerTokenBalance[msg.sender] += tokenAmount;

        IERC20LP(baseToken).transferFrom(
            msg.sender,
            address(this),
            baseTokenAmount
        );

        providerbaseTokenBalance[msg.sender] += baseTokenAmount;

        startTime[msg.sender] = block.timestamp;

        emit Deposit(msg.sender, tokenAmount, baseTokenAmount);
    }

    function claimRewards() public onlyProviders(msg.sender) {
        uint256 toTransfer = calculateYieldTotal(msg.sender);

        require(
            toTransfer > 0 || providerTokenBalance[msg.sender] > 0,
            "Nothing to withdraw"
        );

        if (providerTokenBalance[msg.sender] != 0) {
            uint256 oldBalance = providerTokenBalance[msg.sender];
            providerTokenBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        startTime[msg.sender] = block.timestamp;
        // mint new token for user
        IERC20LP(token).mint(msg.sender, toTransfer);
        emit ClaimRewards(msg.sender, toTransfer);
    }

    function withdraw(uint256 amount) public onlyProviders(msg.sender) {
        require(
            providerTokenBalance[msg.sender] >= amount,
            "Nothing to withdraw"
        );

        uint256 yieldTransfer = calculateYieldTotal(msg.sender);
        startTime[msg.sender] = block.timestamp;
        uint256 currentAmount = providerTokenBalance[msg.sender] +
            yieldTransfer;
        uint256 baseTokenAmount = providerbaseTokenBalance[msg.sender];

        providerTokenBalance[msg.sender] = 0;
        providerbaseTokenBalance[msg.sender] = 0;

        IERC20LP(token).transfer(msg.sender, currentAmount);
        IERC20LP(baseToken).transfer(msg.sender, baseTokenAmount);

        emit Withdraw(msg.sender, currentAmount, baseTokenAmount);
    }

    function calculateYieldTime(address user) internal view returns (uint256) {
        uint256 end = block.timestamp;
        uint256 totalTime = end - startTime[user];
        return totalTime;
    }

    // 86400 represents the number of seconds in a day. Having it to be 86400 it will equate to 100% return rate in 24 hours.
    function calculateYieldTotal(address user) internal view returns (uint256) {
        uint256 time = calculateYieldTime(user) * 10**18;
        uint256 rate = DAY;
        uint256 timeRate = time / rate;
        uint256 rawYield = ((rewardProportion / 100) *
            timeRate *
            providerTokenBalance[msg.sender]) / 10**18;
        return rawYield;
    }
}
