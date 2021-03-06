import React from "react";
import { connect } from "react-redux";
import { login } from "../../../actions/session_actions";
import { openModal, closeModal } from "../../../actions/modal_actions";
import SessionForm from "./session_form";

const msp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "login",
  };
};

const mdp = (dispatch) => {
  return {
    submitAction: (user) => dispatch(login(user)),
    demoLogin: (user) => dispatch(login(user)),
    switchForm: (
      <button className="switch-signup-button" onClick={() => dispatch(openModal("signup"))}>
        Sign Up
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(msp, mdp)(SessionForm);
