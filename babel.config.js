const expoPreset = require('babel-preset-expo');

module.exports = function(api) {
  const config = expoPreset(api);

  // React Native 0.86's static view-config codegen cannot parse the
  // experimental native components shipped by the SDK 57 dependency set.
  // Those configs are not required when running the legacy architecture.
  for (const preset of config.presets || []) {
    if (Array.isArray(preset) && preset[1]) {
      preset[1].disableStaticViewConfigsCodegen = true;
    }
  }

  return config;
};
