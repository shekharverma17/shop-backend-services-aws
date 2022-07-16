// Import path for resolving file paths
var path = require('path');

//const slsw = require('serverless-webpack');
module.exports = {
  // Specify the entry point for our app.
  entry: [
    path.join(__dirname, 'package.json')
  ],
  //entry: slsw.lib.entries,
  // Specify the output file containing our bundled code
  output: {
    path: __dirname,
    filename: 'bundle.js'
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
        test: /\.json$/, 
        loaders: ['json']
      }
    ]
  }
}

// module.exports = {
//     //entry: slsw.lib.entries,
//     target: 'node',
//     mode: "production",
//     loader: 'babel-loader',
//     devServer: {
//         inline: false,
//         contentBase: "./dist",
//     },
//     module: {
//         rules: [ ]
//       },
//   };


// const slsw = require('serverless-webpack');
// module.exports = {
//   target: 'node',
//   entry: slsw.lib.entries,
//   mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
//   node: false,
//   optimization: {
//     minimize: false,
//   },
//   loader: 'babel-loader',
//   module:{
//     rules:[{
//         loader: 'babel-loader',
//         test: '/\.(js|jsx)$/',
//         exclude: '/node_modules/'
//     }]
// },
//   devtool: 'inline-cheap-module-source-map',
// };

