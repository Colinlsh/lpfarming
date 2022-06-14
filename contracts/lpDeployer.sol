// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./interfaces/IlpDeployer.sol";
import "./LPFarm.sol";

contract LPDeployer is IlpDeployer {
    struct LpParameters {
        address factory;
        address owner;
        address token;
        uint256 rewardProportion;
    }

    LpParameters public override lpParameters;

    function deployLPFarm(
        address factory,
        address owner,
        address token,
        uint256 rewardProportion
    ) internal returns (address lpFarm) {
        lpParameters = LpParameters({
            factory: factory,
            owner: owner,
            token: token,
            rewardProportion: rewardProportion
        });
        lpFarm = address(
            new LPFarm{
                salt: keccak256(
                    abi.encode(factory, owner, token, rewardProportion)
                )
            }()
        );
        delete lpParameters;
    }
}
