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
            <div style = {this.pagestyle}>
                <h1 class="d-flex justify-content-center pt-3">Todo List</h1>
                <Link to="/page1" class="d-flex justify-content-left"><h3 class="ml-3 mt-2 ">List View</h3></Link>
              <div>
                    <button onClick={() => this.handleDeleteAll()} class="btn btn-danger ml-2 mb-3 mt-1"><h4> Delete All</h4></button>            
              </div>
                {tablecontent}
             </div>
        );
     }

     /* tablazat megjelenites*/
     renderTodoTable() {
         return (
             <div style={{width: '1500px'}}>
                 <div>
                     <div class = "row">
                         <div class="col-3"><h4>Done </h4><button class="btn btn-outline-danger m-1 mb-2 font-weight-bold " onClick={() => this.handleDeleteAllColumn("done")}> Delete All</button><button class="btn btn-outline-primary m-1 mb-2 font-weight-bold" onClick={() => this.setState({ isOpenDone: true })}>Add Task</button></div>
                         <div class="col-3"><h4>Cancelled </h4><button class="btn btn-outline-danger m-1 mb-2 font-weight-bold" onClick={() => this.handleDeleteAllColumn("cancelled")}> Delete All</button><button class="btn btn-outline-primary m-1 mb-2 font-weight-bold"  onClick={() => this.setState({ isOpenCan: true })}>Add Task</button></div>
                         <div class="col-3"><h4>Suspended </h4><button class="btn btn-outline-danger m-1 mb-2 font-weight-bold" onClick={() => this.handleDeleteAllColumn("suspended")}> Delete All</button><button class="btn btn-outline-primary m-1 mb-2 font-weight-bold"  onClick={() => this.setState({ isOpenSus: true })}>Add Task</button></div>
                         <div class="col-3"><h4> In progress</h4><button class="btn btn-outline-danger m-1 mb-2 font-weight-bold" onClick={() => this.handleDeleteAllColumn("In progress")}> Delete All</button><button class="btn btn-outline-primary m-1 mb-2 font-weight-bold"  onClick={() => this.setState({ isOpenInp: true })}>Add Task</button></div>
                     </div>
                 </div>
                 <div class="row">
                     {this.rendercolumn(this.state.done, 1)}
                     {this.rendercolumn(this.state.cancelled, 2)}
                     {this.rendercolumn(this.state.suspended, 3)}
                     {this.rendercolumn(this.state.inprogres, 4)}
                 </div>
                 <div class="row"style={{ verticalAlign: 'top' }}>
                     <div class="col-3"><div class="row">{this.renderFormD()} </div><div class="row">{this.renderFormUpdateD()} </div></div>
                     <div class="col-3"><div class="row">{this.renderFormC()} </div><div class="row">{this.renderFormUpdateC()} </div> </div>
                     <div class="col-3"><div class="row">{this.renderFormS()} </div><div class="row">{this.renderFormUpdateS()} </div> </div>
                     <div class="col-3"><div class="row">{this.renderFormI()} </div><div class="row">{this.renderFormUpdateI()} </div></div>
                 </div>
                
             </div>
         );
     }

     /*a tablazat egy oszlopanak megjelenitese */
     rendercolumn(todoarr, num) {
         return (<div class="col-3 align-items-top" >
             {todoarr.map(todo => (
                 <div class= "row d-flex align-items-center" style={{ border: '2px solid #ff99e6', backgroundColor: '#eed2d0'}} key={todo.id}  >
                     <div class="col-2"><h6><small>{todo.title}</small></h6></div>
                     <div class="col-3"><h6><small>{todo.description}</small></h6></div>
                     <div class="col-2"><h6><small>{todo.deadline}</small></h6></div>
                     <div class="col-3 align-self-start justify-content-center mt-2"><h6><small>{todo.status}</small></h6></div>
                     <div class="col-2">
                         <div class="row"><button onClick={() => this.handleDelete(todo.id, num)} class="btn btn-outline-danger btn-sm mb-1 mt-1"><h6><small>Delete</small></h6></button></div>
                         <div class="row"><button onClick={() => this.setStateUpdate(num, todo.id, todo.title)} class="btn btn-outline-info btn-sm mt-1 mb-1"><h6><small>Update</small></h6></button></div>
                    </div>
                 </div>
             ))}
         </div>);
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
         return (<div class="col-12 m-1"><Form X={() => this.handleCancel(num)} cancel={() => this.handleCancel(num)}  status={status} title={"Add new Task"}></Form></div>);
     }


     /* Update form*/
     renderFormUpdate(num) {
         var Title = "";
         var ID = "";
         if (num == 1) { Title = this.state.TitleDUpdate; ID = this.state.dId}
         else if (num == 2) { Title = this.state.TitleCUpdate; ID = this.state.cId }
         else if (num == 3) { Title = this.state.TitleSUpdate; ID = this.state.sId}
         else if (num == 4) { Title = this.state.TitleIUpdate; ID = this.state.iId }
         return (<div class="col-12 m-1"><FormUpdate X={() => this.handleCancelUpdate(num)} todoId={ID} TitleUpdating={Title} cancel={() => this.handleCancelUpdate(num)} ></FormUpdate></div>);
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


