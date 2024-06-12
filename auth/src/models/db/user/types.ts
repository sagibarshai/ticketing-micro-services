import { User } from "@sagi-ticketing/common";

export interface UserPayload extends Omit<User, "password"> {}
