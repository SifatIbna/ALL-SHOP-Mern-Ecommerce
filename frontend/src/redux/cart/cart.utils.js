export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + cartItemToAdd.quantity,
            color: cartItemToAdd.color,
            size: cartItemToAdd.size,
          }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd }];
};

export const filterCartItem = (cartItems, cartItemToFilter) => {
  return cartItems.filter((cartItem) => cartItem._id !== cartItemToFilter._id);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return filterCartItem(cartItems, cartItemToRemove);
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
