// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./lpFarm.sol";

contract LpDeployer is IlpDeployer {
    struct LpParameters {
        address factory;
        address owner;
        address token;
    }

    LpParameters public override lpParameters;

    function deployLpFarm(
        address factory,
        address owner,
        address token
    ) internal returns (address lpFarm) {
        lpParameters = LpParameters({
            factory: factory,
            owner: owner,
            token: token
        });
        lpFarm = address(
            new LpFarm{salt: keccak256(abi.encode(factory, owner, token))}()
        );
        delete lpParameters;
    }
}
