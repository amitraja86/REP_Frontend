import axios from "axios";
import axiosInstance from "./api/axiosInstance";
// import { API_URL } from "./Constants";
import { STATUS_200, STATUS_300 } from "./Constants";
import ApiConfig from "./config/apiConfig";

// Common fetch function
export const fetchClientsData = async (token, useAxiosInstance = true) => {
//   console.log("t1", API_URL);
  try {
    const axiosToUse = useAxiosInstance ? axiosInstance : axios;
    console.log("axiosToUse", axiosToUse);
    // const url = useAxiosInstance ? "/company/" : `${API_URL}/company/`;
    // console.log("url", url);
    // const response = await axiosToUse.get(url, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     token: token,
    //     "Content-Type": "application/json",
    //   },
    // });
    const response = await axiosToUse.get(`${ApiConfig.clientData}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
};

// Utility to get positions and panels
export const extractPositionsAndPanels = (clients, selectedClient) => {
  const allPositions = [];
  const allPanels = [];

  if (selectedClient && clients[selectedClient]) {
    const data = clients[selectedClient];
    return {
      positions: data[0]?.[0] || [],
      panels: data[1]?.[0] || [],
    };
  } else {
    Object.values(clients).forEach((entry) => {
      allPositions.push(...(entry[0]?.[0] || []));
      allPanels.push(...(entry[1]?.[0] || []));
    });
    return {
      positions: [...new Set(allPositions)],
      panels: [...new Set(allPanels)],
    };
  }
};
