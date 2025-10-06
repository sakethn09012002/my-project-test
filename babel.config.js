module.exports = function (api) {
  // Cache based on whether we're in test environment
  const isTest = api && (api.env && api.env() === 'test' || process.env.JEST_WORKER_ID !== undefined);
  api && api.cache && api.cache(() => isTest);

  if (!isTest) {
    // Do not apply Babel transforms for normal dev/build runs.
    return {};
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current' },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
};
