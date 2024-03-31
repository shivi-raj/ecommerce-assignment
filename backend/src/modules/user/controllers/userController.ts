import { logger } from "../../../libs/logger";
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { mailer } from "../../../libs/mailer";
import { ObjectType } from "../../../types/types";
import HttpStatus from 'http-status-codes'

export class UserController {
    service: UserService;
    constructor() {
        this.service = new UserService();
    }

    register = async (req: Request, res: ObjectType) => {
        try {
            const data = await this.service.register(req);
            res.success(data, HttpStatus.CREATED);
        } catch (error: any) {
            res.error(error);
        }
    }

    login = async (req: Request, res: ObjectType) => {
        try {
            const data = await this.service.login(req);
            res.success(data, HttpStatus.OK);
        } catch (error: any) {
            res.error(error);
        }
    }

    verifyEmail = async (req: Request, res: ObjectType) => {
        try {
            const data = await this.service.verifyEmail(req);
            res.success(null, HttpStatus.OK);
        } catch (error: any) {
            res.error(error);
        }
    }



}
