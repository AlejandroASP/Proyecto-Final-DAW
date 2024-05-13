const url = "http://localhost:3002/api";

export const registerUser = async (username, firstName, lastName, email, password, rol) => {
  try {
    const response = await fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
        rol,
      }),
    });

    if (!response.ok) {
      throw new Error("Error de red: no se pudo conectar al servidor");
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
