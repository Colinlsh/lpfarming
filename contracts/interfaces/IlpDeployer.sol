// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IlpDeployer {
    function lpParameters()
        external
        view
        returns (
            address factory,
            address owner,
            address token,
            uint256 rewardProportion
        );
}
