// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./lpDeployer.sol";

contract LPFactory is LpDeployer {
    address[] public lpFarms;
    mapping(address => address) public lpFarmOwner;

    function createLpFarm(
        address token1,
        address token2,
        address token3
    ) public returns (address lp) {
        lp = deployLpFarm(address(this), msg.sender, token1, token2, token3);
    }
}
