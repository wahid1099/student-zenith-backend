import User from "./user.model";

export const createUserService = async (payload: any) => {
  const user = new User(payload);
  return user.save();
};

// Login, forgot password, block user logic is handled in controller for simplicity
