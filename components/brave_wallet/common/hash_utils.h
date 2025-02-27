/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_HASH_UTILS_H_
#define BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_HASH_UTILS_H_

#include <string>
#include <vector>

#include "mises/components/brave_wallet/common/eth_abi_utils.h"

namespace brave_wallet {

// Equivalent to web3.utils.keccak256(string)
std::string KeccakHash(const std::string& input, bool to_hex = true);
std::vector<uint8_t> KeccakHash(const std::vector<uint8_t>& input);
eth_abi::Bytes32 KeccakHashBytes32(base::span<const uint8_t> input);

// Returns the hex encoding of the first 4 bytes of the hash.
// For example: keccak('balanceOf(address)')
std::string GetFunctionHash(const std::string& input);
eth_abi::Bytes4 GetFunctionHashBytes4(const std::string& input);

// Implement namehash algorithm based on EIP-137 spec.
// Used for converting domain names in the classic format (ex: brave.crypto) to
// an ERC-721 token for ENS and Unstoppable Domains.
eth_abi::Bytes32 Namehash(const std::string& name);

}  // namespace brave_wallet

#endif  // BRAVE_COMPONENTS_BRAVE_WALLET_COMMON_HASH_UTILS_H_
