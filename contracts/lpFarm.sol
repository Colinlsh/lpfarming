// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./interfaces/IERC20Minimal.sol";

contract LpFarm {
    address public owner;
    address public factory;
    address public immutable token;

    constructor() {
        (factory, owner, token) = IlpDeployer(msg.sender).lpParameters();
    }

    function checkpoint(address provider) public {}

    function balance() private view returns (uint256) {
        (bool success, bytes memory data) = token.staticcall(
            abi.encodeWithSelector(
                IERC20Minimal.balanceOf.selector,
                address(this)
            )
        );
        require(success && data.length >= 32);
        return abi.decode(data, (uint256));
    }

    function deposit(address provider) public payable {}
}
