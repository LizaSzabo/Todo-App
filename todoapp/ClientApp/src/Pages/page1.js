import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router-dom/Link';
import Form from './Form';
import FormUpdate from './FormUpdate';

export default class TodoList extends React.Component{
  constructor(props){
    super(props);
   
    this.state={
      todos:[],
      isOpen : false,
      isOpenUpdate : false,
        uri: 'api/Todoes',
        todoId: 0,
        TitleUpdating: ""
      };
    }


    pagestyle = {
        backgroundColor: '#b3fff0',
        height: 2000,

    };

    tablestyle = {
        width: '1100px'
    };


    /*Adatok beolvasasa*/
    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await fetch('api/Todoes');
        const data = await response.json();
        data.sort(this.compare);
        this.setState({ todos: data });
       
    }

    /*osszes elem torlese */
    handleDeleteAll = () => {
        var arr = this.state.todos;
        var i;
        for (i = 0; i < arr.length; ++i) {
            var todoid = arr[i].id;
            fetch('api/Todoes/' + todoid, { method: 'delete' })
                .then(data => {
                    this.setState({
                        data: this.state.todos.filter((record) => {
                            return record.ID != todoid;
                        })
                    })
                })
        }

        const todos = this.state.todos.filter(todo => todo.id < 0);
        this.setState({ todos: todos, done: todos, suspended: todos, cancelled: todos, inprogres: todos });
    }

    /* adott elem torlese*/
    handleDelete = (todoID) => {
        fetch('api/Todoes/' + todoID, { method: 'delete' })
            .then(data => {
                this.setState({
                    data: this.state.todos.filter((record) => {
                        return record.ID != todoID;
                    })
                })
            })
    const todos = this.state.todos.filter(todo => todo.id !== todoID);
    this.setState({ todos});
    }


    compare = (a, b) => {
        if (a.priority < b.priority) {
        return -1;
        }
        if (a.priority > b.priority) {
        return 1;
    }
    return 0;
    }

    /* megjelenites*/
    render() {
        let tablecontent = this.renderTodoTable(this.state.todos);
      
      return(
          <div style={this.pagestyle} >
              <h1 class="text-center pt-3 pb-5">Todo List</h1>
              <div class="d-flex align-items-start">
                  <div class="text-left d-inline-block mr-3">
                         {tablecontent}
                  </div>
                  <div class=" text-right d-inline-block ml-5" >
                      <Link to="/page2"><h3 class="mr-5 mb-2 " >Column View</h3></Link>
                      <div>
                             <button onClick = {() => this.handleDeleteAll()} class="btn btn-danger mr-3 mb-3"><h4> Delete All</h4></button>
                             <button onClick={() => this.setState({ isOpen: true })} class="btn btn-primary mr-3 mb-3"><h4>Add Task</h4></button>
                             <div>{this.renderFormAdd(this.state.todoId)} </div>     
                             <div>{this.renderFormUpdate(this.state.todoId)} </div>
                      </div>
                  </div>
              </div>
          </div>
      );
    }

    /* tablazat megjelenites*/
    renderTodoTable(todos) {
      
        return (
            <div style={ this.tablestyle}>
                <div class= "row ">
                    <div class= "col-1 d-flex justify-content-center"><h4>ID</h4></div>
                    <div class="col-2 d-flex justify-content-center"><h4>Title</h4></div>
                    <div class="col-2 d-flex justify-content-center"><h4>Description</h4></div>
                    <div class="col-2 d-flex justify-content-center"><h4>Deadline</h4></div>
                    <div class="col-2 d-flex justify-content-center"><h4>Status</h4></div>
                    <div class="col-1 d-flex justify-content-center"><h4>Priority</h4></div>
            </div>
            <div >
                    {todos.map(todo => (
                        <div class= "row d-flex align-items-center" key={todo.id} style={{ border: '2px solid  #b3d9ff'}} >
                            <div class="col-1 d-flex justify-content-center"><h5><small>{todo.id}</small></h5></div>
                            <div class="col-2 d-flex justify-content-center"><h4><small>{todo.title}</small></h4></div>
                            <div class="col-2 d-flex justify-content-center"><h5><small>{todo.description}</small></h5></div>
                            <div class="col-2 d-flex justify-content-center"><h5><small>{todo.deadline}</small></h5></div>
                            <div class="col-2 d-flex justify-content-center"><h4><small>{todo.status}</small></h4></div>
                            <div class="col-1 d-flex justify-content-center"><h5><small>{todo.priority}</small></h5></div>
                            <div class="col-1 d-flex justify-content-center"><button onClick={() => this.handleDelete(todo.id)} class= "btn btn-outline-danger font-weight-bold">Delete</button></div>
                            <div class="col-1 d-flex justify-content-center"><button onClick={() => this.setState({ isOpenUpdate: true, todoId: todo.id, TitleUpdating: todo.title })} class="btn btn-outline-info font-weight-bold">Update</button></div>
                    </div>
                ))}
            </div>
        </div>);
    }

    /*Add Form*/
    renderFormAdd() {
        if (this.state.isOpen)
            return (<Form X={this.handleX} cancel={this.handleCancel}  status={""}></Form>);
        else return (null);
    }

    handleX = () => {
        this.setState({ isOpen: false });
    }

   
    /*Update Form*/
    renderFormUpdate() {
        if (this.state.isOpenUpdate)
            return (<FormUpdate X={this.handleCancelUpdate} todoId={this.state.todoId} TitleUpdating={this.state.TitleUpdating} cancel={this.handleCancelUpdate}></FormUpdate>);
        else return (null);
    }

    /*Form bezarasa */
    handleCancel = () => {
        this.setState({ isOpen: false });
        this.getData()
    }

    handleCancelUpdate = () => {
        this.setState({ isOpenUpdate: false });
        this.getData()
    }

}



