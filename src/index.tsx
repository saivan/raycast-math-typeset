
import { ActionPanel, List, Action } from "@raycast/api"
import { useEffect, useState } from "react"
import { exportPngImage, exportSvgImage, renderSvg, typesetBase64Svg } from "./math-server"

export default function Command( props: { }) {
  const [searchText, setSearchText] = useState("")

  function getMarkdown(asciimath: boolean, inline: boolean) {
    const svgBase64 = typesetBase64Svg(searchText, asciimath, inline)
    const markdown = `![${searchText}](${svgBase64})`
    return markdown
  }

  function getActions(asciimath: boolean, inline: boolean) {
    const actionPanel = 
      <ActionPanel title="Save Mathematics">
        <Action.CopyToClipboard
          title="Copy the svg to the clipboard"
          content={{file: exportSvgImage(searchText, asciimath, inline)}}
        />
        <Action.CopyToClipboard
          title="Copy a png to the clipboard"
          content={{file: exportPngImage(searchText, asciimath, inline)}}
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
        detail={ <List.Item.Detail markdown={getMarkdown(true, false)} /> }
        actions={getActions(true, false) }
      />
      <List.Item
        title="Latex"
        subtitle="display"
        detail={ <List.Item.Detail markdown={getMarkdown(false, false)} /> }
        actions={getActions(false, false) }
      />
      <List.Item
        title="AsciiMath"
        subtitle="inline"
        detail={ <List.Item.Detail markdown={getMarkdown(true, true)} /> }
        actions={getActions(true, true) }
      />
      <List.Item
        title="Latex"
        subtitle="inline"
        detail={ <List.Item.Detail markdown={getMarkdown(false, true)} /> }
        actions={getActions(true, false) }
      />
    </List>
  ) }
