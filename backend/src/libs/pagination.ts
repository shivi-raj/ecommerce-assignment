import { prisma } from "../prisma/prismaClient";
import { logger } from "./logger";

export async function pagination(modelName:string, pageNumber:string, pageSize:string, options = {}) {
    try {
        const page = pageNumber ? parseInt(pageNumber) : 1;
        const take = pageSize ? parseInt(pageSize) : 6;
        const skip = (page - 1) * take;
        
        // @ts-ignore
        // Find records using Prisma's findMany method with pagination options
        const records = await prisma[modelName].findMany({
            ...options,
            skip,
            take,
        });

        // @ts-ignore
        // Get the total count of records
        const totalCount = await prisma[modelName].count();

         return {
             records,
             totalCount,
         };
    } catch (error) {
        logger.error('Error paginating data:', error);
        throw error;
    }
}