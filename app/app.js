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
const cecHelper = require('./helpers/cec');

const isDevelopment = (process.argv[2]);

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
app.opacity(0);
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

   // Create and set the root group
   const root = app.createGroup();
   app.setRoot(root);

   // Add the main view to the root group
   const mainView = new views.main(app);

   root.add(rect);
   root.add(mainView.mainGroup);

   // Load the menu items
   fetch.menuItems()
   .then((menuItems) => {

     if (!isDevelopment) {
       // Initialize CEC Client
       const cec = new NodeCec('node-cec-monitor');

       // Start CEC Client
       cec.start( 'cec-client' );

       cec.once('ready', (client) => {
         console.log( ' -- CEC READY -- ' );
         client.sendCommand( 0xf0, CEC.Opcode.GIVE_DEVICE_POWER_STATUS);
       });

       cec.on('USER_CONTROL_PRESSED', (event, key) => {
         console.log( ' -- CEC KEY PRESSED', key);
         mainView.remotePressed(key);
       });
     }

     // Add menu items
     mainView.addMenu(menuItems);
   });

 });
