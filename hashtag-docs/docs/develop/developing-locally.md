1. Set up Ganache CLI To install Truffle and Ganache globally, run one the
   following two commands from a terminal:

``` bash
# NPM
$ npm install -g truffle ganache-cli

# Yarn
$ yarn global add truffle ganache-cli
```

The following will start a local blockchain using ganache-cli

``` bash
ganache-cli -h 0.0.0.0 -m "worth grunt bridge trade chuckle stand lamp jealous snow order pluck mobile" -i 5777 --chainId 5777
```


``` bash
truffle migrate --network [network name from truffle-config.js]
```

You need docker running on your machine; if you don't have install it.

Once installed, clone the graph-node repository:

```
git clone https://github.com/graphprotocol/graph-node.git

# navigate into the docker directory
cd graph-node/docker

Create a file called run-graph-node.sh and paste the following in it:

``` bash
#!/bin/bash

docker-compose down -v;

if [ -d "data" ]
then
  echo "Found old data for the graph node - deleting it";
  # we need to sudo this to remove system locked files
  sudo rm -rf data/;
fi

docker-compose up;
```

If you are on windows or mac, run

``` bash
./run-graph-node.sh
```

If you get port errors, for example:

``` bash
ERROR: for docker_graph-node_1  Cannot start service graph-node: Ports are not available: listen tcp 0.0.0.0:8000: bind: address already in use
```

I was able to fix by editing docker-compose.yml as follows:

``` bash
    ports:
      - '8002:8000' <---
      - '8001:8001'
      - '8020:8020'
      - '8030:8030'
      - '8040:8040'
```






```
