const baseUrl = "http://localhost:9090/api";

export async function createUser(username, password, isAdmin) {
  try {
    let response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        admin: isAdmin,
      }),
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllUsersAndDetails() {
  try {
    const response = await fetch(`${baseUrl}/users/users/details`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving users", error);
    throw new Error("Error retrieving users");
  }
}

export async function fetchAllOrders() {
  try {
    const response = await fetch(`${baseUrl}/orders`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving users", error);
    throw new Error("Error retrieving users");
  }
}

export async function fetchUser(userid) {
  try {
    const response = await fetch(`${baseUrl}/users/userid/${userid}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving users", error);
    throw new Error("Error retrieving users");
  }
}

let userAccountInfo;
if (localStorage.userId) {
  userAccountInfo = await fetchUser(localStorage.userId);
} else userAccountInfo = {username: "Not Logged In"}

export { userAccountInfo };

export async function deleteUser(userId) {
  try {
    let response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId) {
  try {
    let response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}
