# webpack-iconfont-plugin

SVG to iconfont conversion plugin for webpack.

## Features:

* Supported font formats: WOFF2, WOFF, EOT, TTF and SVG.
* Semantic: uses Unicode private use area.
* Cross-browser: IE8+.
* Generates SCSS file, custom templates possible.

## Usage:

`SCSS Styles:`

```scss
@import 'iconfont.scss';

a.arrow {
  &::before {
    @extend %iconfont;
    content: $iconfont-arrow;
  }
}
```

`Webpack config:`

```js
import IconfontPlugin from 'webpack-iconfont-plugin';
import path from 'path';

export default {
    module: {
        loaders: [
            ...
        ]
    },
    plugins: [
        new IconfontPlugin({
            svgs: path.resolve(__dirname, '../assets/svg-icons/**/*.svg'),
            fonts: path.resolve(__dirname, '../assets/fonts'),
            styles: path.resolve(__dirname, '../styles/_iconfont.scss')
        })
    ],
    ...
};
```

## Options

#### `svgs` (required) 
Type: `String`

File path(s) or glob(s) to svg icons.


#### `fonts` (required) 
Type: `String`

Destination for generated font files (directory).


#### `styles` (required) 
Type: `String`

Destination for generated scss file (file path).


#### `cssFontPath`
Type: `String` Default value: `/static/fonts/`

Path that the generated fonts should be referenced with in the CSS styles.


#### `template`
Type: `String` Default value: `scss`

Type of built in style templates ('scss', 'scss-mixins') or path to custom template.


#### `fontName`
Type: `String` Default value: `iconfont`

This dtermines both the font family name (e.g. `font-family: 'iconfont'`, as well as the prefix for scss variables, mixins and classnames (e.g. `.iconfont-arrow`).


#### `fontHeight`
Type: `Number` Default value: `MAX(icons.height)`

The outputted font height (defaults to the height of the highest input icon).


#### `normalize`
Type: `Boolean` Default value: `false`

Normalize icons by scaling them all to the height of the highest icon.
