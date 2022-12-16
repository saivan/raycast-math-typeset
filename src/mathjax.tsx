
//
//  The default TeX packages to use
//
const PACKAGES = 'base, autoload, require, ams, newcommand';

//
//  Minimal CSS needed for stand-alone image
//
const CSS = [
  'svg a{fill:blue;stroke:blue}',
  '[data-mml-node="merror"]>g{fill:red;stroke:red}',
  '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
  '[data-frame],[data-line]{stroke-width:70px;fill:none}',
  '.mjx-dashed{stroke-dasharray:140}',
  '.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}',
  'use[data-c]{stroke-width:3px}'
].join('');

//
//  Configure MathJax
//
MathJax = {
  Tex: { extensions: ["html"] },
  svg: { },
  startup: {typeset: false},
};

//
//  Load all the needed components
//
require('mathjax-full/components/src/startup/lib/startup.js');
require('mathjax-full/components/src/core/core.js');
require('mathjax-full/components/src/adaptors/liteDOM/liteDOM.js');
require('mathjax-full/components/src/input/tex-base/tex-base.js');
require('mathjax-full/components/src/input/tex/extensions/all-packages/all-packages.js');
require('mathjax-full/components/src/output/svg/svg.js');
require('mathjax-full/components/src/output/svg/fonts/tex/tex.js');
require('mathjax-full/components/src/a11y/assistive-mml/assistive-mml.js');
require('mathjax-full/components/src/startup/startup.js');

//
//  Let MathJax know these are loaded
//
MathJax.loader.preLoad(
    'core',
    'adaptors/liteDOM',
    'input/tex-base',
    '[tex]/all-packages',
    'output/svg',
    'output/svg/fonts/tex',
    'a11y/assistive-mml'
);

//
//  Create the MathJax methods for the input and output that is loaded
//
MathJax.config.startup.ready();
export const jax = MathJax

