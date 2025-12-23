# ** EXPERT LISTING GEO BUCKET CHALLENGE - NODEJS - EXPRESSJS - MONGODB **

---
## PROJECT IMPLEMENTATION SUMMARY

There is one branch: **main**:

- Project takes house listings and try to categorize them into geo buckets to optimize search results
- Project uses Nodejs, Expressjs, MongoDB + Mongoose (with GeoJSON & 2dsphere indexes)
- Testing was done with Jest + Supertest + mongodb-memory-server




## SETUP

- Check .env.example, setup your mongodb database
- Run ` npm run start  ` to start the project


## EXTRAS

- During my research, I saw an alternative approach using H3 Hexagonal Grid System, but felt it was overkill for a small test
- 2dsphere indexes seemed more appropriate coz earth is curved as opposed to using 2d for flat plane
- Sample Payload

http://localhost:4000/api/property/
{
  "title": "5 Bedroom Apartment in Sangotedo",
  "location_name": "Sangotedo",
  "lat": 6.4720,
  "lng": 3.6301,
  "price": 75000000,
  "bedrooms": 3,
  "bathrooms": 3
}
