export const realTrueBlueTokens = {
  colorNavy: 'rgba(0, 25, 53, 1)',
  // ...

  // manually add these
  colorDeprecatedAccent: 'rgba(0, 184, 255, 1)',
};

export const trueBlueTokensToPalette = (tokens) => {
  const t = () => tokens;
  return {
    'chrome': t().colorNavy,
    // ...

    // manually override these
    'accent-hover': t().colorDeprecatedAccent40,
  };
};

export const realTrueBluePalette = trueBlueTokensToPalette(realTrueBlueTokens);
