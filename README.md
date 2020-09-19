# Kanbanboard
Check out the live demo version [here](https://kanbanboard-zandrexrc.netlify.app)!

- [Features](#features)
- [Requirements](#requirements)
- [Installation guide](#installation-guide)
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
- The data is saved in a local file named `data.json`, which is located in the 
*src/server* directory.

> If you exit or refresh the app without saving, all of the changes you made 
> will be lost!

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


## Requirements
- NodeJS


## Installation guide
1. Download or clone the repo.

2. Change the server port in *src/server/index.js* to one that is not currently 
in use:
```javascript
...
const port = 8080;
...
```

3. Change the proxy in *packages.json* located in the root directory of the app 
to match your host and port:
```javascript
...
"proxy": "http://localhost:8080",
...
```

4. Navigate to the root directory of the app and install all dependencies by 
running `npm install`.

5. Run the app with `npm start`.


## Uninstallation guide
1. Just delete the root folder of the app :)


## Author and licensing
Developed by [Zandrex Camagon](http://zandrexrc.me). 
Licensed under [MIT License](http://example.com/).


[painting]: https://commons.wikimedia.org/wiki/File:Clevelandart_1953.155.jpg
[artist]: https://en.wikipedia.org/wiki/Claude_Monet