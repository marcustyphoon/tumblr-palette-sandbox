import Color from 'colorjs.io';
import { realTrueBluePalette, realTrueBlueTokens, trueBlueTokensToPalette } from './data';

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
  'accent': '0, 184, 255',
  'secondary-accent': '229, 231, 234',
  'follow': '243, 248, 251',

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
  'accent': '82, 158, 204',
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
  'accent': '99, 167, 209',
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
  'accent': '247, 37, 0',
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
  ].forEach(async (colorName) => {
    const key = `color${colorName}`;
    const color = `rgba(${source[colorName.toLowerCase()]}, 1)`;

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
      const result = `rgba(${source[colorName.toLowerCase()]}, ${num / 100})`;
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

const generateNative = (source, name) => {
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
  ].forEach(async (colorName) => {
    const key = `color${colorName}`;
    const color = `rgba(${source[colorName.toLowerCase()]}, 1)`;

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
      const result = `rgba(${source[colorName.toLowerCase()]}, ${num / 100})`;
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
  console.log(`${name} designTokens`, JSON.stringify(designTokens, null, 2));

  const palette = trueBlueTokensToPalette(designTokens);
  console.log(`${name} palette`, JSON.stringify(palette, null, 2));

  return [designTokens, palette];
};

const [designTokensTrueBlue, paletteTrueBlue] = generate(sourceTrueBlue, 'trueblue');
const [designTokens2016, palette2016] = generate(source2016, '2016');
const [designTokens2016Native, palette2016Native] = generateNative(source2016, '2016 native');
const [designTokens2013, palette2013] = generate(source2013, '2013');
const [designTokensDecision, paletteDecision] = generate(sourceDecision2016, 'decision');

function App() {
  return (
    <>
      <div className="background" />
      <div className="container">
        {Object.keys(realTrueBlueTokens).map((key) => {
          return (
            <div key={key} className="row">
              <div className="swatch" style={{ backgroundColor: realTrueBlueTokens[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: designTokensTrueBlue[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: designTokens2016Native[key] }}>
                {key} (n)
              </div>
              <div className="swatch" style={{ backgroundColor: designTokens2016[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: designTokens2013[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: designTokensDecision[key] }}>
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
              <div className="swatch" style={{ backgroundColor: paletteTrueBlue[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: palette2016Native[key] }}>
                {key} (n)
              </div>
              <div className="swatch" style={{ backgroundColor: palette2016[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: palette2013[key] }}>
                {key}
              </div>
              <div className="swatch" style={{ backgroundColor: paletteDecision[key] }}>
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
