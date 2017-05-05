# Product Selection
Written with node@6.10.1 and npm@3.10.10

## Setup
To get running, just do
```sh
$ npm install
$ npm start
```
after checkout.

## Usage
Once up-and-running, you can navigate to http://localhost:8080.

## Tests
### Running unit tests as a developer
To run a test watcher, it's recommended that you run
```sh
$ npm run test-watch
```
This will run a hot-reloading version of the tests in a headless environment using PhantomJS.
To debug tests, run
```sh
$ npm run test-debug
```
This will run a hot-reloading version of the tests within a managed instance of Chrome and allow for debugging via the browser. To debug, switch to the instance of Chrome, click the debug button and then inspect the newly-opened tab. It'll be possible to view tests within the Sources tab, under localhost:9876/base/test/spec. Original code is visible under "webpack://"/./client.

N.B. The port used can vary, so insert whatever port it has ended up using rather than 9876. It's also possible to run tests in the browser of your choice, just by going to localhost:port.

## Running the app
To run a hot-reloading version of the app, run
```sh
$ npm run start
```
