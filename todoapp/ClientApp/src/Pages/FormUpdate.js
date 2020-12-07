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

    updateformstyle = {
        backgroundColor: '#cce6ff',
        border: '2px solid blue'
    }


    render() {
        return (
            <div style={this.updateformstyle}>
                <div class=" d-flex justify-content-end"><button class="btn btn-danger" onClick={() => this.props.X()}><h3> x </h3></button></div>
                <h3 class=" d-flex justify-content-center">Update Task {this.props.TitleUpdating} </h3>
                <form onSubmit={this.handleSaveUpdate}>
                    <input type="hidden" id="id" name="id" value={this.props.todoId} />
                    <div class="pl-3 pr-2 d-flex justify-content-start">
                        <label class="pr-2" for="title"><h5>Title:  </h5></label>
                        <input type="text" class="from-control" name="title" id="title" Value={this.props.TitleUpdating} required />
                    </div>
                    <div class="pl-3 pr-2 d-flex justify-content-start">
                        <label class="pr-2" for="desc"><h5>Description:  </h5></label>
                        <textarea type="text" class="from-control" name="description" id="desc" cols="20" wrap="hard" placeholder="not required" />
                    </div>
                    <div class="pl-3 pr-2 d-flex justify-content-start">
                        <label class="pr-2" for="dead"><h5>Deadline:  </h5></label>
                        <input type="date" class="from-control" name="deadline" id="dead" required />
                    </div>
                    <div class="pl-3 pr-2 d-flex justify-content-start">
                        <label class="pr-2" for="status"><h5>Status:  </h5></label>
                        <select class="from-control" name="status" id="status">
                            <option>done</option>
                            <option>In progress</option>
                            <option>cancelled</option>
                            <option>suspended</option>
                        </select>
                    </div>
                    <div class="pl-3 pr-2 d-flex justify-content-start">
                        <label class="pr-2" for="prior"><h5>Priority:  </h5></label>
                        <input type="number" class="from-control" name="priority" id="prior" min="1" required />
                    </div>
                    <div class="pl-3 pr-2 d-flex justify-content-center">
                        <button class="btn btn-success m-2"  type="submit"  >Save</button>
                        <button class="btn btn-secondary m-2" onClick={() => this.props.cancel()}>Update</button>
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