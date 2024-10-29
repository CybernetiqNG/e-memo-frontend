import axios from "axios";

const StarMemo = async (starred, id) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // console.log(starred, id);
  if (token) {
    try {
      const wait = await starred;
      const response = await axios.post(
        `${baseUrl}/memo/star-memo`,
        {
          starred: starred,
          memo_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data.starred_memos);
        const data = response.data.starred_memos;

        return data;
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

export default StarMemo;
