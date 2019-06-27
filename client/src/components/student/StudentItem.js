import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudent, getStudent } from "../../actions/studentAction";

class StudentItem extends Component {
  render() {
    const {
      _id,
      user,
      name,
      roll,
      department,
      semester,
      shift,
      QueryError
    } = this.props.info;

    const { auth } = this.props;
    const onDelete = () => {
      const id = _id;
      this.props.deleteStudent(id);
      this.props.getStudent();
    };

    let showData;
    if (roll) {
      showData = (
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card card-body bg-light mb-2">
              <h3>{name}</h3>
              {showData}
              <p>
                Roll: <b className="text-info">{roll}</b>{" "}
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

              {user === auth.user.id ||
              // This condition check a specific user for edit and delete for all the post
              auth.user.id === "5d09dd5472941e4de0a4e77e" ? (
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
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      showData = <h1 className="text-danger text-center">{QueryError}</h1>;
    }

    return <div className="container">{showData}</div>;
  }
}

const mapStateToProps = state => ({
  student: state.student.studentInfo,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteStudent, getStudent }
)(StudentItem);
