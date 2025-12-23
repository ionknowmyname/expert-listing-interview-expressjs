
import { PropertyService } from "../services/property.service.js";

export class PropertyController {
  constructor(propertyService) {
    // this.propertyService = new PropertyService();
    this.propertyService = propertyService;

    this.createProperty = this.createProperty.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
  }

  async createProperty(req, res) {
    try {
      const property = await this.propertyService.createProperty(req.body);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  };

  async searchProperties(req, res) {
    try {
      const properties = await this.propertyService.searchProperties(req.query);
      res.status(200).json(properties);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  };
}
