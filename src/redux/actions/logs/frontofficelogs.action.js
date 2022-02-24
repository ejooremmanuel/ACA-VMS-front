import axios from "axios";
import {
  BASE_URL,
  GET_FRONT_LOGS,
  GET_FRONT_LOGS_FAIL,
} from "../../constants/constants";

export const getFrontDeskLogs = (setOfficeAdminLogs, setLoading) => {
  return async (dispatch) => {
    const office = JSON.parse(localStorage.getItem("frontdesk")).user.office;
    try {
      const res = await axios.get(`${BASE_URL}/logs/?q=${office}`);
      dispatch({
        type: GET_FRONT_LOGS,
        payload: res.data,
      });
      setOfficeAdminLogs(res.data.data);
      setLoading(false);
    } catch (error) {
      dispatch({
        type: GET_FRONT_LOGS_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
    }
  };
};
