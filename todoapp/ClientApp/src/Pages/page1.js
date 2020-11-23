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

    titlestyle = {
        textAlign: 'center',
        fontSize: '50px',
        padding: "10px 0px 50px 0px"
    }

    tablestyle = {
        textAlign: 'center',
        width: '1100px',
        fontSize: '20px'
    };

    buttonstyle = {
        margin: '20px',
        backgroundColor: 'pink',
        fontSize: '30px'
    }

    littlebuttonstyle = {
        margin: '2px',
        backgroundColor: 'pink',
        fontSize: '20px'
    }

    linkstyle = {
        fontSize: '25px',
        textAlign: 'right',
        margin: '25px'
    }

    
    column1 = {
        width: '60px',
        padding: '10px'
    }
    column2 = {
        width: '150px',
        padding: '10px'
    }
    column3 = {
        width: '500px',
        padding: '10px'
    }
    column4 = {
        width: '500px',
        padding: '10px'
    }
    column5 = {
        width: '150px',
        padding: '10px'
    }
    column6 = {
        width: '30px',
        padding: '10px'
    }

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
          <div style = {this.pagestyle}>
            <h1 style={this.titlestyle}>Todo List</h1>
            <div style = {{textAlign : 'right', position: 'absolute' , right: '0px', width: '400px'}}>
            <Link to="/page2" style={this.linkstyle}>Column View</Link>
            <div>
              <button onClick = {() => this.handleDeleteAll()} style= {this.buttonstyle}> Delete All</button>
              <button onClick={() => this.setState({ isOpen: true })} style={this.buttonstyle}>Add Task</button>
              <div>{this.renderFormAdd(this.state.todoId)} </div>     
              <div>{this.renderFormUpdate(this.state.todoId)} </div>
              </div>
            </div>
              <div style={{ textAlign: 'left', left: '10px' }}>
                  {tablecontent}          
              </div>
              
          </div>
      );
    }

    /* tablazat megjelenites*/
    renderTodoTable(todos) {
      
        return (
            <table style={this.tablestyle}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id} style={{ border: '2px solid  #b3d9ff'}} >
                        <td style={this.column1}>{todo.id}</td>
                        <td style={this.column2}>{todo.title}</td>
                        <td style={this.column3}>{todo.description}</td>
                        <td style={this.column4}>{todo.deadline}</td>
                        <td style={this.column5}>{todo.status}</td>
                        <td style={this.column6}>{todo.priority}</td>
                        <td><button onClick={() => this.handleDelete(todo.id)} style={this.littlebuttonstyle}>Delete</button></td>
                        <td><button onClick={() => this.setState({ isOpenUpdate: true, todoId: todo.id, TitleUpdating: todo.title })} style={this.littlebuttonstyle}>Update</button></td>
                    </tr>
                ))}
            </tbody>
        </table>);
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



