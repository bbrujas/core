# core

This repository is part of bbrujas' [WAGMI](https://github.com/bbrujas).

- Main project [page](https://github.com/bbrujas).

- Repository URL: [https://github.com/bbrujas/tcms](https://github.com/bbrujas/core)

## TODO

**backlog** for *core* lives [here](./TODO.md).

## changelog

**changelog** can be found [here](./CHANGELOG.md).

## Introduction

This repository defines a very simple MS coded in NodeJS.

The current branch **capability/tnms**, code-name *tnms*, is a simple microservice used to extract onchain information from toad.network ERC20 token contract.

It services the following resources:

- **/getPlayers**: Returns a list with the addresses that have more than 3 interactions with *toad.network* token contract.
- **/getWeeklyPlayers**: Returns a list with the addresses that have more than 3 interactions with *toad.network* token contract on **current week**.
- **/getAllTx**: Returns a list of all the transactions that have happened with *toad.network* token contract.
- **/getWeeklyTx**: Returns a list of all the transactions that have happened with *toad.network* token contract on **current week**.

## relevant details

*tnms* relies on two different files:

- config file (`.config`): a TOML-like file with configuration details.
- encrypted environment file (`.env.enc`): a TOML-like file with **sensible** information that requires more care when handling. Read more about it [here](#secure-your-environment).

### config file

Default details for config file are as follows:

```toml
HOSTNAME="127.0.0.1"
SERVICE_PORT=8080
TOAD_ADDRESS_BSC='0x463e737d8f740395abf44f7aac2d9531d8d539e9'
HTTP_PROVIDER_URL_BSC="https://api.bscscan.com/api"
TOAD_FIRST_BLOCK_BSC=5193287
```

where:

- HOSTNAME will define the IP address (or hostname if you enable any form of naming resolution) your MS will be publised at.

- PORT will specify which port your MS will be listening to.

- SVC_ID is a string used to identify the MS

- TOAD_ADDRESS_BSC is the BSCScan address of the toad.network ERC20 token address.

- HTTP_PROVIDER_URL_BSC is the bscscan API endpoint as per their [details](https://docs.bscscan.com/getting-started/endpoint-urls).

- TOAD_FIRST_BLOCK_BSC is the block when the toad.network ERC20 token contract was deployed.

### environment file

*tnms* requires a [BSCSCAN](https://bscscan.com) API KEY defined in its environment file, as in the following example:

```toml
ETHERSCAN_API_KEY_BSC="your_etherscan_api_key_goes_here"
```

### Dependencies

```json
  "dependencies": {
    "axios": "^1.3.4",
    "express": "^4.18.2",
    "fs-extra": "^10.1.0",
    "log4js": "^6.4.1",
    "npm-run": "^5.0.1",
    "path": "^0.12.7",
    "secure-env": "1.2.0",
    "toml": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```

## HowToRunThis

*tnms* can be run as follows:

- Download and synchronise the repo:

```sh
git clone git@github.com:bbrujas/core.git
```

- Enter the root folder of the cloned repo:

```sh
cd core
```

- Switch to the appropriate branch for *tnms*:

```sh
git checkout capability/tcms
```

- Should see the following structure:

```sh
tree -a ./
./
├── routes
│   ├── getAllTx.js
│   ├── getPlayers.js
│   ├── getWeeklyPlayers.js
│   └── getWeeklyTx.js
├── utils
│   ├── configEnv.js
│   ├── dataProcessor.js
│   ├── dateUtils.js
│   └── secureEnv.js
├── .config
├── CHANGELOG.md
├── env
├── LICENSE
├── package.json
├── README.md
├── server.js
└── TODO.md
```
> @reader: if you cloned the repo, then you should also see git related artifacts, like *.git* folder and *.gitignore* file. 

- Install *core*:
> @dev: additionally, for prod deploys, you can specify `--omit dev` to the installation command to avoid adding unnecessary development dependencies.

```sh
npm i
```

- Once *core* is installed, you should be able to run the code by executing `npm run start YOUR_PASSWORD` from the root folder of the cloned repository.

> @dev:: To run a securized env please follow [secure your env](#secure-your-environment) practices and add YOUR_PASSWORD to the execution sentence:

```sh
npm run start YOUR_PASSWORD
```

> @dev: You can also run it in *debug mode* with **nodemon** by executing:

```sh
npm run dev YOUR_PASSWORD
```

### secure your environment  

The current project relies on a environment file to access `sensible data` like APY KEYS .

Hence it is advised to develop following some good practises like **distinguishing between prod and deveopment KEYS**.

As an additional measure, the code provided in this example runs using an encrypted capable version of the well-known `dot-env` implementation to encrypt your `.env` file and increase security. Read more about it [here](https://github.com/kunalpanchal/secure-env).

In order to encrypt your .env file (you can use the env file provided as template), proceed as follow: 

1. ensure you have installed the project dependencies as per [How to run this](#howto-run-this).  

2. copy `env` as `.env` and complete the required fields.  

3. execute `npm run generate-env YOUR_PASSWORD`. 

```sh  
npm run generate-env YOUR_PASSWORD

> core@1.0.0 generate-env  
> secure-env .env -s YOUR_PASSWORD  

Secure-env :  INFO The Environment file ".env" has been encrypted to ".env.enc".  
Secure-env :  WARNING Make sure to delete ".env" for production use.  
```  

4. Remember to **delete** your original .env file when deploying on PRODUCTION environments. :)  

## Other resources

- [Building NodeJS microservices](https://blog.logrocket.com/building-microservices-node-js/).

- [Microservices Architectures](https://codeforgeek.com/microservices-nodejs/).

- [NodeJS Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

- [secure-env](https://github.com/kunalpanchal/secure-env).

# END