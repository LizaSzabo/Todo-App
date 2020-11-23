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

        this.hadleSaveUpdate = this.handleSaveUpdate.bind(this);
    }

    
    closeButtonstyle = {
        textAlign: 'right',
        fontSize: '35px'
    }
    updateformstyle = {
        backgroundColor: '#cce6ff',
        fontSize: '20px',
        border: '2px solid blue',
        textAlign: 'left'
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
        return (
            <div style={this.updateformstyle}>
                <div style={this.closeButtonstyle}><button onClick={() =>  this.props.X()}> x </button></div>
                <h1 style={{ textAlign: 'center' }}>Update Task {this.props.TitleUpdating} </h1>
                <form onSubmit={this.handleSaveUpdate}>
                    <input type="hidden" id="id" name="id" value={this.props.todoId} />
                    <div style={this.inputstyle}>
                        <label style={this.labelstyle} for="title">Title:  </label>
                        <input type="text" class="from-control" name="title" id="title" Value={this.props.TitleUpdating} required />
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
                        <label style={this.labelstyle} for="status">Status:  </label>
                        <select class="from-control" name="status" id="status">
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
                        <button style={this.formbuttonstyles} type="submit"  >Save</button>
                        <button style={this.formbuttonstyles} onClick={() => this.props.cancel()}>Update</button>
                    </div>

                </form></div>
        )


    }

    /*Adatok felülirasa adatbazisba*/
    handleSaveUpdate(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const id = data.get('id');

        var response = fetch('api/Todoes/' + id, { method: 'PUT', body: data });
    }

}