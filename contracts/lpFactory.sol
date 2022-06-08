// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./lpDeployer.sol";

contract LPFactory is LpDeployer {
    address[] public lpFarms;
    mapping(address => address) public lpFarmOwner;

    function createLpFarm(
        address token,
        address baseToken,
        uint256 rewardProportion
    ) public returns (address lp) {
        lp = deployLpFarm(
            address(this),
            msg.sender,
            token,
            baseToken,
            rewardProportion
        );
    }
}
