import React, { Component } from "react"
import ApiContext from "../ApiContext"
import config from "../config"

export default class AddNote extends Component {
  static contextType = ApiContext

  onAddNote = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const content = e.target.content.value
    const folderId = e.target.folderId.value
    const note = { name, content, folderId}

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    }).then((res) => {
      this.props.history.push("/")
    })
  }

  render() {
    return (
      <form id="add-note" onSubmit={this.onAddNote}>
        <label id="label"> Name </label>
        <input type="text" id="label" name="name" />
        <label id="content"> Content </label>
        <input type="text" id="content" content="content" />
        <select name="folderId">
            {
                this.context.folders.map(folder=><option value={folder.id}>{folder.name}</option>)
            }
        </select>
        <button type="submit">submit</button>
      </form>
    )
  }
}
