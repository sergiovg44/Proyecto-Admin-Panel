export const API_URL_LOGIN = "http://localhost:4000/login";

export const llamadasUrl = {
  url: "http://localhost:4000/users",
  todosLosUsuarios: "/users",
  registro: "/create",
  id: "",
};

export function irAlLogin() {
  window.location.href = "/index.html";
}

export const refrescarToken = async () => {
  const tokenRefresco = localStorage.getItem("token_refresco");
  if (!tokenRefresco) {
    irAlLogin();
    return;
  }

  try {
    const response = await fetch(`${API_URL_LOGIN}/token-refresco`, {
      method: "GET",
      headers: { "auth-token": `${tokenRefresco}` },
    });

    if (response.ok) {
      const { token, token_refresco } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("token_refresco", token_refresco);

      return token;
    } else {
      alert("Error al intentar refrescar el token. Redirigiendo al login...");
      throw new Error("Error al refrescar el token");
    }
  } catch (error) {
    console.error("Error al intentar refrescar el token", error);
    alert("Error al intentar refrescar el token. Redirigiendo al login...");
    localStorage.removeItem("token");
    localStorage.removeItem("token_refresco");
    localStorage.removeItem("rol");
    irAlLogin();
    throw error;
  }
};

export const llamarApi = async (url, method, data = null, token) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": data ? "application/json" : undefined,
        "auth-token": token,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      if (response.status === 401) {
        const nuevoToken = await refrescarToken();
        return await llamarApi(url, method, data, nuevoToken);
      }
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error.message);
    alert("Ocurrió un error al procesar la solicitud.");
    throw error;
  }
};

export const GetApi = async (url, token) => {
  return llamarApi(url, "GET", null, token);
};

export const PostApi = async (url, data, token) => {
  return llamarApi(url, "POST", data, token);
};

export const DeleteApi = async (url, token) => {
  return llamarApi(url, "DELETE", null, token);
};

export const PatchApi = async (url, data, token) => {
  return llamarApi(url, "PATCH", data, token);
};
