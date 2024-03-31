import { Request } from "express";
import HttpStatus from 'http-status-codes';
import { ObjectType } from "../../../types/types";
import { CategoryService } from "../services/categoryService";


export class CategoryController {
    service: CategoryService;
    constructor() {
        this.service = new CategoryService();
    }

    getCategory = async (req: Request, res: ObjectType) => {
        try {
            const data = await this.service.getCategory(req);
            res.success(data, HttpStatus.OK);
        } catch (error: any) {
            res.error(error);
        }
    }


    updateCategories = async (req: Request, res: ObjectType) => {
        try {
            const data = await this.service.updateCategories(req);
            res.success(data, HttpStatus.OK);
        } catch (error: any) {
            res.error(error);
        }
    }



}
