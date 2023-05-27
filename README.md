# core

*core* started as part of bbrujas' [WAGMI](https://github.com/bbrujas).

- Main project [page](https://github.com/bbrujas).

- Repository URL: [https://github.com/bbrujas/core](https://github.com/bbrujas/core)

## Devs

> *@dev*:
>
> You can find **TODO** stuff [here](./TODO.md),
>
> **code contribution** agreements and discussion live [here](./CONTRIBUTING.md)
>
> and **changelog** is kept [here](./CHANGELOG.md).
>
> Thanks!

## Introduction

This repository contains a proposal on how to build a simple Microservice coded in NodeJS.

## HowToRunThis

*core* can be executed as follows:

### get *core*

1. Download and synchronise the repo:

```sh
git clone git@github.com:bbrujas/core.git
```

2. Enter the root folder of the cloned repo:

```sh
cd core
```

3. You should have the following structure:

```sh
tree ./
./
├── client (static content folder)
│   ├── favicon.ico (icon default)
│   └── index.html (default static content)
├── routes (express route modules folder)
│   ├── about.js (route to service relevant details about package.json)
│   ├── changelog.js (route to service CHANGELOG.md)
│   └── readme.js (route to service README.md)
├── utils (liraries folder)
│   └── secureEnv.js (secureEnv library)
├── .config (config file for MS)
├── .gitignore (gitignore rules file)
├── CHANGELOG.md (changelog file)
├── CONTRIBUTING.md (CONTRIBUTING file)
├── env (sample file)
├── package.json (app definition)
├── README.md (this file)
├── server.js (microservice core file)
└── TODO.md (TODO file)
```
### Prepare the environment

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

4. Install project dependencies:

```sh
npm i
```

5. Once project dependencies are installed, you should be able to run *core* executing `npm run start YOUR_PASSWORD` from the root folder of the cloned repository.

> NOTE: To execute *core* in a safer environment, please follow [secure your env](#secure-your-environment) and add *YOUR_PASSWORD* to the execution sentence:

```sh
npm run start YOUR_PASSWORD

> core@1.0.0 start
> node server.js YOUR_PASSWORD

[2023-05-27T03:23:18.724] [DEBUG] server-startup - loading configuration.
[2023-05-27T03:23:18.731] [DEBUG] server-startup - loading secure environment.
[2023-05-27T03:23:18.750] [INFO] server-startup - core running at 0.0.0.0:8080
```

That's it, *core* is live and running in your computer. Congrats!

After the execution, you should be able to interact with the 3 default *core* resources:

**/about** - outputs a JSON with the relevant information about current version of *core*.

```sh
tbb@tbb:~/git/tbb/core> curl http://localhost:8080/about
{"name":"core","version":"1.0.0","main":"server.js","description":"This repository is part of bbrujas [WAGMI](https://github.com/bbrujas).","author":"bbrujas","homepage":"https://github.com/bbrujas/core#readme"}
tbb@tbb:~/git/tbb/core>
```

This command should show a console message on your application output, such as the following:

```sh
[2023-05-27T03:30:18.279] [DEBUG] about - about invoked.
```

**/changelog** - outputs the html of the CHANGELOG.md file.

```sh
tbb@tbb:~/git/tbb/core> curl http://localhost:8080/changelog

<h1 id="changelog">Changelog</h1>
<p>All notable changes to this project will be documented in this file.</p>
[...]
<li><strong>2023/05/26</strong> - Repository creation.</li>
</ul>
tbb@tbb:~/git/tbb/core>
```

This command should show a console message on your application output, such as the following:

```sh
[2023-05-27T03:36:07.584] [DEBUG] changelog - changelog invoked.
```

**/readme** - outputs the html of the README.md file.

```sh
tbb@tbb:~/git/tbb/core> curl http://localhost:8080/readme
<h1 id="core">core</h1>
<p>core started as part of bbrujas <a href="https://github.com/bbrujas">WAGMI</a>.</p>
[...]
<h1 id="end">END</h1>
tbb@tbb:~/git/tbb/core>
```

This command should show a console message on your application output, such as the following:

```sh
[2023-05-27T03:38:28.969] [DEBUG] readme - readme invoked.
```

## secure your environment  

The current project relies on several fields that are kept and accessed through your application environment. These are enforced to be built using some good practises. So far, an additional measure advised is to encrypt your `.env` using npm secure-env libraries added as project dependencies. In order to encrypt your .env file (use the env file provided as template), proceed as follow:  

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

4. Remember to **delete** your original *.env* file when deploying on PRODUCTION environments. :)  

### Other resources

- [Building NodeJS microservices](https://blog.logrocket.com/building-microservices-node-js/).

- [Microservices Architectures](https://codeforgeek.com/microservices-nodejs/).

- [NodeJS Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

- [ISC license](https://opensource.org/license/isc-license-txt/).

- [secure-env](https://github.com/kunalpanchal/secure-env).

# END
