import React, { Component } from "react";
import { connect } from "react-redux";
import StudentItem from "./student/StudentItem";
import { getStudent } from "../actions/studentAction";
import Spinner from "../components/common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getStudent();
  }
  render() {
    const { studentInfo, loading } = this.props.students;
    let studentItem;

    if (studentInfo.length === 0 && loading) {
      studentItem = <Spinner />;
    } else {
      if (studentInfo.length > 0) {
        studentItem = studentInfo.map(student => (
          <StudentItem key={student._id} info={student} />
        ));
      } else {
        studentItem = <h4>No student found...</h4>;
      }
    }

    return <div>{studentItem}</div>;
  }
}
const mapStateToProps = state => ({
  students: state.student
});
export default connect(
  mapStateToProps,
  { getStudent }
)(Dashboard);
