import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentStudent, updateStudent } from "../../actions/studentAction";
import classnames from "classnames";
import axios from "axios";

class EditStudent extends Component {
  state = {
    name: "",
    roll: "",
    department: "",
    semester: "",
    shift: ""
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/student/${id}`).then(res => {
      this.setState({
        name: res.data.name,
        roll: res.data.roll,
        department: res.data.department,
        semester: res.data.semester,
        shift: res.data.shift
      });
    });
  }

  onchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, roll, department, semester, shift } = this.state;
    const id = this.props.match.params.id;
    const newInfo = {
      name,
      roll,
      department,
      semester,
      shift
    };

    this.props.updateStudent(id, newInfo, this.props.history);
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="add-student">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h1 className="display-4 text-center">Edit Student</h1>
              <hr />
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Enter student name"
                    value={this.state.name}
                    name="name"
                    onChange={this.onchange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="roll"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.roll
                    })}
                    placeholder="Enter student Roll"
                    value={this.state.roll}
                    onChange={this.onchange}
                  />
                  {errors.roll && (
                    <div className="invalid-feedback">{errors.roll}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    onChange={this.onchange}
                    name="department"
                    value={this.state.department}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.department
                    })}
                  >
                    <option disabled selected label="Select Department" />
                    <option value="computer">Computer</option>
                    <option value="electronics">Electronics</option>
                    <option value="electrical">Electrical</option>
                    <option value="civil">Civil</option>
                    <option value="environment">Environment</option>
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    onChange={this.onchange}
                    name="semester"
                    value={this.state.semester}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.semester
                    })}
                  >
                    <option disabled selected label="Select Semester" />
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                    <option value="Fourth">Fourth</option>
                    <option value="Fifth">Fifth</option>
                    <option value="Sixth">Sixth</option>
                    <option value="Seventh">Seventh</option>
                    <option value="Eighth">Eighth</option>
                  </select>
                  {errors.semester && (
                    <div className="invalid-feedback">{errors.semester}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    onChange={this.onchange}
                    name="shift"
                    value={this.state.shift}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.shift
                    })}
                  >
                    <option disabled selected label="Select Shift" />
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                  </select>
                  {errors.shift && (
                    <div className="invalid-feedback">{errors.shift}</div>
                  )}
                </div>

                <input
                  value="Save"
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  students: state.student.studentInfo,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getCurrentStudent, updateStudent }
)(withRouter(EditStudent));
