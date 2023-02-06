const fs = require('fs');
const path = require("path");
const colors = [
  '755da5',
  '5e7ad8',
  '50a0c4',
  '95ae60',
  '92cf48',
  'e39e3c',
  'bf323a',
  'ffffff',
  '595655',
  '000000',
];
const icons = [
  'lui-icon-airport.svg',
  'lui-icon-attraction.svg',
  'lui-icon-bar.svg',
  'lui-icon-bike.svg',
  'lui-icon-bus.svg',
  'lui-icon-business.svg',
  'lui-icon-camping.svg',
  'lui-icon-cardrivemode.svg',
  'lui-icon-coffee.svg',
  'lui-icon-destinationpin.svg',
  'lui-icon-eatanddrink.svg',
  'lui-icon-facilities.svg',
  'lui-icon-foodpizza.svg',
  'lui-icon-home.svg',
  'lui-icon-nature.svg'
];

let svg_color_files = {}

icons.forEach( i => {
  let content = fs.readFileSync(path.resolve(__dirname, `../public/icons/${i}`), 'utf8');
  colors.forEach(c => {
    const newContent = content.replace(/fill=\"#FFFFFF\"/gi,`fill="#${c}"`).replace(/stroke=\"#FFFFFF\"/gi,`stroke="#${c}"`).replace(/<svg /gi,`<svg width="48px" height="48px" `),
          newFileName = `${i.replace(/\.[^/.]+$/, '')}-${c}`;
    var svgBase64String = 'data:image/svg+xml;base64,' + Buffer(newContent,'binary').toString('base64');
    svg_color_files[newFileName]=svgBase64String;
    });
  });
fs.writeFileSync(path.resolve(__dirname, `../src/icons/svgBase64Obj.json`), JSON.stringify(svg_color_files, null, 2));
