export const loginSchema = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        reqired: true,
      },
      password: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        reqired: true,
      },
    },
  },
};
