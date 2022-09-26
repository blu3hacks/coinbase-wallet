This tutorial shows a simple starter example of integrating Coinbase Wallet into your site's frontend using React and NextJS.

### Step 1: Set up your file structure
**In this step, we'll initialize NextJS/React and set up the file structure for your Frontend directory which will contain the code used to connect your Coinbase Wallet.**

First, open terminal and run `npx create-next-app` to set up your NextJS React app. This will prompt you to pick a name for your project. We've selected "`coinbase-wallet`".

Next, enter the directory:
```
cd coinbase-demo
```

Open your directory in VS code:
```
code .
```

You'll be using a few dependencies throughout this tutorial. Use yarn or npm to add these to your frontend directory:
```
yarn add ethers @web3-react/core @web3-react/walletlink-connector
```

Test that React everything has been properly set up until this point by running:
```
npm run dev
```
Next, go to `localhost:3000` in your browser to confirm your app is loading as expected.
ut
### Step 2: Create your frontend elements
**In this step, we'll construct the simple frontend that users will interact with to connect their Coinbase Wallet.**

In your IDE, open the **index.js** file (or whatever file contains your wallet connection code - perhaps a Navbar component). Delete the sample NextJS code initially provided in index.js and name your parent div. I used the className `my-div`.

Create a line of text informing the user to connect their wallet. Add a button that the user can click to connect their wallet. This is what index.js should return at this point:
```
  return (
    <div className="my-div">
        <h3>Please connect wallet before continuing</h3>
        <button className="my-button">Connect Wallet</button>
    </div>
  )
```

Next, prepare your code to display different values depending on whether your wallet is connected. We won't be able to use this code yet, but I find coding with this incremental approach makes it easier to identify errors along the way quickly.

Add a state variable that tracks whether the user's wallet is connected with a default value of false:
```
  const [isConnected, setIsConnected] = useState(false);
```
*Note: add this import to the top of your file: `import { useState } from "react"`*

Update the h3 and button output to be conditional depending on whether isConnected is set to true. If the user's wallet is already connected, the h3 should say this rather than prompting the user to connect their wallet. The button should also only be present if the wallet hasn't been connected yet.
```
  return (
    <div className="my-div">
      { isConnected ?
        (
          <h3>Wallet has been successfully connected.</h3>
        ) : (
          <h3>Please connect wallet before continuing</h3>
        )
      }
      { !isConnected && <button className="my-button">Connect Wallet</button> }
    </div>
  )
```

Add a new function that's triggered when the "Connect Wallet" button is clicked. For now, the new function can just log a message to the console until we finish wiring in our Coinbase Wallet logic:
```
  const connectWallet = () => {
    console.log("Connecting wallet");
  }
```

Add an onClick event to your button to trigger a function call to connectWallet. At this point, index.js should look like this:
```
import { useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  
  const connectWallet = async () => {
    console.log("Connecting wallet");
  };

  return (
    <div className="my-div">
      { isConnected ?
        (
          <h3>Wallet has been successfully connecAed.</h3>
        ) : (
          <h3>Please connect wallet before continuing</h3>
        )
      }
      { !isConnected && <button onClick={() => connectWallet()} className="my-button">Connect Wallet</button> }
    </div>
  )
}
```

### Step 3: Create some simple styling.
**Nothing fancy, but in this step we'll add a little css to make our h3 and button look nicer.**

You should already have a `styles` folder. Add a new file within this directory called `style.css`.

Wire in the new css file by adding this import to your _app.js file:
```
import '../styles/style.css'
```

Add some basic styling in your style.css file. I kept it simple, but feel free to get creative!
```
.my-div {
    text-align: center;
    margin-top: 5em;
}

.my-button {
    padding:0.7em 1.7em;
    border-radius: 0.4em;
    color: white;
    background-color: #3369ff;
    box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
}
```

### Step 4: Wire in your Coinbase Wallet connector
**In this step, we'll use web3-react to generate a WalletLinkConnector which enables your site to trigger the Coinbase Wallet browser extension.**

In the root of your frontend directory, create a new folder called `utils`. Inside of that folder, add a file called `connectors.js`.

Add the following code to `connectors.js` to export an object called "connectors". This allows other files to reference Coinbase Wallet.
```
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const walletLink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "coinbase-demo",
});

export const connectors = {
    walletLink: walletLink
}
```

Notice that to construct the walletLink variable, we used an environment variable called `INFURA_KEY`. Create a file called `.env` in your root frontend directory and add this line:
```
INFURA_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```
Instead of the "x"s, use your actual Infura API key which you can generate by signing up for an account on [infura.io](infura.io).

This is for another tutorial, but you can also add other wallets to the connectors file (Metamask, Wallet Connect, etc.) and create a cool popup modal to allow users to select which wallet they want to use. Alternatively, Rainbow Kit has this logic built in and will also be discussed in a later tutorial.

### Step 5: Update app JS to use web3-react
**In this step, we'll update the _app.js file to wrap our component in the Web3ReactProvider.**

Open your _app.js file. Add the following imports:
```
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
```

Next, wrap your overall return value with a Web3ReactProvider:
```
<Web3ReactProvider>
    <Component {...pageProps} />
</Web3ReactProvider>
```

You'll need to set a value for "getLibrary" within the Web3ReactProvider wrapper. Implement a function that returns an ethers Web3Provider and set this to the getLibrary value in the Web3ReactProvider. After doing so, your final _app.js file should look something like this:
```
import '../styles/globals.css'
import '../styles/style.css'

import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
```

### Step 6: Start interacting with Coinbase Wallet!
**In this step, we'll activate Coinbase Wallet when the Connect Wallet button is clicked.**

First, let's add a few more imports to `index.js`:
```
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors'
```

We already created a function called `connectWallet` in Step 2 which is triggered when the "Connect Wallet" button is clicked. Time to populate this function! Above `connectWallet`, add the following reference to the web3-react activate hook:
```
const { activate } = useWeb3React();
```

Finish filling out `connectWallet` by calling the activate function when isConnected is false. Be sure to also toggle the value of `isConnected`!
```
  const connectWallet = async () => {
    try {
      if (!isConnected) {
        await activate(connectors.walletLink);
        setIsConnected(true);
      } else {
        alert("Wallet is already connected!")
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
 ```

*Note that users have to use the Coinbase Wallet browser extension to disconnect their wallet from your app. This can't currently be done in-app using Coinbase Wallet.*

Finally, your `index.js` should look something like this:
```
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors'
import { useState } from "react";

export default function Home() {
  const { activate } = useWeb3React();
  const [isConnected, setIsConnected] = useState(false);
  
  const connectWallet = async () => {
    try {
      if (!isConnected) {
        await activate(connectors.walletLink);
        setIsConnected(true);
      } else {
        alert("Wallet is already connected!")
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="my-div">
      { isConnected ?
        (
          <h3>Wallet has been successfully connecAed.</h3>
        ) : (
          <h3>Please connect wallet before continuing</h3>
        )
      }
      { !isConnected && <button onClick={() => connectWallet()} className="my-button">Connect Wallet</button> }
    </div>
  )
}
```

I hope you enjoyed this tutorial!