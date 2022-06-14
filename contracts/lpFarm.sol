// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./interfaces/IERC20LP.sol";

contract LPFarm {
    address public owner;
    address public factory;
    address public immutable token;
    uint256 public immutable rewardProportion;

    mapping(address => uint256) public startBlockNumber;
    mapping(address => uint256) public claimedRewards;

    mapping(address => bool) public isParticipant;
    mapping(address => uint256) public deposits;

    event ClaimRewards(address indexed to, uint256 amount);
    event Withdraw(address indexed to, uint256 amount, uint256 tokenReward);
    event Participated(address indexed);

    modifier onlyParticipants(address sender) {
        require(isParticipant[sender] == true, "only participant can access");
        _;
    }

    constructor() {
        (factory, owner, token, rewardProportion) = IlpDeployer(msg.sender)
            .lpParameters();
    }

    // fee to participate is 0.1 ETH
    function participate() public payable {
        require(
            msg.value >= (0.1 * 10**18),
            "provided value is less than 0.1 ETH"
        );

        startBlockNumber[msg.sender] = block.number;
        isParticipant[msg.sender] = true;
        deposits[msg.sender] = msg.value;

        emit Participated(msg.sender);
    }

    function claimRewards() public onlyParticipants(msg.sender) {
        uint256 tokenReward = _claimRewards(msg.sender);

        claimedRewards[msg.sender] = claimedRewards[msg.sender] + tokenReward;

        emit ClaimRewards(msg.sender, tokenReward);
    }

    function withdraw() public onlyParticipants(msg.sender) {
        // check if block has been mine since the last time
        uint256 blockDiff = block.number - 1 - startBlockNumber[msg.sender];

        uint256 tokenReward = 0;
        if (blockDiff >= 1) {
            tokenReward = _claimRewards(msg.sender);
        }

        claimedRewards[msg.sender] = claimedRewards[msg.sender] + tokenReward;

        uint256 _amt = deposits[msg.sender];
        deposits[msg.sender] = 0;

        startBlockNumber[msg.sender] = block.number;
        isParticipant[msg.sender] = false;

        payable(msg.sender).transfer(_amt);

        emit Withdraw(msg.sender, _amt, tokenReward);
    }

    function checkpoint()
        public
        view
        onlyParticipants(msg.sender)
        returns (uint256)
    {
        return
            (block.number - startBlockNumber[msg.sender]) *
            (rewardProportion * 10**18);
    }

    function _claimRewards(address claimer) internal returns (uint256) {
        uint256 blockDiff = block.number - 1 - startBlockNumber[claimer];

        require(blockDiff >= 1, "Block has yet to be mined");

        startBlockNumber[claimer] = block.number;

        uint256 tokenReward = blockDiff * (rewardProportion * 10**18);

        // mint new token for user
        IERC20LP(token).mint(claimer, tokenReward);

        return (tokenReward);
    }
}
