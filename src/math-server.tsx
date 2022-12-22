
import { jax } from './mathjax'
import asciiMathToLatex from 'asciimath-to-latex'


export function renderSvg (string, useAsciimath, inline) {
  if (!string) return '';
  const texString = useAsciimath ? asciiMathToLatex(string) : string;
  const adaptor = jax.startup.adaptor;
  const node = jax.tex2svg(texString, { display: !inline });
  const svg = node.children[0];
  svg.attributes.height = '200px'
  svg.attributes.width = '100%'
  const htmlCode = adaptor.outerHTML(svg);
  const base64 = Buffer.from(htmlCode).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}





