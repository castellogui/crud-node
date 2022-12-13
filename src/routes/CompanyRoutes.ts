import { validateRequest } from "../middleware/auth";
import {
  findAllCompanies,
  findCompany,
  createCompany,
  editCompany,
  deleteCompany,
} from "../services/CompanyService";
const router = require("express").Router();

router.get("/find", validateRequest, findAllCompanies);
router.get("/find/:id", validateRequest, findCompany);
router.post("/new", validateRequest, createCompany);
router.put("/edit/:id", validateRequest, editCompany);
router.delete("/delete/:id", validateRequest, deleteCompany);

export default router;
