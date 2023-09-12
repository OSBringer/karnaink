import instance from "/src/axiosConfig";
export const loadTimes = async () => {
  const res = await instance.get("get_times/");
  if (res.status === 200) {
    return res.data.times;
  } else {
    throw new Error("Error could not load times");
  }
};

export const deleteTime = async (timeObject) => {
  const res = await instance.delete(
    `/delete_times/${timeObject.id}/`,

    {
      withCredentials: true,
      headers: {
        Authorization: `Token ${localStorage.getItem("authToken")} `,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 200) {
    return true;
  } else {
    throw new Error("Could not delete time");
  }
};

export const deletePastTimes = async () => {
  const res = await instance.get(`/delete_expired_dates/`);
  if (res.status === 200) {
    return true;
  } else {
    throw new Error("Could not delete past times");
  }
};
