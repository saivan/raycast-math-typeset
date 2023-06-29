
import { jax, adaptor } from './mathjax'
import asciiMathToLatex from 'asciimath-to-latex'
import fs from 'fs'
import os from 'os'
import path from 'path'
const { execSync } = require('child_process')
import { useExec } from "@raycast/utils"


const directory = os.tmpdir()
export const svgFilename = path.join(directory, `math.svg`)
export const pngFilename = path.join(directory, `math.png`)



export function exportPngImage (
  string: string,
  useAsciimath: boolean,
  inline: boolean,
) {
  exportSvgImage(string, useAsciimath, inline)
  const convert = `/opt/homebrew/bin/convert`
  const command = `${convert} -background none ${svgFilename} ${pngFilename}`
  console.log(command)
  const execResult = execSync(command)
  return execResult.toString()
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
  return svgCode
}

