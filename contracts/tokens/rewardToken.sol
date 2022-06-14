// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/IERC20LP.sol";

contract RewardToken is ERC20, IERC20LP {
    uint256 public _totalSupply;

    constructor() ERC20("RewardToken", "RTK") {
        _mint(msg.sender, 100000 * (10**uint256(decimals())));
        _totalSupply = 1000000 * (10**uint256(decimals()));
    }

    function mint(address to, uint256 amount) public override {
        _mint(to, amount);
    }
}
