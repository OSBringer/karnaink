import instance from "/src/axiosConfig";

export const handleLogout = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }

  try {
    const response = await instance.post("/logout/", null, {
      headers: {
        Authorization: `Token ${authToken}`, // Get the token from local storage
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("authToken");
    //window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

export const checkAuthToken = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }

  try {
    const response = await instance.get("/test_token/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
