const auth = async ({ navigate }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // window.location.href = "/sign-in";
    navigate("/sign-in");
  }
};

export default auth;
