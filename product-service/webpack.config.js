// Import path for resolving file paths
var path = require('path');
module.exports = {
  // Specify the entry point for our app.
  entry: [
    path.join(__dirname, 'browser.js')
  ],
  target: "node",
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  // Specify the output file containing our bundled code
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    inline: false,
    contentBase: "./dist",
},
  module: {
    /**
      * Tell webpack how to load 'json' files. 
      * When webpack encounters a 'require()' statement
      * where a 'json' file is being imported, it will use
      * the json-loader.  
      */
    loaders: [
      {
        loaders: 'babel-loader',
        test: /\.json$/, 
        //loaders: ['json']
      }
    ]
  }
}