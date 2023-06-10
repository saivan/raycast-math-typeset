
import { jax } from './mathjax'
import asciiMathToLatex from 'asciimath-to-latex'
import { Blob } from 'node:buffer'
import fs from 'fs'
import os from 'os'
import path from 'path'
import svg2img from 'svg2img'
// import parseSvg from 'svg-parser'



// export async function exportPngImage (
//   string: string,
//   useAsciimath: boolean,
//   inline: boolean,
// ) {
//   // Get and parse the svg
//   const svgString = renderSvg(string, useAsciimath, inline)
//   const svgTree = parseSvg(svgString)
//   const svgRoot = svgTree.children.find(node => node.tagName === 'svg');

//   // Figure out the svg width and height
//   const width = svgRoot.properties.width || 100;
//   const height = svgRoot.properties.height || 100;

//   // Convert it to png
//   const directory = os.tmpdir()
//   const filename = path.join(directory, `math.png`)
//   const result = await new Promise(accept => {
//     svg2img(svgString, { width, height }, (error, buffer) => {
//       if (error) {
//         console.error(`Error rendering SVG to PNG: ${error}`);
//       } else {
//         fs.writeFileSync(filename, buffer);
//         console.log(`PNG file written to ${filename}`);
//       }
//     });

//   })
// }


export function exportSvgImage (
  string: string, 
  useAsciimath:boolean, 
  inline: boolean,
) {
  const svgString = renderSvg(string, useAsciimath, inline)
  const directory = os.tmpdir()
  const filename = path.join(directory, `math.svg`)
  fs.writeFileSync(filename, svgString)
  return filename
}


export function typesetBase64Svg (
  string: string, 
  useAsciimath:boolean, 
  inline: boolean,
) {
  const htmlCode = renderSvg(string, useAsciimath, inline)
  const base64 = Buffer.from(htmlCode).toString('base64')
  const imgSrc = `data:image/svg+xml;base64,${base64}`
  return imgSrc
}


export function renderSvg (
  string: string, 
  useAsciimath: boolean, 
  inline: boolean,
) {
  // Given no string, return no source
  if (!string) return ''

  // Generate the svg from the document
  const texString = useAsciimath ? asciiMathToLatex(string) : string
  const adaptor = jax.startup.adaptor
  const node = jax.tex2svg(texString, { display: !inline })

  // Get the svg and modify its attributes
  const svg = node.children[0]
  svg.attributes.height = '200px'
  svg.attributes.width = '100%'
  const svgCode = adaptor.outerHTML(svg)
  return svgCode
}

