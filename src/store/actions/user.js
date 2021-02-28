import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  };
};

export const fetchUserFail = () => {
  return {
    type: actionTypes.FETCH_USER_FAIL
  };
};

export const initUser = users => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    users
  };
};

export const fetchUser = () => {
  return async dispatch => {
    dispatch(fetchUserStart());
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const res = await axios.get("/users", headers);
      dispatch(initUser(res.data));
    } catch (error) {
      dispatch(fetchUserFail());
    }
  };
};

export const add = user => {
  return {
    type: actionTypes.ADD_USER,
    user
  };
};

export const addUser = user => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const res = await axios.post("/users", user, headers);
      dispatch(add(res.data.user));
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
};

export const edit = user => {
  return {
    type: actionTypes.EDIT_USER,
    user
  };
};

export const editUser = (id,user) => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const res = await axios.patch(`/users/${id}`, user, headers)
      console.log('res==>',res.data);
      dispatch(edit(res.data));
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
};

export const remove = user => {
  return {
    type: actionTypes.REMOVE_USER,
    user
  };
};

export const deleteUser = user => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const res = await axios.delete(`/users/${user._id}`, headers);
      dispatch(remove(res.data));
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
};
