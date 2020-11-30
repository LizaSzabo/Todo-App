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
    closeButtonstyle = {
        textAlign: 'right',
        fontSize: '35px'
    }

    formbuttonstyles = {
        margin: "10px",
        fontSize: "24px",
        padding: "5px 20px"
    }

    inputstyle = {
        paddingLeft: "30px"
    }


    labelstyle = {
        paddingRight: "10px",
        fontWeight: "500"
    }



    render() {
        var hidden_value = false;
        var val = "";
        if (this.props.status === "") hidden_value = false;
        else { hidden_value = true; val = this.props.status }
        return (
            <div style={this.formstyle}>
                <div style={this.closeButtonstyle}><button onClick={() => this.props.X()}> x </button></div>
                <h1 style={{ textAlign: 'center' }}>Add new Task</h1>
                <form onSubmit={this.handleSave}>
                    <input type="hidden" id="id" />
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="title">Title:  </label>
                        <input type="text" class="from-control" name="title" id="title" required />
                    </div>
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="desc">Description:  </label>
                        <textarea type="text" class="from-control" name="description" id="desc" cols="20" wrap="hard" placeholder="not required" />
                    </div>
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="dead">Deadline:  </label>
                        <input type="date" class="from-control" name="deadline" id="dead" required />
                    </div>
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="status" hidden={hidden_value}>Status:  </label>
                        <select class="from-control" name="status" id="status" hidden={hidden_value} required={!hidden_value}>
                            <option hidden={!hidden_value} >{val}</option>
                            <option>done</option>
                            <option>In progress</option>
                            <option>cancelled</option>
                            <option>suspended</option>
                        </select>
                    </div>
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="prior">Priority:  </label>
                        <input type="number" class="from-control" name="priority" id="prior" min="1" required />
                    </div>
                    <div style={this.inputstyle}>
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