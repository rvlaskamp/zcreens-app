/**
 *  Zcreens RaspberryPi App
 */
 const amino = require('./aminogfx-gl/main');
 const app = new amino.AminoGfx();

/*
  Configuration
 */
const dimensions = require('./config/dimensions');

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
