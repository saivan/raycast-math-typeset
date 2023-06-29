
import { ActionPanel, List, Action, Detail } from "@raycast/api"
import { useEffect, useState } from "react"
import { pngFilename, svgFilename, exportPngImage, exportSvgImage, renderSvg, typesetBase64Svg } from "./math-server"
import { Clipboard } from "@raycast/api";

export default function Command( props: { }) {
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(true)

  async function sleep (ms: number) {
    return new Promise(done => {
      setTimeout(done, ms)
    })
  }

  function getMarkdown(asciimath: boolean, inline: boolean) {
    const svgBase64 = typesetBase64Svg(searchText, asciimath, inline)
    const markdown = `![${searchText}](${svgBase64})`
    return markdown
  }

  function getActions(asciimath: boolean, inline: boolean) {
    // Then update them
    const actionPanel = 
      <ActionPanel title="Save Mathematics">
        <Action
          title="Copy the svg to the clipboard"
          onAction={async () => {
            exportSvgImage(searchText, asciimath, inline)
            Clipboard.copy({file: svgFilename })
          }}
        />
        <Action
          title="Copy a png to the clipboard"
          onAction={async () => {
            exportSvgImage(searchText, asciimath, inline)
            exportPngImage(searchText, asciimath, inline)
            await sleep(1000)
            Clipboard.copy({file: pngFilename })
            console.log(svgFilename, pngFilename)
          }}
        />
        <Action.OpenInBrowser 
          url="https://github.com/raycast/extensions/pull/1" />
      </ActionPanel>
    return actionPanel
  }

  return (
    <List 
      isShowingDetail
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Render Equation"
      searchBarPlaceholder="Type your equation markdown"
    >
      <List.Item
        title="AsciiMath"
        subtitle="display"
        detail={<List.Item.Detail markdown={ getMarkdown(true, false) } />} 
        actions={getActions(true, false)}
      />
      <List.Item
        title="Latex"
        subtitle="display"
        detail={<List.Item.Detail markdown={ getMarkdown(false, false) } />} 
        actions={getActions(false, false) }
      />
      <List.Item
        title="AsciiMath"
        subtitle="inline"
        detail={ <List.Item.Detail markdown={ getMarkdown(true, true) } />} 
        actions={getActions(true, true) }
      />
      <List.Item
        title="Latex"
        subtitle="inline"
        detail={<List.Item.Detail markdown={ getMarkdown(false, true) } />} 
        actions={getActions(true, false) }
      />
    </List>
  ) }
