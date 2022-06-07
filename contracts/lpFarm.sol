// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";

contract LpFarm {
    address public owner;
    address public factory;
    address public immutable token1;
    address public immutable token2;
    address public immutable token3;

    constructor() {
        (factory, owner, token1, token2, token3) = IlpDeployer(msg.sender)
            .lpParameters();
    }
}
