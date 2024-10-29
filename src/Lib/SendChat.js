import axios from "axios";

const sendChat = async (sender_id, recipient_id, message) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (token) {
    try {
      const response = await axios.post(
        `${baseUrl}/chat/send-Message`,
        {
          sender_id,
          recipient_id,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data.memos);
        const data = response.data.memos;

        return data;
      } else {
        setError(response);
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

export default sendChat;
