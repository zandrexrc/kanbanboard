# Kanbanboard
Check out the live demo version [here](https://kanbanboard-zandrexrc.netlify.app)!

You can also run it as an Electron app! [Read more here.](#running-the-electron-app)

- [Features](#features)
- [Requirements](#requirements)
- [Installation guide](#installation-guide)
- [Setting up React development server](#setting-up-react-development-server)
- [Running the Electron app](#running-the-electron-app)
- [Packaging the electron app](#packaging-the-electron-app)
- [Uninstallation guide](#uninstallation-guide)
- [Author and licensing](#author-and-licensing)


## Features

### Cards
A card represents a task. It is placed in the column that describes its status: 
`Todo`, `Doing`, or `Done`.
- To add a new card, click on the + icon on the upper right side of the taskbar.
- To see more details about a card, simply click on it.
    - To edit or delete the card, click on the edit or delete button on the 
    upper right corner.
- To place a card into another column, simply drag and drop it into the column 
of your choice.   

`Tags` are used to categorize your cards. To add tags to a card, fill out the 
tags field when editing or creating a new card.   
- When adding multiple tags, separate the tags with commas (,)

### Boards
A board is a collection of cards.
- To see a list of your boards, click on the board name on the upper left side 
of the taskbar.
    - To switch boards, simply click on the board you want to switch to.
    - To add a new board, click on the button at the bottom of the list.
    - To edit or delete a board, click on the edit or delete button on your 
    selected board.
- To filter the cards by tag, click on the filter button on the upper left side
corner of the taskbar and choose the filtering tag.
    - Click on the clear filters button at the bottom of the list to reset the 
    filters.

### Saving your data
Click on the save button located in the upper right corner of the taskbar to
save the current state of your cards and boards. 
(The data is saved in *data/data.json*.)

**If you exit or refresh the app without saving, all of the changes you made** 
**will be lost!**


## Installation guide

**Requirements**
- Node.js, npm
   
1. Download or clone the repo.

2. Navigate to the root directory of the app and install all dependencies: 
```
npm install
```
> You may need to fix some vulnerabilities. Run `npm audit fix` to fix them.

3. Build the React app:
```
npm run build
```

4. Start the server: 
```
npm start
```
> The server runs on port 8080 by default. To change it, modify the 
> **SERVER_PORT** value in the *.env* file. You'll also need to update the 
> **proxy** settings in *package.json* to match the new port.

5. Open *localhost:8080* in a browser.
> If you changed the port, use your port number instead of 8080.


## Setting up React development server
If you want to modify the React source files, you may want set up the CRA 
development environment:
```
npm run start:dev
```
By default, the React server runs on port 3000. To change it, open the *.env* 
file and change **PORT** to your desired port number.
   
Remember to run `npm run build` to rebuild your app after you're done developing.

### Enabling Redux Logger
When an action is dispatched, Redux Logger prints the previous and current state 
on the console. To enable this feature, go to *src/redux/store.ts* and set 
**loggerIsActive** to *true*.

### Customizing the background images
Upload the images you want to use in the *public* folder.
- To change the background of the app, go to `App.css` and change the 
background image.
    - The default image used is a simple grid pattern made by 
    [yours truly](http://zandrexrc.me).
- To change the background image of the board, go to 
*src/components/ColumnsContainer.tsx* and change the background image in the 
`makeStyles` function.
    - The default image used is [Spring Flowers (1864)][painting] by 
    [Claude Monet][artist]


## Running the Electron app
```
npm run start:electron
```


## Packaging the Electron app
```
npm run package
```
This will create a new directory called *kanbanboard-<your_OS>* that contains 
an executable program (.exe/.app, depending on your OS).


## Uninstallation guide
1. Just delete the root folder of the app :)
> The packaged Electron app is not installed on your device, so it's safe to 
> just delete the folder :)


## Author and licensing
Developed by [Zandrex Camagon](http://zandrexrc.me). 
Licensed under [MIT License](https://github.com/zandrexrc/kanbanboard/blob/master/LICENSE).


[painting]: https://commons.wikimedia.org/wiki/File:Clevelandart_1953.155.jpg
[artist]: https://en.wikipedia.org/wiki/Claude_Monet
