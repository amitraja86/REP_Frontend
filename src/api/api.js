import axiosInstance from "./axiosInstance";
import endpoints from "./endpoints";

const API = {
  // ✅ Fetch all clients (companies)
  fetchClients: async () => {
    const response = await axiosInstance.get(endpoints.company);
    return response.data;
  },

  // ✅ Search questions using filters
  searchQuestions: async ({ position, client, panel }) => {
    const params = new URLSearchParams();
    if (position) params.append("position", position);
    if (client) params.append("company_name", client);
    if (panel) params.append("panel_name", panel);

    const response = await axiosInstance.get(
      `${endpoints.questions}?${params.toString()}`
    );
    return response.data.details;
  },

  // Add below the existing methods in your API object
};

export default API;
