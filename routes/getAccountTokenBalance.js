const express = require("express");
const axios = require("axios");
const ethers = require("ethers");

const log4js = require("log4js");
const log = log4js.getLogger("getAccountBalance");
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    },
});

const getAccountTokenBalance = express.Router();

getAccountTokenBalance.get("/:address", async (req, res) => {

    const address = req.params.address;
    try {

        // Create a provider using ethers.js
        const myRpcProvider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);

        const transactionsResponse = await axios.get(PROVIDER, {
            params: {
                module: 'account',
                action: 'tokentx',
                address: address,
                apikey: API_KEY,
            },
        });

        const tokenTransactions = transactionsResponse.data.result;

        // Extract unique token addresses from the transactions
        const uniqueTokenAddresses = [...new Set(tokenTransactions.map((tx) => tx.contractAddress))];

        // Fetch token balances for each unique token address
        const tokenBalances = {};

        for (const tokenAddress of uniqueTokenAddresses) {
            const tokenContract = new ethers.Contract(
                tokenAddress,
                ['function balanceOf(address) view returns (uint256)'],
                myRpcProvider
            );

            const tokenBalance = await tokenContract.balanceOf(address);

            // Add the token balance to the result object
            tokenBalances[tokenAddress] = tokenBalance.toString();
        }
        res.payload = tokenBalances;
        //res.statusCode = response.status;
    } catch (error) {
        log.error(error);
        res.payload = error.message;
        res.statusCode = 503;
    } finally {
        res.json(res.payload)
    }
});

module.exports = getAccountTokenBalance