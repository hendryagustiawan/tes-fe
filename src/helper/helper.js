import axios from "axios";

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
