// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

interface IERC20LP is IERC20 {
    function mint(address to, uint256 amount) external;
}
