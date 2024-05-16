const BASE_URL = "http://localhost:8080/";
const uploadData = async (url, data) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: data,
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

const updateUser = async (url, data) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      body: data,
      headers: { "content-type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
const uploadDataViaGoogle = async (url, data) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: data,
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
export { uploadData, uploadDataViaGoogle, updateUser };
