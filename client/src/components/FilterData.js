import React, { Component } from "react";

export default class FilterData extends Component {
  state = {
    department: "",
    semester: "",
    toggleFilter: false
  };
  onchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFilter = () => {
    let department = this.state.department;
    let semester = this.state.semester;
    let shift = this.state.shift;

    this.props.filterStudent(semester, shift, department);
  };

  toggleFilterOptions = () => {
    this.setState({
      toggleFilter: !this.state.toggleFilter
    });
  };

  render() {
    const { toggleFilter } = this.state;
    let filterComponents;

    if (toggleFilter) {
      filterComponents = (
        <div>
          <div className="row m-2">
            <div className="col-md-12 m-auto">
              <div className="card">
                <div className="card-body m-auto">
                  <div className="row">
                    <div className="col-md-auto">
                      <div className="form-group">
                        <select
                          onChange={this.onchange}
                          name="department"
                          value={this.state.department}
                          className="form-control-sm"
                        >
                          <option defaultValue label="Select Department" />
                          <option value="Computer">Computer</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Civil">Civil</option>
                          <option value="Environment">Environment</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-auto">
                      <div className="form-group">
                        <select
                          onChange={this.onchange}
                          name="semester"
                          value={this.state.semester}
                          className="form-control-sm"
                        >
                          <option defaultValue label="Select Semester" />
                          <option value="First">First</option>
                          <option value="Second">Second</option>
                          <option value="Third">Third</option>
                          <option value="Fourth">Fourth</option>
                          <option value="Fifth">Fifth</option>
                          <option value="Sixth">Sixth</option>
                          <option value="Seventh">Seventh</option>
                          <option value="Eighth">Eighth</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-auto">
                      <div className="form-group">
                        <select
                          onChange={this.onchange}
                          name="shift"
                          value={this.state.shift}
                          className="form-control-sm"
                        >
                          <option defaultValue label="Select Shift" />
                          <option value="First">First</option>
                          <option value="Second">Second</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-auto">
                      <input
                        type="button"
                        value="Filter"
                        className="btn btn-info"
                        onClick={this.handleFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {filterComponents}
        {toggleFilter ? (
          <div
            onClick={this.toggleFilterOptions}
            style={{ cursor: "pointer" }}
            className="float-right m-3"
          >
            <span className="text-primary">Hide filter option {"  "}</span>
            <i className="fas fa-arrow-circle-up" />
          </div>
        ) : (
          <div
            onClick={this.toggleFilterOptions}
            style={{ cursor: "pointer" }}
            className="float-right m-3"
          >
            <span className="text-primary">Show filter option {"  "}</span>
            <i className="fas fa-arrow-circle-down" />
          </div>
        )}
      </div>
    );
  }
}
