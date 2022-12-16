
import express from 'express'
import { jax } from './mathjax'
import asciiMathToLatex from 'asciimath-to-latex'
import fetch, { File } from 'node-fetch'




// Make a server to listen for requests
const jaxServer = express()

jaxServer.get("/", function (request, result: any) {
  result.send(
    `
    <h1>Welcome to the math server</h1>
    <p>Make typesetting requests to <a>/typeset</a></p>
    <form action="/typeset">
      String: <input type="text" name="string"><br>
      useAsciiMath: <input type="checkbox" name="asciimath" value="true"><br>
      inline: <input type="checkbox" name="inline" value="true"><br>
      html: <input type="checkbox" name="html" value="true"><br>
      <input type="submit" value="Submit">
    </form>
    <div id="result"></div>
  `
  )
})

// React to a request for a conversion
jaxServer.get('/typeset', function (request: any, result: any) {
  // Get the required parameters
  const { string, asciimath, html, inline } = request.query
  const useAsciimath = asciimath?.toLowerCase() == "true" 
  const htmlOutput = html?.toLowerCase() == "true" 
  const display = !(inline?.toLowerCase() == "true")

  // Make sure the sting is latex for conversion
  const texString = useAsciimath ? asciiMathToLatex(string) : string

  // Output the result as an svg
  const adaptor = jax.startup.adaptor
  const node = jax.tex2svg(texString, { display })
  const svg = node.children[0]
  const htmlCode = adaptor.outerHTML(svg)
  result.header("Content-Type","image/svg+xml")
    .send(htmlCode)
})


// Start the server
const mathJaxPort = 38245
jaxServer.listen(mathJaxPort, function () {
  console.log("Started the mathjax server")
})


export function typesetPath (string, asciimath, inline) {
  const path = `http://localhost:${mathJaxPort}/typeset`
  const asciimathQuery = asciimath ? 'true' : 'false'
  const inlineMathQuery = inline ? 'true' : 'false'
  const encodedString = encodeURIComponent(string)
  const query = [
    `string=${encodedString}`,
    `&asciimath=${asciimathQuery}`,
    `inline=${inlineMathQuery}`,
  ].join('&')
  const requestPath = `${path}?${query}`
  return requestPath
}


// Make the typesetting function
export async function typeset (string, asciimath, inline) {
  const requestPath = typesetPath(string, asciimath, inline)
  const result = await fetch(requestPath)
  return result
}








