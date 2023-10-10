module.exports = function override(config, env) {
  // Add your rules here, for example:
  config.module.rules.push({
    test: /\.glsl$/,
    use: "raw-loader",
  });

  return config;
};
