const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
<<<<<<< HEAD

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './app/global.css' })
=======
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: '../app/global.css' })
>>>>>>> cami-zapata
