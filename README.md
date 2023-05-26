# core

This repository is part of bbrujas' [WAGMI](https://github.com/bbrujas).

- Main project [page](https://github.com/bbrujas).

- Repository URL: [https://github.com/bbrujas/core](https://github.com/bbrujas/core)

## TODO


## changelog

[changelog](./CHANGELOG.md) has been moved, please ensure new changes are captured there. Thanks!

## Introduction

This repository contains the requirements and tools needed to build simple NodeJS based Microservices.

## Relevant details

### HowToRunThis

This MS can be executed as follows:

- Download and synchronise the repo:

```bash
git clone git@github.com:bbrujas/core.git
```

- Enter the root folder of the cloned repo:

```bash
cd core
```

- Should see the following structure:

```bash
tree core/
core/
├── client
│   ├── favicon.ico
│   └── index.html
├── routes
│   ├── about.js
│   ├── changelog.js
│   └── readme.js
├── utils
│   └── secureEnv.js
├── .config (config file for MS)
├── .gitignore (hidden file)
├── CHANGELOG.md (hangelog file)
├── env (sample file)
├── package.json
├── README.md
└── server.js
```

- Install project dependencies:

```bash
npm i
```

- Once project dependencies are installed, you should be able to run the test demo executing `npm run start YOUR_PASSWORD` from the root folder of the cloned repository.

>NOTE: To run a securized env please follow [secure your env](#secure-your-environment) and add YOUR_PASSWORD to the execution sentence:

```bash
npm run start YOUR_PASSWORD
```

### secure your environment  

The current project relies on several fields that are kept and accessed through your application environment. These are enforced to be built using some good practises. So far, an additional measure advised is to encrypt your `.env` using npm secure-env libraries added as project dependencies. In order to encrypt your .env file (use the env file provided as template), proceed as follow:  

1. ensure you have installed the project dependencies as per [How to run this](#howto-run-this).  

2. copy `env` as `.env` and complete the required fields.  

3. execute `npm run generate-env YOUR_PASSWORD`. 

```bash  
npm run generate-env YOUR_PASSWORD

> bc-ms-njs-core@1.0.2 generate-env  
> secure-env .env -s YOUR_PASSWORD  

Secure-env :  INFO The Environment file ".env" has been encrypted to ".env.enc".  
Secure-env :  WARNING Make sure to delete ".env" for production use.  
```  

4. Remember to **delete** your original .env file when deploying on PRODUCTION environments. :)  

#### Other resources

- Building [NodeJS microservices](https://blog.logrocket.com/building-microservices-node-js/).

- [Microservices Architectures](https://codeforgeek.com/microservices-nodejs/).

- [NodeJS Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

- [ISC license](https://opensource.org/license/isc-license-txt/).


### Dependencies

```json
"dependencies": {
    "axios": "^1.3.4",
    "dompurify": "^3.0.1",
    "express": "^4.18.2",
    "fs-extra": "^10.1.0",
    "jsdom": "^21.1.1",
    "log4js": "^6.4.1",
    "marked": "^4.2.12",
    "nodemon": "^2.0.20",
    "npm-run": "^5.0.1",
    "path": "^0.12.7",
    "secure-env": "1.2.0",
    "serve-favicon": "^2.5.0",
    "shortid": "^2.2.16",
    "toml": "^3.0.0"
}
```

# END
