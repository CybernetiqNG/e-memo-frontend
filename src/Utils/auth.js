const auth = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/sign-in";
  }
};

export default auth;
