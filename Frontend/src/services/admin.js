const url = "http://localhost:3002/api";

export const updatePassword = async (email, password, newPassword) => {
  try {
    const response = await fetch(`${url}/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error("401");
    }

    let responseJSON = await response.json();

    if (responseJSON.error) {
      throw new Error(responseJSON.error);
    }

    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};