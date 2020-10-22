import React, { Component } from "react"
import ApiContext from "../ApiContext"
import config from "../config"
import "./AddFolder.css"
import ValidationError from "../ValidationError/ValidationError"

export default class AddFolder extends Component {
  static contextType = ApiContext

  state = {
    name: {
      value: "",
      touched: false,
    },
    error: null,
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } })
  }

  validateName() {
    const name = this.state.name.value.trim()
    if (name.length === 0) {
      return "The folder name can not be blank"
    }
  }

  onAddFolder = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const folder = { name }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        this.context.getData()
        this.props.history.push("/")
      })
      .catch((error) => {
        this.setState({
          error:error.message
        })
      })
  }

  render() {
    return (
      <form id="add-folder" onSubmit={this.onAddFolder}>
      {this.state.error}
        <label id="label"> Name </label>
        <input
          type="text"
          id="label"
          name="name"
          onChange={(e) => this.updateName(e.target.value)}
        />
        {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
        )}
        <button type="submit" disabled={this.validateName()}>
          submit
        </button>
      </form>
    )
  }
}
