import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import { MongoMemoryServer } from "mongodb-memory-server";

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_TEST_URI);
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 30000);

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
}, 30000);


it("creates a property successfully", async () => {
  const payload = {
    title: "2 Bedroom Flat",
    location_name: "Sangotedo",
    lat: 6.4698,
    lng: 3.6285,
    price: 45000000,
    bedrooms: 2,
    bathrooms: 2,
  };

  const res = await request(app)
    .post("/api/property")
    .send(payload)
    .expect(201);

  expect(res.body).toHaveProperty("_id");
  expect(res.body).toHaveProperty("bucketId");
  expect(res.body.location.type).toBe("Point");
  expect(res.body.location.coordinates).toEqual([3.6285, 6.4698]);
});

it("assigns different Sangotedo variants to the same bucket", async () => {
  const payloads = [
    {
      location_name: "Sangotedo",
      lat: 6.4698,
      lng: 3.6285,
    },
    {
      location_name: "Sangotedo, Ajah",
      lat: 6.472,
      lng: 3.6301,
    },
    {
      location_name: "sangotedo lagos",
      lat: 6.4705,
      lng: 3.629,
    },
  ];

  const responses = [];

  for (const payload of payloads) {
    const res = await request(app)
      .post("/api/property")
      .send(payload)
      .expect(201);

    responses.push(res.body);
  }

  const bucketIds = responses.map((p) => p.bucketId.toString());

  // All bucket IDs must be identical
  expect(new Set(bucketIds).size).toBe(1);
});

it("returns all Sangotedo properties via search", async () => {
  const res = await request(app)
    .get("/api/property/search")
    .query({ location: "sangotedo" })
    .expect(200);

  expect(res.body.length).toBe(4);

  res.body.forEach((property) => {
    expect(property).toHaveProperty("bucketId");
    expect(property.location.type).toBe("Point");
  });
});

it("search is case-insensitive", async () => {
  const res = await request(app)
    .get("/api/property/search?location=SaNgoTeDo")
    .expect(200);

  expect(res.body.length).toBeGreaterThanOrEqual(1);
});