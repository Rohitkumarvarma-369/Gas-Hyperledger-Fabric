# Gas-Hyperledger-Fabric

Steps to run this project

1. Go to the fabric folder and cd into the network-config and run this command in the terminal from that folder:
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/bootstrap.sh| bash -s
this installs the rewuired hyperledger fabric network tools.

2. Go to the javascript folder in the gashl and gas-web-client folders and run npm install to install all the peer npm dependencies.

3. run ./startFabric.sh file in the fabric folder to start the network

4. To access the fabric use node query.js and to add new data use invoke.js

