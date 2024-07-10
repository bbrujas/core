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

It services the following resources:

- **/about**: Returns a some information within MS package.json.
- **/changelog**: Returns a comprehensive list of changes that applied to *core*.
- **/readme**: Returns current MS readme file.

## relevant details

The MS relies on two different files:

- config file (`.config`): a TOML-like file with configuration details.
- encrypted environment file (`.env.enc`): a TOML-like file with **sensible** information that requires more care when handling. Read more about it [here](#secure-your-environment).

### config file

Default details for config file are as follows:

```toml
ENC_ENV_PATH='.env.enc'
HOSTNAME='localhost'
MS_ID='padswap'
PATH_JSON_ABI_FACTORY='./contracts/abis/PadFactory.json'
PATH_JSON_ABI_PADPAIR='./contracts/abis/PadPair.json'
PORT=8080
SMART_CONTRACT='your_factory_smart_contract'
```

where:

- ENC_ENV_PATH is the path to your encrypted environment file. Read more about it [here](#secure-your-environment).

- HOSTNAME will define the IP address (or hostname if you enable any form of naming resolution) your MS will be publised at.

- MS_ID is the value you use to identify your MS instance.

- PATH_JSON_ABI_FACTORY will specify the path to the Factory JSON.

- PATH_JSON_ABI_PADPAIR will specify the path to the Pad Pair JSON.

- PORT will specify which port your MS will be listening to.

- SMART_CONTRACT will specify the address of the factory.


### environment file

The MS core does not require any specific encrypted environment secret. Any escret that needs to be included should be passed in the TOML format, as in the following example:

```toml
RPC_PROVIDER = "your_rpc_provider_goes_here"
HTTP_PROVIDER = "your_http_provider_goes_here"
```

### Dependencies

```json
  "dependencies": {
    "axios": "^1.3.4",
    "dompurify": "^3.0.1",
    "ethers": "5.7",
    "express": "^4.18.2",
    "fs-extra": "^10.1.0",
    "jsdom": "^21.1.1",
    "log4js": "^6.4.1",
    "marked": "^4.2.12",
    "npm-run": "^5.0.1",
    "path": "^0.12.7",
    "secure-env": "1.2.0",
    "serve-favicon": "^2.5.0",
    "shortid": "^2.2.16",
    "toml": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```

## HowToRunThis

This MS can be run as follows:

- Download and synchronise the repo:

```sh
git clone git@github.com:bbrujas/core.git
```

- Enter the root folder of the cloned repo:

```sh
cd core
```

- Should see the following structure:

```sh
tree -a ./
./
├── CHANGELOG.md
├── client
│   ├── favicon.png
│   └── index.html
├── contracts
│   └── abis
├── env
├── LICENSE
├── routes
│   ├── about.js
│   ├── changelog.js
│   └── readme.js
├── utils
│   ├── configEnv.js
│   └── secureEnv.js
├── package.json
├── README.md
├── routes
│   ├── about.js
│   ├── changelog.js
│   ├── factoryPairByAddresses.js
│   ├── factoryPairById.js
│   ├── factoryPairs.js
│   ├── pairAllowance.js
│   ├── pairBalanceOf.js
│   ├── pairDecimals.js
│   ├── pairFactory.js
│   ├── pairKLast.js
│   ├── pairName.js
│   ├── pairNonces.js
│   ├── pairPrice0CumulativeLast.js
│   ├── pairPrice1CumulativeLast.js
│   ├── pairReserves.js
│   ├── pairSymbol.js
│   ├── pairToken0.js
│   ├── pairToken1.js
│   ├── pairTotalSupply.js
│   └── readme.js
├── server.js
├── TODO.md
└── utils
    ├── configEnv.js
    └── secureEnv.js
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

- [Express JS app locals](https://expressjs.com/en/api.html#app.locals)

- [ethersJS 5 Doc](https://docs.ethers.org/v5/).

- [Building NodeJS microservices](https://blog.logrocket.com/building-microservices-node-js/).

- [Microservices Architectures](https://codeforgeek.com/microservices-nodejs/).

- [NodeJS Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

- [secure-env](https://github.com/kunalpanchal/secure-env).

# END