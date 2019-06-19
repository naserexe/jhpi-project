import React, { Component } from "react";
import { connect } from "react-redux";
import StudentItem from "./StudentItem";
import { getStudent } from "../../actions/studentAction";

class Students extends Component {
  componentDidMount() {
    this.props.getStudent();
  }
  render() {
    const { students } = this.props;
    return (
      <div>
        {students.map(student => (
          <StudentItem key={student._id} info={student} />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  students: state.student.studentInfo
});
export default connect(
  mapStateToProps,
  { getStudent }
)(Students);