export type User = {
  id: string;
  username: string;
  password: string;
};

export type Request = {
  id: string;
  userId: string;
  requestType: "order" | "delivery";
  cityFrom: string;
  cityTo: string;
  type?: "gadgets" | "drinks" | "clothes" | "medicines" | "other";
  dispatchDate: string;
  description?: string;
};
