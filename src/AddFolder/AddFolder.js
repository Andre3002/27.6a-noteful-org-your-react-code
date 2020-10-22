import React, { Component } from "react"
import ApiContext from "../ApiContext"
import config from "../config"
import "./AddFolder.css"

export default class AddFolder extends Component {
  static contextType = ApiContext

  onAddFolder = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const folder = { name }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {"content-type": "application/json",},
      body: JSON.stringify(folder),
    }).then((res) => {
      this.props.history.push("/")
    })
  }

  render() {
    return (
      <form id="add-folder" onSubmit={this.onAddFolder}>
        <label id="label"> Name </label>
        <input type="text" id="label" name="name" />
        <button type="submit">submit</button>
      </form>
    )
  }
}
