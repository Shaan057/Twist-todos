/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable */

import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todo from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: uuidv4(),
    title: 'Learn JavaScript',
    updated: 0,
  },
  {
    id: uuidv4(),
    title: 'Learn Html',
    updated: 0,
  },
  {
    id: uuidv4(),
    title: 'Read Blogs',
    updated: 0,
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    userInput: '',
    editId: null,
    completedIds: [],
  }

  onChangeInput = event => {
    this.setState({ userInput: event.target.value })
  }

  onFormSubmit = event => {
    event.preventDefault()
    const { userInput, todoList } = this.state

    const match = userInput.match(/^(.*?)(\d+)$/)
    let number = null
    let string
    if (match) {
      const remainingString = match[1]
      const lastPartIsNumber = match[2]
      string = remainingString
      number = lastPartIsNumber
    } else {
      string = userInput
    }

    if (number !== null && number > 0) {
      const newTodoList = [...todoList]

      for (let a = 0; a < Number(number); a++) {
        const newTodo = {
          id: uuidv4(),
          title: string,
          updated: 0,
        }
        newTodoList.push(newTodo)
      }
      this.setState({
        todoList: newTodoList,
        userInput: '',
        editId: null,
      })
    } else {
      const newTodo = {
        id: uuidv4(),
        title: userInput,
        updated: 0,
      }

      this.setState(prev => ({
        todoList: [...prev.todoList, newTodo],
        userInput: '',
        editId: null,
      }))
    }
  }


  onDelete = id => {
    const { todoList } = this.state
    const filteredTodoList = todoList.filter(each => each.id !== id)
    this.setState({ todoList: filteredTodoList })
  }

  onEditButtonClicked = id => {
    const { editId } = this.state
    if (editId === null) {
      this.setState((prev) => ({
        todoList: prev.todoList.map((each) => {
          if (each.id === id) {
            return {
              ...each,
              updated: each.updated + 1
            }
          }
          return each
        }),
        editId: id,
      }))
    }
  }

  onSaveButtonClicked = () => {
    this.setState({
      editId: null,
    })
  }

  onUpdateTodo = todo => {
    const { editId, todoList } = this.state
    const updatedTodoList = todoList.map(each => {
      if (each.id === editId) {
        return {
          ...each,
          title: todo,
        }
      }
      return each
    })
    this.setState({
      todoList: updatedTodoList,
    })
  }

  onClickCheckedInput = (id, status) => {
    const { completedIds } = this.state
    if (status) {
      this.setState(prev => ({
        completedIds: [...prev.completedIds, id],
        // editId: null,
      }))
    } else {
      const uncompletedIds = completedIds.filter(each => each !== id)
      this.setState({
        completedIds: uncompletedIds,
        // editId: null,
      })
    }
  }

  render() {
    const { todoList, userInput, editId, completedIds } = this.state
    return (
      <div className="bg-container">
        <div className="card">
          <form className="input-todos" onSubmit={this.onFormSubmit}>
            <fieldset className="field-set">
              <legend className="legend">Add Todo&apos;s</legend>
              <div className="inputs-container">
                <input
                  className="todos-input-box"
                  value={userInput}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="add todo"
                  required
                  onChange={this.onChangeInput}
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </fieldset>
          </form>
          <ul className="list-container">
            {todoList.map(each => (
              <Todo
                key={each.id}
                todo={each}
                onDelete={this.onDelete}
                onEditButtonClicked={this.onEditButtonClicked}
                onSaveButtonClicked={this.onSaveButtonClicked}
                onClickCheckedInput={this.onClickCheckedInput}
                isCompleted={completedIds.includes(each.id)}
                editClicked={editId === each.id}
                test={editId !== each.id}
                onUpdateTodo={this.onUpdateTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
