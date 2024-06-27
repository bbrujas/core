# core

This repository is part of bbrujas' [WAGMI](https://github.com/bbrujas).

- Main project [page](https://github.com/bbrujas).

- Repository URL: [https://github.com/bbrujas/core](https://github.com/bbrujas/core)

## TODO

**backlog** for *core* lives [here](./TODO.md).

## changelog

**changelog** can be found [here](./CHANGELOG.md).

## Introduction

This repository defines a very simple MS coded in NodeJS.

The current branch **capability/cmc**, code-name *cmc*, is a simple microservice used to extract information from coinmarketCap site.

It services the following resources:

- **/getListings**: Returns a list with the first 200 tokens listed, sorted by market cap.
- **/getMonitored**: Returns a list with the tokens provided in the set of the config file, sorted by market cap.
- **/getMap**: Returns a map with the more relevant details of the tokens specified in the config file.
- **/getPriceUSD**: Returns the price in USD for the token symbol passed as parameter.
- **/getQuotes**: Returns the latest quotes in USD.

> @dev: there's an additional [cmc.postman_collection.json](./cmc.postman_collection.json) file that contains a PostMan collection set with the corresponding resources to test.

## relevant details

The MS relies on two different files:

- config file (`.config`): a TOML-like file with configuration details.
- encrypted environment file (`.env.enc`): a TOML-like file with **sensible** information that requires more care when handling. Read more about it [here](#secure-your-environment).

### config file

Default details for config file are as follows:

```toml
COIN_LIST=["BTC","ETH"]
ENC_ENV_PATH='.env.enc'
HOSTNAME='localhost'
HTTP_PROVIDER='https://pro-api.coinmarketcap.com'
MS_ID='cmc'
PORT=8080
```

where:

- COIN_LIST is a map with all the coins you want to monitor.

- ENC_ENV_PATH defines the path and filename of the encrypted environment. Read [here](#secure-your-environment) for more details.

- HOSTNAME will define the IP address (or hostname if you enable any form of naming resolution) your MS will be publised at.

- HTTP_PROVIDER is the URL for the CoinMarketCap api endpoint.

- MS_ID= is an string representing the name you use to identify the running instance of the Microservice

- PORT will specify which port your MS will be listening to.

### environment file

The MS core does not require any specific encrypted environment secret. Any secret that needs to be included should be passed in the TOML format, as in the following example:

```toml
API_KEY = "your_coinmarketcap_api_key_goes_here"
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

This MS can be run as follows:

- Download and synchronise the repo:

```sh
git clone git@github.com:bbrujas/core.git
```

- Enter the root folder of the cloned repo:

```sh
cd core
```

- Switch to the corresponding branch:

```sh
git checkout capability/coinmarketcap
```

- Should see the following structure:

```sh
tree -a ./
./
├── routes
│   ├── getListings.js
│   ├── getMap.js
│   ├── getMonitored.js
│   ├── getPriceUSD.js
│   └── getQuotes.js
├── utils
│   ├── configEnv.js
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

- [coinmarketcap-apis](https://coinmarketcap.com/api/documentation).

# END