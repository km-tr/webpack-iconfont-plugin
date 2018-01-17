import fs from 'fs';
import path from 'path';
import del from 'del';
import IconfontPlugin from '../';
import webpackConfigBase from './config/base';
import webpack from 'webpack';

const baseConfig = {
  svgs: path.resolve(__dirname, 'assets/svgs/**/*.svg'),
  fonts: path.resolve(__dirname, 'assets/fonts'),
  styles: path.resolve(__dirname, 'assets/scss/_iconfont.scss')
};

const assets = path.resolve(__dirname, 'assets');

describe('IconfontPlugin initialization', () => {
  it('should export `IconfontPlugin` as a class', () => {
    expect(typeof IconfontPlugin).toEqual('function');
  });

  it('should throw error if not passed `svgs`', () => {
    expect(() => { 
      new IconfontPlugin();
    }).toThrow();
  });

  it('should throw error if not passed `fonts`', () => {
    expect(() => {
      new IconfontPlugin({svgs: '**/*.svg'});
    }).toThrow();
  });

  it('should throw error if not passed `styles`', () => {
    expect(() => {
      new IconfontPlugin({
        svgs: '**/*.svg',
        fonts: './fonts',
      });
    }).toThrow();
  });

  it('should export options', () => {
    const plugin = new IconfontPlugin(baseConfig);
    expect(plugin.options).toEqual(baseConfig);
  });

  it('should register methods on apply', () => {
    const plugin = new IconfontPlugin(baseConfig);
    const compiler = {
      plugin: jest.fn()
    };
    plugin.apply(compiler);
    expect(compiler.plugin).toHaveBeenCalledWith('after-emit', plugin.watch);
    expect(compiler.plugin).toHaveBeenCalledWith('watch-run', plugin.compile),
    expect(compiler.plugin).toHaveBeenCalledWith('run', plugin.compile);
  });
});

beforeEach(() =>
  del([
    path.resolve(__dirname, 'build'),
    `${assets}/fonts`,
    `${assets}/styles/iconfont.css`
  ])
);

// describe('Webpack execution', () => {
//   it('should execute successfully', () => {
    
//     expect.assertions(2);

//     function assertZero(data) {
//       console.log('assetzero');
//       expect(data).toEqual(0);
//     }

//     function assertExists(filepath) {
//       console.log('assertExists', filepath);
//       expect(fs.existsSync(filepath)).toBeTruthy();
//     }

//     webpackConfigBase.plugins = [new IconfontPlugin(baseConfig)];

//     webpack(webpackConfigBase, (error, stats) => {
//         if (error) {
//             throw error;
//         }

//         assertZero(stats.compilation.errors.length);
//         assertExists(path.resolve(__dirname, 'assets/fonts/iconfont.eot'));
//     });
//   });
// });
