import axios from "axios";

const singleMemo = async (id) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (token) {
    try {
      const response = await axios.get(`${baseUrl}/memo/single-memo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.data.memo);
        const data = response.data.memo;

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

export default singleMemo;
