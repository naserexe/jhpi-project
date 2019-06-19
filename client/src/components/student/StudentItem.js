import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudent, getStudent } from "../../actions/studentAction";

class StudentItem extends Component {
  render() {
    const { _id, name, roll, department, semester, shift } = this.props.info;

    const onDelete = () => {
      const id = _id;
      this.props.deleteStudent(id);
      this.props.getStudent();
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card card-body bg-light mb-3">
              <h3>{name}</h3>
              <p>
                Roll: <b>{roll}</b>{" "}
              </p>
              <p>
                id: <b>{_id}</b>{" "}
              </p>
              <p>
                Department: <b>{department}</b>{" "}
              </p>

              <p>
                Semester: <b>{semester}</b>{" "}
              </p>

              <p>
                Shift: <b>{shift}</b>{" "}
              </p>

              <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                  <Link className="btn btn-info" to={`/student/edit/${_id}`}>
                    Edit
                  </Link>
                </div>

                <div className="col col-lg-2">
                  <button className="btn btn-danger" onClick={onDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  student: state.student.studentInfo
});
export default connect(
  mapStateToProps,
  { deleteStudent, getStudent }
)(StudentItem);
