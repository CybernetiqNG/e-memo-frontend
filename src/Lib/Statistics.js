import axios from "axios";

const statistics = async () => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (token) {
    try {
      const response = await axios.get(`${baseUrl}/memo/memo-statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.data);
        const data = response.data;

        return data;
      } else {
        setError(response.message);
      }
    } catch (err) {
      if ("Request failed with status code 401" === err.message) {
        window.location.href = "/sign-in";
      }
      // console.log(err);
    }
  } else {
    return "Please Login";
  }
};

export default statistics;
