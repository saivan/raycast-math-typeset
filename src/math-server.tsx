
import { jax, adaptor } from './mathjax'
import asciiMathToLatex from 'asciimath-to-latex'
import fs from 'fs'
import os from 'os'
import path from 'path'
const { execSync } = require('child_process')


const directory = os.tmpdir()
const svgFilename = path.join(directory, `math.svg`)
const pngFilename = path.join(directory, `math.png`)


function svgToPng (inputFile: string, outputFile: string) {
  const command = `sips -s format png ${inputFile} --out ${outputFile}`;
  console.log('doooooooooooooit')
  execSync(command)
  console.log('diduuuuuut')
}

export function exportPngImage (
  string: string,
  useAsciimath: boolean,
  inline: boolean,
) {
  exportSvgImage(string, useAsciimath, inline)
  svgToPng(svgFilename, pngFilename)
  return pngFilename
}


export function exportSvgImage (
  string: string, 
  useAsciimath:boolean, 
  inline: boolean,
) {
  const svgString = renderSvg(string, useAsciimath, inline)
  fs.writeFileSync(svgFilename, svgString)
  return svgFilename
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
  const texString = useAsciimath ? asciiMathToLatex(string) : string
  const node = jax.convert(texString, {
      display: !inline,
      // em: argv.em,
      // ex: argv.ex,
      // containerWidth: argv.width
  })

  // Get the svg and modify its attributes
  const svg = node.children[0]
  const { viewBox } = svg.attributes
  const [ x, y, width, height ] = viewBox.split(' ').map(parseFloat).map(Math.round)
  svg.attributes.height = `${height}px`
  svg.attributes.width = `${width}px`
  const svgCode = adaptor.outerHTML(svg)
  console.log(svgCode)
  return svgCode
}

