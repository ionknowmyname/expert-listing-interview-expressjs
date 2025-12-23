import { Router } from "express";
import { PropertyController } from "../controllers/property.controller.js";
import { PropertyService } from "../services/property.service.js";

const propertyRouter = Router();

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);

// propertyRouter.post("/", propertyController.createProperty.bind(propertyController));
propertyRouter.post("/", propertyController.createProperty);
propertyRouter.get("/search", propertyController.searchProperties);


// bookRouter.get("/:id", bookController.getBook.bind(bookController));
// bookRouter.put("/:id", bookController.updateBook.bind(bookController));
// bookRouter.delete("/:id", bookController.deleteBook.bind(bookController));

export default propertyRouter;
