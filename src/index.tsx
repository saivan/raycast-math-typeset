
import { Detail, List, render } from "@raycast/api"
import { useEffect, useState } from "react"

import { renderSvg, typesetPath } from "./math-server"



export default function Command( props: { }) {
  const [searchText, setSearchText] = useState("");

  const md = `
  # This is the image
  <img src="${renderSvg(searchText, true, true)}" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png" />
  `
  console.log(md)

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
        subtitle="inline"
        icon={renderSvg(searchText, true, true)} 
        detail={
          <List.Item.Detail 
            markdown={md} 
          />
        }
      />
      <List.Item
        title="Latex"
        subtitle="inline"
        detail={
          <List.Item.Detail 
            markdown={`![${searchText}](${typesetPath(searchText, false, true)})`} 
          />
        }
      />
      <List.Item
        title="AsciiMath"
        subtitle="display"
        detail={
          <List.Item.Detail 
            markdown={`![${searchText}](${typesetPath(searchText, true, false)})`} 
          />
        }
      />
      <List.Item
        title="Latex"
        subtitle="display"
        detail={
          <List.Item.Detail 
            markdown={`![${searchText}](${typesetPath(searchText, false, false)})`} 
          />
        }
      />
    </List>
  ) }
