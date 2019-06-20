import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import StudentItem from "./student/StudentItem";
import { getStudent, searchStudent } from "../actions/studentAction";
import Spinner from "../components/common/Spinner";

class Dashboard extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getStudent();
  }
  onchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSearch = () => {
    const searchQuery = {
      search: this.state.search
    };
    this.props.searchStudent(searchQuery);
  };
  render() {
    const { errors } = this.props;
    const { studentInfo, loading } = this.props.students;
    let studentItem;
    let searchItem;

    if (studentInfo.length === 0 && loading) {
      studentItem = <Spinner />;
    } else {
      if (studentInfo.length > 0) {
        studentItem = studentInfo.map(student => (
          <StudentItem key={student._id} info={student} />
        ));
      } else {
        searchItem = <StudentItem key={studentInfo._id} info={studentInfo} />;
      }
    }

    return (
      <div>
        <h1 className="display-4 text-center">Dashboard</h1>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 m-auto mb-3">
                    <input
                      type="number"
                      name="search"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.search
                      })}
                      placeholder="Search student by Roll"
                      value={this.state.search}
                      onChange={this.onchange}
                    />
                    {errors.search && (
                      <div className="invalid-feedback">{errors.search}</div>
                    )}
                  </div>
                  <div className="col-md-3 mr-auto">
                    <input
                      onClick={this.onSearch}
                      className="btn btn-info btn-block form-control form-control-lg"
                      type="button"
                      value="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {searchItem}
        {studentItem}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  students: state.student,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getStudent, searchStudent }
)(Dashboard);
