// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BlockTalkToken.sol";

contract BlockTalkNFT is ERC721, Ownable(msg.sender) {
    BlockTalkToken public token;
    uint public nextTokenId;
    uint public constant TOKEN_COST = 100 * 1e18; // 100 BTK

    constructor(BlockTalkToken _token) ERC721("BlockTalk NFT", "BTKNFT") {
        token = _token;
    }

    function mintNFT() external {
        require(
            token.balanceOf(msg.sender) >= TOKEN_COST,
            "Not enough BTK tokens"
        );
        token.transferFrom(msg.sender, address(this), TOKEN_COST);

        _mint(msg.sender, nextTokenId);
        nextTokenId++;
    }
}