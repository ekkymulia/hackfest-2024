import { Request, Response } from "express";
import {
  successResponse,
  errorResponse,
} from "../../utils/response";
import ProjectModel from "../../models/project";
// import { generateId } from "../../utils/helpers";

export const listData = async (req: Request, res: Response) => {
  // const limit: number = Number(req.query.limit) || 10;
  // const page: number = Number(req.query.page) || 1;
  // const searchKeywords: string | null = req.query?.s
  //   ? String(req.query.s)?.toLowerCase()
  //   : null;

  const { status, owner_id, asignee_needed } = req.body

  try {
    const projectList = await ProjectModel.getAll({status, owner_id, asignee_needed});
    res.status(200).json(
      successResponse("SUCCESS", {
        results: {
          //   pagination: paginationResponse(page, limit, totalData),
          data: projectList,
        },
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(errorResponse(error?.message, { results: null }));
    } else {
      res
        .status(500)
        .json(errorResponse("Internal server error", { results: null }));
    }
  }
};

export const dataById = async (req: Request, res: Response) => {
  const projectId = req.params.id;

  try {
    const project = await ProjectModel.getById(projectId);

    res.status(200).json(
      successResponse("SUCCESS", {
        results: {
          data: project,
        },
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(errorResponse(error?.message, { results: null }));
    } else {
      res
        .status(500)
        .json(errorResponse("Internal server error", { results: null }));
    }
  }
};

export const insertData = async (req: Request, res: Response) => {
  const { title, description, owner_id } = req.body;

  const project = new ProjectModel({
    status: 1,
    owner_id: owner_id || "",
    title: title || "",
    description: description || "",
    asignee_needed: 0,
    asignee: [],
    submission: [],
  });

  try {
    const result = await project.save();
    res.status(200).json(
      successResponse("SUCCESS", {
        results: result,
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(errorResponse(error?.message, { results: null }));
    } else {
      res
        .status(500)
        .json(errorResponse("Internal server error", { results: null }));
    }
  }
};

export const updateData = async (req: Request, res: Response) => {
  const {
      status,
      asignee_needed,
      wanted_deadline,
      target_deadline,
      title,
      description,
  } = req.body;

  const projectId = req.params.id;

  try {
      const existingProject = await ProjectModel.getById(projectId);

      if (!existingProject) {
          return res.status(404).json(errorResponse("Project not found", { results: null }));
      }

      // Update only the provided fields
      const updatedProject = await ProjectModel.updateById(projectId, {
          status,
          asignee_needed,
          wanted_deadline,
          target_deadline,
          title,
          description,
      });

      res.status(200).json(
          successResponse("SUCCESS", {
              results: updatedProject,
          })
      );
  } catch (error: unknown) {
      if (error instanceof Error) {
          res.status(500).json(errorResponse(error.message, { results: null }));
      } else {
          res.status(500).json(errorResponse("Internal server error", { results: null }));
      }
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const {
    userId
  } = req.body;

  const projectId = req.params.id;

  try {
      const existingProject = await ProjectModel.getById(projectId);

      if (!existingProject) {
          return res.status(404).json(errorResponse("Project not found", { results: null }));
      }else{
        if (!existingProject.owner_id == userId){
          return res.status(404).json(errorResponse("Only could be deleted by the creator", { results: null }));
        }
      }

      // Update only the provided fields
      const deleteProject = await ProjectModel.deleteById(projectId);

      res.status(200).json(
          successResponse("SUCCESS", {
              results: deleteProject,
          })
      );
  } catch (error: unknown) {
      if (error instanceof Error) {
          res.status(500).json(errorResponse(error.message, { results: null }));
      } else {
          res.status(500).json(errorResponse("Internal server error", { results: null }));
      }
  }
};