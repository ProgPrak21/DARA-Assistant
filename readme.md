# DARA Assistant Browser Extension
The DARA Assistant browser extension helps you to request your data from various companies. It can execute the clicks necessary to issue a data request on the corresponding data request page.

## Getting started

Clone the DARA-Assistant project

```
$ git clone https://github.com/ProgPrak21/DARA-Assistant
```

Navigate to the project directory and install the dependencies.

```
$ npm install
```

To build the extension, and rebuild it when the files are changed, run

```
$ npm start
```

After the project has been built, a directory named `dist` has been created. You have to add this directory to your Chrome browser:

1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable _Developer mode_.
4. Click _Load unpacked_.
5. Select the `dist` directory.
