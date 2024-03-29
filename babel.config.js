module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
      plugins: [
      ["module:react-native-dotenv", {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
      }]
    ]
  };
};



// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['@babel/preset-react'],
//     // plugins: [
//     //   ["module:react-native-dotenv", {
//     //     envName: "APP_ENV",
//     //     moduleName: "@env",
//     //     path: ".env",
//     //   }]
//     // ]
//   };
// };
// // , "module:react-native-dotenv" 
