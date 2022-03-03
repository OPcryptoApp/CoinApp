module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      'babel-preset-expo'
    ]
  ];
  const plugins = [
    ["module:react-native-dotenv",
      {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }
    ]
  ];


  return {
    presets,
    plugins
  }
}
