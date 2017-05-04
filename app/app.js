/**
 *  Zcreens RaspberryPi App
 */
 const amino = require('./aminogfx-gl/main');
 const nodecec = require('node-cec');
 const app = new amino.AminoGfx();

/*
  Configuration
 */
const dimensions = require('./config/dimensions');

// CEC Client
const NodeCec = nodecec.NodeCec;
const CEC = nodecec.CEC;

/*
  Helpers
 */
const fetch = require('./helpers/fetch');

/*
  Views
 */

const views = {
  main: require('./views/main')
}

/*
  Configure the application
 */

app.w(dimensions.app.width);
app.h(dimensions.app.height);
app.title('Zcreens');
app.showFPS(false);

/*
  Start the application
 */

 app.start((err) => {
   if (err) {
     console.log('Start failed', err.message);
     return;
   }

   // Initialize CEC Client
   const cec = new NodeCec('node-cec-monitor');

   cec.once('ready', (client) => {
     console.log( ' -- READY -- ' );
     client.sendCommand( 0xf0, CEC.Opcode.GIVE_DEVICE_POWER_STATUS);
   });

   cec.on('USER_CONTROL_PRESSED', (event) => {
     console.log(event);
   });

   // Start CEC Client
   cec.start( 'cec-client', '-m', '-d', '8', '-b', 'r' );

   // Create and set the root group
   const root = app.createGroup();
   app.setRoot(root);

   // Add the main view to the root group
   const mainView = new views.main(app);
   root.add(mainView.mainGroup);

   // Load the menu items
   fetch.menuItems()
   .then((menuItems) => {
     mainView.addMenu(menuItems);
   });

 });
