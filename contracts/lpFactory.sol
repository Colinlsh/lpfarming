// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./LPDeployer.sol";

contract LPFactory is LPDeployer {
    address public admin;
    address[] public lpFarms;
    mapping(address => address) public lpFarmOwner;
    mapping(address => mapping(uint256 => address)) public tokenRewardFarm;

    event LPCreated(address indexed owner, address lp);

    constructor() {
        admin = msg.sender;
    }

    function createLPFarm(address token, uint256 rewardProportion)
        public
        returns (address lp)
    {
        require(
            tokenRewardFarm[token][rewardProportion] == address(0),
            "LP exist"
        );

        lp = deployLPFarm(address(this), msg.sender, token, rewardProportion);

        lpFarmOwner[msg.sender] = lp;
        lpFarms.push(lp);
        tokenRewardFarm[token][rewardProportion] = lp;

        emit LPCreated(msg.sender, lp);
    }

    function getLPFarms()
        public
        view
        returns (address[] memory)
    {
        address[] memory addressList = new address[](
            lpFarms.length
        );

        for (uint256 i = 0; i < lpFarms.length; i++) {
            addressList[i] = address(lpFarms[i]);
        }

        return addressList;
    }
}
