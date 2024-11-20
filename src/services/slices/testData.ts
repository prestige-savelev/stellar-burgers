export const bunData = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

export const ingredientData = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

export const orderData = {
  _id: '673b7585b27b06001c3e8f7c',
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-11-18T17:12:37.215Z',
  updatedAt: '2024-11-18T17:12:38.591Z',
  number: 59710,
  ingredients: [JSON.stringify(bunData)]
};

export const feedData = {
  orders: [orderData],
  success: false,
  total: 0,
  totalToday: 0
};

export const loginUserData = {
  accessToken: 'token',
  refreshToken: 'refToken',
  success: false,
  user: {
    email: 'email',
    name: 'name'
  }
};

export const getUserData = {
  success: false,
  user: {
    email: 'email',
    name: 'name'
  }
};

export const numberOrderData = {
  orders: [orderData],
  success: false
};
