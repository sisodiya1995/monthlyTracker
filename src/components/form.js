import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisplay: false,
      data: "",
      month: this.getMonth(),
      todos: [],
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let value = this.state.data;
    console.log(this.state.data);
    //alert(`trackert ${this.state.data}`)
    this.setState({
      isDisplay: true,
      todos: this.state.todos.concat(value),
      data: "",
    });
  };

  componentDidMount() {
    if (localStorage.todos) {
      this.setState(JSON.parse(localStorage.state) || {});
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  //before moving to any component update  the data
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  // once data is updated also update  the localStorage
  handleUpdateLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleRemove = (event) => {
    let id = event.target.id;
    let filterTodos = this.state.todos.filter((p) => p !== id);
    this.setState({
      todos: filterTodos,
    });
  };

  getMonth = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let name = month[d.getMonth()];
    return name;
  };
  render() {
    return (
      <>
        {this.state.isDisplay === true ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="data"
                placeholder="Enter somthing"
                onChange={this.handleChange}
                value={this.state.data}
              />
              <button type="submit" value="submit">
                Add Activity
              </button>
            </form>
            <div>
              {this.state.todos.map((t) => {
                return (
                  <>
                    <button
                      id={t}
                      onClick={(event) => {
                        this.handleRemove(event);
                      }}
                    >
                      X
                    </button>
                    <p>{t}</p>
                    <p>{this.state.month}</p>
                    <div>
                      {" "}
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31,
                      ].map((d) => {
                        return (
                          <>
                            <button>{d}</button>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="data"
                placeholder="Enter somthing"
                onChange={this.handleChange}
                value={this.state.data}
              />
              
              <button type="submit" value="submit">
                Add Activity
              </button>
            </form>
           
           

          </div>
        )}
      </>
    );
  }
}

export default Form;
