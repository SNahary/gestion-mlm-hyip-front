import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import moment from "moment";

const getHeaders = () => {
  const token = localStorage.getItem('token')
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return headers
}

export const fetchSiteStart = () => {
  return {
    type: actionTypes.FETCH_SITE_START
  };
};

export const fetchSiteFail = () => {
  return {
    type: actionTypes.FETCH_SITE_FAIL
  };
};

export const initSite = sites => {
  return {
    type: actionTypes.FETCH_SITE_SUCCESS,
    sites
  };
};

export const saveSiteFail = error => {
  return{
    type: actionTypes.SAVE_SITE_FAIL,
    error
  }
}

export const fetchSite = () => {
  return async dispatch => {
    dispatch(fetchSiteStart());
    try {
      const res = await axios.get("/sites");
      let data = res.data;
      data.map(el => {
        let date = moment(new Date(el.createdAt));
        el.createdAt = date.format("YYYY-MM-DD");
      });
      dispatch(initSite(data));
    } catch (error) {
      dispatch(fetchSiteFail());
    }
  };
};

export const add = site => {
  return {
    type: actionTypes.ADD_SITE,
    site
  };
};

export const addSite = site => {
  return async dispatch => {
    try {
      const headers = getHeaders()
      const res = await axios.post("/sites", site, headers);
      const date = moment(new Date(res.data.createdAt));
      res.data.createdAt = date.format("YYYY-MM-DD");
      dispatch(add(res.data));
    } catch (error) {
      console.log("[ERROR]", error);
      dispatch(saveSiteFail(error))
    }
  };
};

export const edit = site => {
  return {
    type: actionTypes.EDIT_SITE,
    site
  };
};

export const editSite = (id,site) => {
  return async dispatch => {
    try {
      const headers = getHeaders()
      const res = await axios.patch(`/sites/${id}`, site, headers);
      const date = moment(new Date(res.data.createdAt));
      res.data.createdAt = date.format("YYYY-MM-DD");
      dispatch(edit(res.data));
    } catch (error) {
      console.log("[ERROR]", error);
      dispatch(saveSiteFail(error))
    }
  };
};

export const remove = site => {
  return {
    type: actionTypes.REMOVE_SITE,
    site
  };
};

export const deleteSite = site => {
  return async dispatch => {
    try {
      console.log('site',site)
      const headers = getHeaders()
      const res = await axios.delete(`/sites/${site._id}`, headers);
      dispatch(remove(res.data));
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
};
