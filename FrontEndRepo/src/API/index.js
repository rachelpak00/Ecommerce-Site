const baseUrl = "http://localhost:9090/api";

export async function fetchAllProducts() {
  try {
    let response = await fetch(`${baseUrl}/products`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchProductById(productId) {
  try {
    let response = await fetch(`${baseUrl}/products/${productId}`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function createProduct(
  name,
  description,
  gender,
  category,
  price,
  quantity,
  brand,
  sku,
  image_url,
  weight
) {
  try {
    let response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        gender: gender,
        category: category,
        price: price,
        quantity: quantity,
        brand: brand,
        sku: sku,
        image_url: image_url,
        weight: weight,
      }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(
  productId,
  name,
  description,
  gender,
  category,
  price,
  quantity,
  brand,
  sku,
  image_url,
  weight
) {
  try {
    let response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        gender: gender,
        category: category,
        price: price,
        quantity: quantity,
        brand: brand,
        sku: sku,
        image_url: image_url,
        weight: weight,
      }),
    });
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(username, password) {
  try {
    let response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        admin: false,
      }),
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(username, password) {
  try {
    let response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserDetails(
  userId,
  firstName,
  lastName,
  email,
  address,
  city,
  state,
  postalCode,
  country
) {
  try {
    let response = await fetch(`${baseUrl}/users/${userId}/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        city: city,
        state: state,
        postal_code: postalCode,
        country: country,
      }),
    });
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserDetails(userId) {
  try {
    let response = await fetch(`${baseUrl}/users/${userId}`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserDetails(
  user_id,
  username,
  password,
  is_admin,
  firstName,
  lastName,
  email,
  address,
  city,
  state,
  postalCode,
  country
) {
  try {
    let response = await fetch(`${baseUrl}/users/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        is_admin : false,
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        city: city,
        state: state,
        postal_code: postalCode,
        country: country,
      }),
    });
    let results = await response.json()
    return results
  } catch (error) {
    console.log(error);
  }
}

export async function addToCart(userId, productId, quantity) {
  try {
    let response = await fetch(`${baseUrl}/cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });

    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCart(userId) {
  try {
    let response = await fetch(`${baseUrl}/cart/${userId}`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCartItem(userId, productId) {
  try {
    let response = await fetch(`${baseUrl}/cart/${userId}/${productId}`, {
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

export async function updateCart(user_id, product_id, quantity) {
  try {
    let response = await fetch(`${baseUrl}/cart/${user_id}/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPaymentInfo(userId) {
  try {
    let response = await fetch(`${baseUrl}/paymentDetails/user/${userId}`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function addPaymentInfo(
  userId,
  cardholder_name,
  card_number,
  expiration_date,
  cvv,
  billing_address,
  default_payment
) {
  try {
    let response = await fetch(`${baseUrl}/paymentDetails/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        cardholder_name: cardholder_name,
        card_number: card_number,
        expiration_date: expiration_date,
        cvv: cvv,
        billing_address: billing_address,
        default_payment: default_payment,
      }),
    });
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function createOrder(
  userId,
  total,
  shipping_address,
  billing_address,
  status,
  payment_method,
  product_id
) {
  try {
    let response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        total: total,
        shipping_address: shipping_address,
        billing_address: billing_address,
        status: status,
        payment_method: payment_method,
        product_id: product_id,
      }),
    });
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOrders() {
  try {
    let response = await fetch(`${baseUrl}/orders`);
    let results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}
