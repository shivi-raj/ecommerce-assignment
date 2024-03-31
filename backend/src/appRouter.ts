import { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./modules/user/routes";
import { CategoryRoutes } from "./modules/category/routes";

export function appRouter(app:any){
    UserRoutes(app);
    CategoryRoutes(app);
    
}  