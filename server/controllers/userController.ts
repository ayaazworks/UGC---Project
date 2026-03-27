import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { prisma } from "../configs/prisma.js";

// Get User Credits
export const getUserCredits = async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth();
        if (!userId) { return res.status(401).json({ message: 'Unauthorized' }) }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        res.json({ credits: user?.credits })
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}


// Get All User Projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth();
        if (!userId) { return res.status(401).json({ message: 'Unauthorized' }) }
        const projects = await prisma.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
        res.json({ projects })
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// Get Project by Id
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth();
        const projectId = req.params.projectId as string;
        if (!userId) { return res.status(401).json({ message: 'Unauthorized' }) }
        if (!projectId) { return res.status(401).json({ message: 'projectId is missing' }) }

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        })

        if (!project) { return res.status(404).json({ message: 'Project not Found' }) }

        res.json({ project })
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// publish / unpublish project
export const toggleProjectPublic = async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth();
        const projectId = req.params.projectId as string;
        if (!userId) { return res.status(401).json({ message: 'Unauthorized' }) }
        if (!projectId) { return res.status(401).json({ message: 'projectId is missing' }) }

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        })

        if (!project) { return res.status(404).json({ message: 'Project not Found' }) }

        if (!project?.generatedImage && !project?.generatedVideo) {
            return res.status(404).json({ message: 'Image or video not generated' })
        }

        await prisma.project.update({
            where: { id: String(projectId) },
            data: { isPublished: !project.isPublished }
        })
        res.json({ isPublished: !project.isPublished })
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}
