// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./lpFarm.sol";

contract LpDeployer is IlpDeployer {
    struct LpParameters {
        address factory;
        address owner;
        address token1;
        address token2;
        address token3;
    }

    LpParameters public override lpParameters;

    function deployLpFarm(
        address factory,
        address owner,
        address token1,
        address token2,
        address token3
    ) internal returns (address lpFarm) {
        lpParameters = LpParameters({
            factory: factory,
            owner: owner,
            token1: token1,
            token2: token2,
            token3: token3
        });
        lpFarm = address(
            new LpFarm{
                salt: keccak256(
                    abi.encode(factory, owner, token1, token2, token3)
                )
            }()
        );
        delete lpParameters;
    }
}
