import Color from 'colorjs.io';
import { realTrueBluePalette, realTrueBlueTokens, trueBlueTokensToPalette } from './data';
import { darkModeTokensToPalette } from './data';
import { lowContrastClassicTokensToPalette } from './data';
import { cementTokensToPalette } from './data';
import { cyberneticTokensToPalette } from './data';
import { canaryTokensToPalette } from './data';
import { ghostTokensToPalette } from './data';
import { vampireTokensToPalette } from './data';
import { pumpkinTokensToPalette } from './data';
import { nuclearWhiteTokensToPalette } from './data';
import { gothRaveTokensToPalette } from './data';
import { prideTokensToPalette } from './data';
import { realDarkModePalette } from './data';

const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

const sourceTrueBlue = {
  'black': '0, 0, 0',
  'white': '255, 255, 255',
  'white-on-dark': '255, 255, 255',
  'navy': '0, 25, 53',
  'red': '255, 73, 48',
  'orange': '255, 138, 0',
  'yellow': '232, 215, 56',
  'green': '0, 207, 53',
  'blue': '0, 184, 255',
  'purple': '124, 92, 255',
  'pink': '255, 98, 206',
  'deprecated-accent': '0, 184, 255',
  'secondary-accent': '229, 231, 234',
  'follow': '243, 248, 251',

  'gray': '128, 128, 128',
};

const sourceDarkMode = {
  'black': '255, 255, 255',
  'white': '34, 34, 34',
  'white-on-dark': '255, 255, 255',
  'navy': '0, 0, 0',
  'red': '255, 73, 48',
  'orange': '255, 138, 0',
  'yellow': '232, 215, 56',
  'green': '0, 207, 53',
  'blue': '0, 184, 255',
  'purple': '124, 92, 255',
  'pink': '255, 98, 206',
  'deprecated-accent': '0, 184, 255',
  'secondary-accent': '57, 57, 57',
  'follow': '36, 54, 62',

  'gray': '128, 128, 128',
};

const source2016 = {
  'black': '68, 68, 68',
  'white': '255, 255, 255',
  'white-on-dark': '191, 191, 191',
  'navy': '54, 70, 93',
  'red': '217, 94, 64',
  'orange': '242, 153, 46',
  'yellow': '232, 215, 56',
  'green': '86, 188, 138',
  'blue': '82, 158, 204',
  'purple': '167, 125, 194',
  'pink': '116, 128, 137',
  // 'pink': '219, 117, 187',
  'deprecated-accent': '82, 158, 204',
  'secondary-accent': '229, 231, 234',
  'follow': '243, 248, 251',

  'gray': '128, 128, 128',
};

const source2013 = {
  'black': '57, 57, 57',
  'white': '255, 255, 255',
  'white-on-dark': '255, 255, 255',
  'navy': '57, 88, 117',
  'red': '220, 110, 83',
  'orange': '243, 163, 67',
  'yellow': '232, 215, 56',
  'green': '103, 194, 149',
  'blue': '99, 167, 209',
  'purple': '176, 138, 200',
  'pink': '130, 141, 149',
  // 'pink': '223, 121, 191',
  'deprecated-accent': '99, 167, 209',
  'secondary-accent': '245, 245, 245',
  'follow': '243, 248, 251',

  'gray': '128, 128, 128',
};

const sourceDecision2016 = {
  'black': '87, 87, 87',
  'white': '254, 255, 254',
  'white-on-dark': '254, 255, 254',
  'navy': '21, 20, 149',
  'red': '220, 109, 83',
  'orange': '243, 162, 66',
  'yellow': '232, 215, 56',
  'green': '102, 193, 148',
  'blue': '99, 166, 208',
  'purple': '176, 138, 199',
  'pink': '130, 141, 148',
  // 'pink': '223, 121, 191',
  'deprecated-accent': '247, 37, 0',
  'secondary-accent': '245, 245, 245',
  'follow': '243, 248, 251',

  'gray': '128, 128, 128',
};

const generate = (source, name) => {
  const toStringFormat = { format: 'rgba_number', precision: 4 };

  const designTokensMut = {};

  [
    'Navy',
    'Blue',
    'Purple',
    'Pink',
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Black',
    'White',
    'Gray',
    'DeprecatedAccent',
  ].forEach(async (colorName) => {
    const key = `color${colorName}`;
    const color = `rgba(${source[camelToSnakeCase(colorName)]}, 1)`;

    designTokensMut[key] = color;

    const colorJsColor = new Color(color);
    const toWhite = colorJsColor.range('white', { space: 'srgb' });
    const toBlack = colorJsColor.range('black', { space: 'srgb' });

    [3, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100].forEach((num) => {
      if (colorName === 'Navy') {
        const result = toWhite((100 - num) / 100).toString(toStringFormat);
        designTokensMut[`${key}${num}`] = result;
      } else {
        const result = (
          num > 50 ? toBlack((num * 2 - 100) / 100) : toWhite((100 - num * 2) / 100)
        ).toString(toStringFormat);
        designTokensMut[`${key}${num}`] = result;
      }
    });

    [3, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100].forEach((num) => {
      const result = `rgba(${source[camelToSnakeCase(colorName)]}, ${num / 100})`;
      designTokensMut[`${key}Tint${num}`] = result;
    });
  });

  designTokensMut.colorTransparent = 'rgba(255, 255, 255, 0)';

  [
    'Blue',
    'Green',
    ['Green', 'Yellow'],
    'Yellow',
    'Orange',
    ['Orange', 'Red'],
    'Red',
    ['Red', 'Pink'],
    'Pink',
    ['Pink', 'Purple'],
    'Purple',
  ].forEach(async (color, i) => {
    if (Array.isArray(color)) {
      // const colorJsColor = new Color(color[0]);
      // const range = colorJsColor.range(color[1], { space: 'srgb' });
      // designTokensMut[`colorRainbow${i}`] = range(0.5).toString(toStringFormat);
    } else {
      designTokensMut[`colorRainbow${i}`] = `rgba(${source[color.toLowerCase()]}, 1)`;
    }
  });

  const designTokens = Object.fromEntries(
    Object.keys(realTrueBlueTokens).map((key) => [key, designTokensMut[key] ?? null]),
  );
  console.log(`${name} designTokens`, JSON.stringify(designTokens, null, 2));

  const palette = trueBlueTokensToPalette(designTokens);
  console.log(`${name} palette`, JSON.stringify(palette, null, 2));

  return [designTokens, palette];
};

const generateNative = (tokensToPalette, name) => {
  const designTokensMut = {};

  [
    'Navy',
    'Blue',
    'Purple',
    'Pink',
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Black',
    'White',
    'Gray',
    'DeprecatedAccent',
  ].forEach(async (colorName) => {
    const key = `color${colorName}`;
    const color = `rgba(var(--${camelToSnakeCase(colorName)}), 1)`;

    designTokensMut[key] = color;

    [3, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100].forEach((num) => {
      if (colorName === 'Navy') {
        const result = `color-mix(in srgb, ${color}, white ${100 - num}%)`;
        designTokensMut[`${key}${num}`] = result;
      } else {
        const result =
          num > 50
            ? `color-mix(in srgb, ${color}, black ${num * 2 - 100}%)`
            : `color-mix(in srgb, ${color}, white ${100 - num * 2}%)`;
        designTokensMut[`${key}${num}`] = result;
      }
    });

    [3, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95, 100].forEach((num) => {
      const result = `rgba(var(--${camelToSnakeCase(colorName)}), ${num / 100})`;
      designTokensMut[`${key}Tint${num}`] = result;
    });
  });

  designTokensMut.colorTransparent = 'rgba(255, 255, 255, 0)';

  // [
  //   'Blue',
  //   'Green',
  //   ['Green', 'Yellow'],
  //   'Yellow',
  //   'Orange',
  //   ['Orange', 'Red'],
  //   'Red',
  //   ['Red', 'Pink'],
  //   'Pink',
  //   ['Pink', 'Purple'],
  //   'Purple',
  // ].forEach(async (color, i) => {
  //   if (Array.isArray(color)) {
  //     designTokensMut[`colorRainbow${i}`] = `color-mix(in srgb, ${color[0]}, ${color[1]})`;
  //   } else {
  //     designTokensMut[`colorRainbow${i}`] = `rgba(${source[color.toLowerCase()]}, 1)`;
  //   }
  // });

  const designTokens = Object.fromEntries(
    Object.keys(realTrueBlueTokens).map((key) => [key, designTokensMut[key] ?? null]),
  );
  // console.log(`${name} designTokens`, JSON.stringify(designTokens, null, 2));

  const paletteTemp = tokensToPalette(designTokens);
  const palette = Object.fromEntries(
    Object.keys(trueBlueTokensToPalette({})).map((key) => [key, paletteTemp[key] ?? null]),
  );
  console.log(`${name} palette`, JSON.stringify(palette, null, 2));

  return [designTokens, palette];
};

const [designTokensTrueBlue, paletteTrueBlue] = generate(sourceTrueBlue, 'trueblue');

const [designTokens2016, palette2016] = generate(source2016, '2016');
const [designTokens2013, palette2013] = generate(source2013, '2013');
const [designTokensDecision, paletteDecision] = generate(sourceDecision2016, 'decision');

const [designTokensNative, paletteNative] = generateNative(
  trueBlueTokensToPalette,
  'native from trueBlue',
);

const [designTokensDarkMode, paletteDarkMode] = generateNative(
  darkModeTokensToPalette,
  'native from darkMode',
);

// const [, darkMode] = generateNative(darkModeTokensToPalette, 'native from darkMode');
// const [, lowContrastClassic] = generateNative(
//   lowContrastClassicTokensToPalette,
//   'native from lowContrastClassic',
// );
// const [, cement] = generateNative(cementTokensToPalette, 'native from cement');
// const [, cybernetic] = generateNative(cyberneticTokensToPalette, 'native from cybernetic');
// const [, canary] = generateNative(canaryTokensToPalette, 'native from canary');
// const [, ghost] = generateNative(ghostTokensToPalette, 'native from ghost');
// const [, vampire] = generateNative(vampireTokensToPalette, 'native from vampire');
// const [, pumpkin] = generateNative(pumpkinTokensToPalette, 'native from pumpkin');
// const [, nuclearWhite] = generateNative(nuclearWhiteTokensToPalette, 'native from nuclearWhite');
// const [, gothRave] = generateNative(gothRaveTokensToPalette, 'native from gothRave');
// const [, pride] = generateNative(prideTokensToPalette, 'native from pride');

// console.log({
//   trueBlue: paletteNative,
//   darkMode,
//   lowContrastClassic,
//   cement,
//   cybernetic,
//   canary,
//   ghost,
//   vampire,
//   pumpkin,
//   nuclearWhite,
//   gothRave,
//   pride,
// });

const toStyleKeys = (source) =>
  Object.entries(source)
    .map(([key, value]) => `--${key}: ${value}; `)
    .join('\n');

function App() {
  return (
    <>
      <div className="background" />
      <div className="container">
        <style>{`
          .paletteTrueBlue {
            ${toStyleKeys(sourceTrueBlue)}
            ${toStyleKeys(designTokensTrueBlue)}
            ${toStyleKeys(paletteTrueBlue)}
          }
          .paletteDarkMode {
            ${toStyleKeys(sourceDarkMode)}
            ${toStyleKeys(designTokensDarkMode)}
            ${toStyleKeys(paletteDarkMode)}
          }
          .palette2016native {
            ${toStyleKeys(source2016)}
            ${toStyleKeys(designTokensNative)}
            ${toStyleKeys(paletteNative)}
          }
          .palette2016 {
            ${toStyleKeys(source2016)}
            ${toStyleKeys(designTokens2016)}
            ${toStyleKeys(palette2016)}
          }
          .palette2013 {
            ${toStyleKeys(source2013)}
            ${toStyleKeys(designTokens2013)}
            ${toStyleKeys(palette2013)}
          }
          .paletteDecision {
            ${toStyleKeys(sourceDecision2016)}
            ${toStyleKeys(designTokensDecision)}
            ${toStyleKeys(paletteDecision)}
          }
        `}</style>

        {Object.keys(sourceTrueBlue).map((key) => {
          return (
            <div key={key} className="row">
              <div className="swatch" style={{ backgroundColor: `rgb(${sourceTrueBlue[key]})` }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: `rgb(${sourceTrueBlue[key]})` }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: `rgb(${sourceTrueBlue[key]})` }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: `rgb(${source2016[key]})` }}>
                {key} (n)
              </div>
              <div className="swatch" style={{ backgroundColor: `rgb(${source2016[key]})` }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: `rgb(${source2013[key]})` }}>
                {key}
              </div>
              <div
                className="swatch"
                style={{ backgroundColor: `rgb(${sourceDecision2016[key]})` }}
              >
                {key}
              </div>
            </div>
          );
        })}

        {Object.keys(realTrueBlueTokens).map((key) => {
          return (
            <div key={key} className="row">
              <div
                className="swatch"
                style={{
                  backgroundColor: realTrueBlueTokens[key] || `rgb(${sourceTrueBlue[key]})`,
                }}
              >
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: realTrueBlueTokens[key] }}>
                {key}
              </div>
              <div className="swatch paletteTrueBlue" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div
                className="swatch palette2016native"
                style={{ backgroundColor: `var(--${key})` }}
              >
                {key} (n)
              </div>
              <div className="swatch palette2016" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div className="swatch palette2013" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div className="swatch paletteDecision" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
            </div>
          );
        })}

        <hr style={{ margin: '3em' }} />

        {Object.keys(paletteTrueBlue).map((key) => {
          return (
            <div key={key} className="row">
              <div className="swatch" style={{ backgroundColor: realTrueBluePalette[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: realDarkModePalette[key] }}>
                {key}
              </div>
              <div className="swatch paletteDarkMode" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div
                className="swatch palette2016native"
                style={{ backgroundColor: `var(--${key})` }}
              >
                {key} (n)
              </div>
              <div className="swatch palette2016" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div className="swatch palette2013" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
              <div className="swatch paletteDecision" style={{ backgroundColor: `var(--${key})` }}>
                {key}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
