import axios from "axios";

const ArchiveMemo = async (archived, id) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // console.log(payload);
  if (token) {
    try {
      const response = await axios.post(
        `${baseUrl}/memo/archive-memo`,
        {
          archived: archived,
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

export default ArchiveMemo;
