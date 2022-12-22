
import { Detail, List, render } from "@raycast/api"
import { useEffect, useState } from "react"

import { renderSvg, typesetPath } from "./math-server"



export default function Command( props: { }) {
  const [searchText, setSearchText] = useState("")
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
        detail={
          <List.Item.Detail 
            markdown={`![${searchText}](${renderSvg(searchText, true, false)})`} 
          />
        }
      />
      <List.Item
        title="Latex"
        subtitle="display"
        detail={
          <List.Item.Detail 
            markdown={`![${searchText}](${renderSvg(searchText, false, false)})`} 
          />
        }
      />
      <List.Item
        title="AsciiMath"
        subtitle="inline"
        detail={
          <List.Item.Detail 
            markdown={`<img src="${renderSvg(searchText, true, true)}" />`}
          />
        }
      />
      <List.Item
        title="Latex"
        subtitle="inline"
        detail={
          <List.Item.Detail 
            markdown={`<img src="${renderSvg(searchText, false, true)}" />`}
          />
        }
      />
    </List>
  ) }
