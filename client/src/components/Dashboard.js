import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudent } from "../actions/studentAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getStudent();
  }
  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  student: state.student
});
export default connect(
  mapStateToProps,
  { getStudent }
)(Dashboard);
