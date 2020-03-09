import { signUpRoute } from "./user";

jest.mock("../models/user", () => {
  return {
    createUser: jest.fn()
  };
});
import { createUser } from "../models/user";
const mockedCreateUser = createUser as jest.MockedFunction<typeof createUser>;

test("user signup", async () => {
  mockedCreateUser.mockResolvedValue([1]);
  const body = { email: "example@example.com", password: "example" };
  const response = jest.fn();
  await signUpRoute({ body }, { json: response });
  expect(mockedCreateUser).toBeCalledTimes(1);
  expect(response).toBeCalledTimes(1);
});
