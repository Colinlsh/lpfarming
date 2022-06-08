// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./interfaces/IERC20Minimal.sol";

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

    function checkpoint(address provider) public {}

    function balance1() private view returns (uint256) {
        (bool success, bytes memory data) = token1.staticcall(
            abi.encodeWithSelector(
                IERC20Minimal.balanceOf.selector,
                address(this)
            )
        );
        require(success && data.length >= 32);
        return abi.decode(data, (uint256));
    }

    function balance2() private view returns (uint256) {
        (bool success, bytes memory data) = token2.staticcall(
            abi.encodeWithSelector(
                IERC20Minimal.balanceOf.selector,
                address(this)
            )
        );
        require(success && data.length >= 32);
        return abi.decode(data, (uint256));
    }

    function balance3() private view returns (uint256) {
        (bool success, bytes memory data) = token3.staticcall(
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
