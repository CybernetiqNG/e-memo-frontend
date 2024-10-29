import axios from "axios";

const Approve = async (approve, id) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (token) {
    try {
      const response = await axios.post(
        `${baseUrl}/memo/approve-memo`,
        {
          approved: approve,
          memo_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        // const data = response.data.starred_memos;
        // return data;
      } else {
        setError(response.message);
      }
    } catch (err) {
      //   if ("Request failed with status code 401" === err.message) {
      //     window.location.href = "/sign-in";
      //   }
      // console.log(err);
    }
  } else {
    return "Please Login";
  }
};

export default Approve;
