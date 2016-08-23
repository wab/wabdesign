const __svg__ = { path: './assets/svg/**/*.svg', name: './assets/[hash].icons.svg' }
// will overwrite to var __svg__ = { filename: "assets/svg/1466687804854.icons.svg" };

// require basic or custom sprite loader
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

import './main.scss'
