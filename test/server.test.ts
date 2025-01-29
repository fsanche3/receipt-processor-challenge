import request from "supertest";
import * as database from "../src/database";
import { app, server } from "../src/server";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mocked-uuid"),
}));

jest.spyOn(database, "getReceiptPoints").mockImplementation(jest.fn());
jest.spyOn(database, "postReceiptPoints").mockImplementation(jest.fn());

jest.mock("../src/utils/calculatePoints", () => ({
  getPoints: jest.fn().mockReturnValue(100),
}));

describe("Receipts API", () => {
  afterAll(() => {
    server.close();
  });

  describe("GET /receipts/:id/points", () => {
    it("should return 200 and points if receipt is found", async () => {
      (database.getReceiptPoints as jest.Mock).mockReturnValue(100);

      const response = await request(app).get("/receipts/mock-id/points");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ points: 100 });
    });

    it("should return 404 if receipt is not found", async () => {
      (database.getReceiptPoints as jest.Mock).mockReturnValue(null);

      const response = await request(app).get("/receipts/mock-id/points");

      expect(response.status).toBe(404);
      expect(response.body).toBe("No receipt found for that ID.");
    });
  });

  describe("POST /receipts/process", () => {
    it("should return 200 with receipt ID if the receipt is valid", async () => {
      const receipt = {
        retailer: "M&M Corner Market",
        purchaseDate: "2022-03-20",
        purchaseTime: "14:33",
        items: [
          { shortDescription: "Gatorade", price: "2.25" },
          { shortDescription: "Gatorade", price: "2.25" },
        ],
        total: "9.00",
      };

      (database.postReceiptPoints as jest.Mock).mockImplementation(() => {});

      const response = await request(app)
        .post("/receipts/process")
        .send(receipt);

      expect(response.status).toBe(200);
    });

    it("should return 400 if the receipt is invalid", async () => {
      const invalidReceipt = {};

      const response = await request(app)
        .post("/receipts/process")
        .send(invalidReceipt);

      expect(response.status).toBe(400);
    });
  });
});
