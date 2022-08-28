# [planedatabase](https://www.planedatabase.com)
Hi! Welcome to the repository that contains planedatabase! A website based off of the website featured in ONE by Cheesy HFJ.

I've released this if anyone else wants to generate and host their own fan-made planedatabase website, (like for their ONE AUs or their own object shows). However, at the moment, there is a LOT of tinkering you will have to do in order to modify it, so **this is only recommended for people who have experience with node.js!**

If you go back in the commit history in this repo, you'll see that this used to be a server that dynamically generated pages on each request using express.js. However, this is no longer the case as that used a LOT more resources than it should for a simple website like this. Now, you are able to generate the website with a single command, and host it using any server you like.
## How to use
First, install node.js. I'm pretty sure either the LTS or latest version should work.
First, clone the repo using git.

    git clone https://github.com/Wicycool/planedatabase
Then, install the dependencies.

    npm install
Next, to build the website, use this command:

    npm start
Now, the exported files should be located in the "exports" folder! You're able to put these on your server or static website hoster now.

And that's pretty much it! If you have any questions or issues, [send me a DM on Twitter](https://twitter.com/Wicycool) or make an issue on GitHub. If you want to make any contributions, feel free to make a pull request!

## About

To see more information about planedatabase, go here: https://www.planedatabase.com/about

*The code contained in this repository is licensed under the GNU GPLv3.
The artwork contained in this repository is created and owned by Cheesy HFJ.*