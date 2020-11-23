import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { Route } from 'react-router-dom';
import Form from './Form';
import FormUpdate from './FormUpdate';

 export default class ColumnView extends Component{
    constructor(props){
        super(props);
        
        this.state={
          done:[],
          cancelled:[],
          todos:[],
          inprogres:[],
            suspended: [],
            isOpenDone: false,
            isOpenSus: false,
            isOpenInp: false,
            isOpenCan: false,
            isOpenDoneUpdate: false,
            isOpenSusUpdate: false,
            isOpenInpUpdate: false,
            isOpenCanUpdate: false,
            dId: 0, sId: 0, cId: 0, iId: 0,
            TitleDUpdate: "",
            TitleCUpdate: "",
            TitleSUpdate: "",
            TitleIUpdate: ""
        };
       
      }

     /*design elemek*/
     pagestyle = {
         backgroundColor: '#ffe6cc',
         height: 2000
     };

     style = {
         textAlign: 'top',
         width: '1500px'
     };

     buttonstyle = {
         margin: '3px',
         backgroundColor: '#b3fff0',
         fontSize: '15px'
     };

     groupbuttonstyle = {
         margin: '4px',
         backgroundColor: '#ffaaf0',
         fontSize: '20px'
     };

     pagebuttonstyle = {
         margin: '20px',
         backgroundColor: '#cab0ff',
         fontSize: '30px'
     }

     linkstyle = {
         fontSize: '25px',
         textAlign: 'left',
         margin: '20px'
     }
/*desing elemek*/


     compare = (a, b) => {
         if (a.priority < b.priority) {
             return -1;
         }
         if (a.priority > b.priority) {
             return 1;
         }
         return 0;
     }

     /*Adatok kiolvasasa a DB-bol*/ 
     componentDidMount() {
         this.getData();
         
     }

     async getData() {
         this.setState({ todos: [], done: [], suspended: [], cancelled: [], inprogres: [] });
         const response = await fetch('api/Todoes');
         const data = await response.json();
         data.sort(this.compare);

         this.setState({ todos: data });
         for (const [index, value] of data.entries()) {
             if (this.state.todos[index].status === "done") {
                 this.separateData(this.state.done, value, index);
             }

             if (this.state.todos[index].status === "cancelled") {
                 this.separateData(this.state.cancelled, value, index);
             }

             if (this.state.todos[index].status === "In progress") {
                 this.separateData(this.state.inprogres, value, index);
             }

             if (this.state.todos[index].status === "suspended") {
                 this.separateData(this.state.suspended, value, index);
             }

         };
     }

     /*adatok oszlopokra bontasa statuszuk szerint*/
     separateData = (arr, value, index) => {
         this.setState(state => {
             const list = arr.push(value);
             return {
                 list,
                 value: this.state.todos[index],
             };
         });
     }

     /*torles*/
     handleDelete = (todoID, num) => {
         fetch('api/Todoes/' + todoID, { method: 'delete' })
             .then(data => {
                 this.setState({
                     data: this.state.todos.filter((record) => {
                         return record.ID != todoID;
                     })
                 })
             })
         const todos = this.state.todos.filter(todo => todo.id !== todoID);
         this.setState({ todos });
         if (num == 1) {
             const done = this.state.done.filter(d => d.id !== todoID);
             this.setState({ done });
         }
         else if (num == 4) {
             const inprogres = this.state.inprogres.filter(i => i.id !== todoID);
             this.setState({ inprogres});
         }
         else if (num == 3) {
             const suspended = this.state.suspended.filter(s => s.id !== todoID);
             this.setState({ suspended });
         }
         else if (num == 2) {
             const cancelled = this.state.cancelled.filter(c => c.id !== todoID);
             this.setState({ cancelled});
         }
     }

     /*osszes elem torlese*/ 
     handleDeleteAll = () => {
         var arr = this.state.todos;
         var i;
         for (i = 0; i < arr.length; ++i) {
             var todoid = arr[i].id;
             fetch('api/Todoes/' + todoid, { method: 'delete' })
                 .then(data => {
                     this.setState({
                         data: this.state.todos.filter((record) => {
                             return record.ID != todoid ;
                         })
                     })
                 })
         }

         const todos = this.state.todos.filter(todo => todo.id < 0);
         this.setState({ todos: todos, done: todos, suspended: todos, cancelled: todos, inprogres:todos });
     }

     /*adott statusu elemek torlese*/
     handleDeleteAllColumn = (column) => {
         
         var arr;
         if (column == "done") {
             const todos = this.state.done.filter(todo => todo.Title == "");
             this.setState({ done: todos });
             arr = this.state.done;
         }
         else if (column == "In progress") {
             const todos = this.state.inprogres.filter(todo => todo.Title == "");
             this.setState({ inprogres: todos });
             arr = this.state.inprogres;
         }
         else if (column == "suspended") {
             const todos = this.state.suspended.filter(todo => todo.Title == "");
             this.setState({ suspended: todos });
             arr = this.state.suspended;
         }
         else if (column == "cancelled") {
             const todos = this.state.cancelled.filter(todo => todo.Title == "");
             this.setState({ cancelled: todos });
             arr = this.state.cancelled;
         }
         var i;
         for (i = 0; i < arr.length; ++i) {
             var todoid = arr[i].id;
             fetch('api/Todoes/' + todoid, { method: 'delete' })
                 .then(data => {
                     this.setState({
                         data: arr.filter((record) => {
                             return record.Status != column;
                         })
                     })

                 });
         }
         
     }

     /*megjelenites */
     render() {
         let tablecontent = this.renderTodoTable();
        return(
            <div style style = {this.pagestyle}>
              <h1 style={{  textAlign: 'center', fontSize : '50px'}}>Todo List</h1>
              <Link to="/page1" style={this.linkstyle}>List View</Link>
              <div>
                    <button onClick={() => this.handleDeleteAll()} style = {this.pagebuttonstyle}> Delete All</button>            
              </div>
                {tablecontent}
             </div>
        );
     }

     /* tablazat megjelenites*/
     renderTodoTable() {
         return (
             <table style={this.style}>
                 <thead>
                     <tr style={{ fontSize: '20px' }}>
                         <th>Done <button style={this.groupbuttonstyle} onClick={() => this.handleDeleteAllColumn("done")}> Delete All</button><button style={this.groupbuttonstyle} onClick={() => this.setState({ isOpenDone: true })}>Add Task</button></th>
                         <th>Cancelled <button style={this.groupbuttonstyle} onClick={() => this.handleDeleteAllColumn("cancelled")}> Delete All</button><button style={this.groupbuttonstyle} onClick={() => this.setState({ isOpenCan: true })}>Add Task</button></th>
                         <th>Suspended <button style={this.groupbuttonstyle} onClick={() => this.handleDeleteAllColumn("suspended")}> Delete All</button><button style={this.groupbuttonstyle} onClick={() => this.setState({ isOpenSus: true })}>Add Task</button></th>
                         <th>In progress<button style={this.groupbuttonstyle} onClick={() => this.handleDeleteAllColumn("In progress")}> Delete All</button><button style={this.groupbuttonstyle} onClick={() => this.setState({ isOpenInp: true })}>Add Task</button></th>
                     </tr>
                 </thead>
                 <tbody>
                     {this.rendercolumn(this.state.done, 1)}
                     {this.rendercolumn(this.state.cancelled, 2)}
                     {this.rendercolumn(this.state.suspended, 3)}
                     {this.rendercolumn(this.state.inprogres, 4)}
                     <tr style={{ verticalAlign: 'top' }}>
                         <td><div>{this.renderFormD()} </div><div>{this.renderFormUpdateD()} </div></td>
                         <td><div>{this.renderFormC()} </div><div>{this.renderFormUpdateC()} </div> </td>
                         <td><div>{this.renderFormS()} </div><div>{this.renderFormUpdateS()} </div> </td>
                         <td><div>{this.renderFormI()} </div><div>{this.renderFormUpdateI()} </div></td>
                     </tr>
                 </tbody>
             </table>
         );
     }

     /*a tablazat egy oszlopanak megjelenitese */
     rendercolumn(todoarr, num) {
         return (<td style={{ textAlign: 'top', width: '375px', verticalAlign: 'top' }}>
             {todoarr.map(todo => (
                 <tr style={{ border: '2px solid #ff99e6', backgroundColor: '#eed2d0'}} key={todo.id}  >
                     <td>{todo.title}</td>
                     <td>{todo.description}</td>
                     <td>{todo.deadline}</td>
                     <td>{todo.status}</td>
                     <button onClick={() => this.handleDelete(todo.id, num)} style={this.buttonstyle}>Delete</button>
                     <button onClick={() => this.setStateUpdate(num, todo.id, todo.title)} style={this.buttonstyle}>Update</button>
                 </tr>
             ))}
         </td>);
     }

     /* state frissites updated elem fuggvenyeben*/
     setStateUpdate = (num, id, title) => {
         if (num == 1) this.setState({ TitleDUpdate: title, dId: id, isOpenDoneUpdate: true });
         else if (num == 2) this.setState({ TitleCUpdate: title, cId: id, isOpenCanUpdate: true  });
         else if (num == 3) this.setState({ TitleSUpdate: title, sId: id, isOpenSusUpdate: true  });
         else if (num == 4) this.setState({ TitleIUpdate: title, iId: id, isOpenInpUpdate: true  });
     }

     /*Add form */
     renderForm(num) {
         var status = "";
         if (num == 1) status = "done";
         else if (num == 2) status = "cancelled";
         else if (num == 3) status = "suspended";
         else if (num == 4) status = "In progress";
         return (<Form X={() => this.handleCancel(num)} cancel={() => this.handleCancel(num)}  status={status} title={"Add new Task"}></Form>);
     }


     /* Update form*/
     renderFormUpdate(num) {
         var Title = "";
         var ID = "";
         if (num == 1) { Title = this.state.TitleDUpdate; ID = this.state.dId}
         else if (num == 2) { Title = this.state.TitleCUpdate; ID = this.state.cId }
         else if (num == 3) { Title = this.state.TitleSUpdate; ID = this.state.sId}
         else if (num == 4) { Title = this.state.TitleIUpdate; ID = this.state.iId }
         return (<FormUpdate X={() => this.handleCancelUpdate(num)} todoId={ID} TitleUpdating={Title} cancel={() => this.handleCancelUpdate(num)} ></FormUpdate>);
     }

     /* Add form bezarasa*/
     handleCancel = (num)=>{
         if (num == 1) this.setState({ isOpenDone: false });
         else if (num == 2) this.setState({ isOpenCan: false });
         else if (num == 3) this.setState({ isOpenSus: false });
         else if (num == 4) this.setState({ isOpenInp: false });
         this.getData()
     }

 /* Update form bezarasa*/
     handleCancelUpdate = (num) => {
         if (num == 1) this.setState({ isOpenDoneUpdate: false });
         else if (num == 2) this.setState({ isOpenCanUpdate: false });
         else if (num == 3) this.setState({ isOpenSusUpdate: false });
         else if (num == 4) this.setState({ isOpenInpUpdate: false });
         this.getData()
     }

  /* hova dobja fel az Add formot*/
     renderFormD() {
         if (this.state.isOpenDone) {           
             return  this.renderForm(1) 
         }
         else return (null);
     }
     renderFormC() {
         if (this.state.isOpenCan) {
             return this.renderForm(2)
         }
         else return (null);
     }
     renderFormS() {
         if (this.state.isOpenSus) {
             return this.renderForm(3)
         }
         else return (null);
     }
     renderFormI() {
         if (this.state.isOpenInp) {
             return this.renderForm(4)
         }
         else return (null);
     }
 /* hova dobja fel az Update formot*/
     renderFormUpdateD() {
         if (this.state.isOpenDoneUpdate) {
             return this.renderFormUpdate(1)
         }
         else return (null);
     }

     renderFormUpdateC() {
         if (this.state.isOpenCanUpdate) {
             return this.renderFormUpdate(2)
         }
         else return (null);
     }

     renderFormUpdateS() {
         if (this.state.isOpenSusUpdate) {
             return this.renderFormUpdate(3)
         }
         else return (null);
     }

     renderFormUpdateI() {
         if (this.state.isOpenInpUpdate) {
             return this.renderFormUpdate(4)
         }
         else return (null);
     }
}


