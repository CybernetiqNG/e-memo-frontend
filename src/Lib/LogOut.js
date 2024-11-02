import axios from "axios";

const Logout = async () => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (token) {
    try {
      const response = await axios.post(
        `${baseUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log("Logout successful");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("chatdata");

        window.location.href = "/sign-in";
      } else {
        // console.log("Error logging out:", response.message);
      }
    } catch (err) {
      // console.log(err);

      if (err.response && err.response.status === 401) {
        window.location.href = "/sign-in";
      }
    }
  } else {
    console.log("No token found, please log in.");
  }
};

export default Logout;
