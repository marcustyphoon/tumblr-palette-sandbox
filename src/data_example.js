export const realTrueBlueTokens = {
  colorNavy: 'rgba(0, 25, 53, 1)',
  // ...
};

export const trueBlueTokensToPalette = (tokens) => {
  const t = () => tokens;
  return {
    'chrome': t().colorNavy,
    // ...
  };
};

export const realTrueBluePalette = trueBlueTokensToPalette(realTrueBlueTokens);
