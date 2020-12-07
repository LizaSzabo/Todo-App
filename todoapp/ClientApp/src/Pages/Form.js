import React from 'react';
import ReactDOM from 'react-dom';


export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],

            isOpenUpdate: false,
            uri: 'api/Todoes',
            todoId: 0,
            TitleUpdating: ""
        };

        this.hadleSave = this.handleSave.bind(this);
    }

    formstyle = {
        backgroundColor: 'pink',
        fontSize: '20px',
        border: '2px solid blue',
        textAlign: 'left'
    }

    render() {
        var hidden_value = false;
        var val = "";
        if (this.props.status === "") hidden_value = false;
        else { hidden_value = true; val = this.props.status }
        return (
            <div style={this.formstyle}>
                <div class=" d-flex justify-content-end"><button class="btn btn-danger" onClick={() => this.props.X()}><h3> x </h3></button></div>
                <h1 class=" d-flex justify-content-center">Add new Task</h1>
                <form onSubmit={this.handleSave}>
                    <input type="hidden" id="id" />
                    <div class="pl-3 pr-2">
                        <label class="pr-2" for="title"><h5>Title:  </h5></label>
                        <input type="text" class="from-control" name="title" id="title" required />
                    </div>
                    <div class="pl-3 pr-2">
                        <label class="pr-2" for="desc"><h5>Description:  </h5></label>
                        <textarea type="text" class="from-control" name="description" id="desc" cols="10" wrap="hard" placeholder="not required" />
                    </div>
                    <div class="pl-3 pr-2">
                        <label class="pr-2" for="dead"><h5>Deadline:  </h5></label>
                        <input type="date" class="from-control" name="deadline" id="dead" required />
                    </div>
                    <div class="pl-3 pr-2">
                        <label class="pr-2" for="status" hidden={hidden_value}><h5>Status:  </h5></label>
                        <select class="from-control" name="status" id="status" hidden={hidden_value} required={!hidden_value}>
                            <option hidden={!hidden_value} >{val}</option>
                            <option>done</option>
                            <option>In progress</option>
                            <option>cancelled</option>
                            <option>suspended</option>
                        </select>
                    </div>
                    <div class="pl-3 pr-2">
                        <label class="pr-2" for="prior"><h5>Priority:  </h5></label>
                        <input type="number" class="from-control" name="priority" id="prior" min="1" required />
                    </div>
                    <div class="pl-3 pr-2">
                        <button class="btn btn-success m-2"  type="submit"  >Save</button>
                        <button class="btn btn-secondary m-2" onClick={() => this.props.cancel()}>Add</button>
                    </div>

                </form>
            </div>
        )


    }

    /*Adatok elmentese adatbazisba*/
    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        var response = fetch('api/Todoes', { method: 'POST', body: data });
    }

}