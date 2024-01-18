import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
import UserModel from "../../models/user";
import { successResponse, errorResponse } from "../../utils/response";

export const listData = async (req: Request, res: Response) => {
  // const limit: number = Number(req.query.limit) || 10;
  // const page: number = Number(req.query.page) || 1;
  // const searchKeywords: string | null = req.query?.s ? String(req.query.s)?.toLowerCase() : null;

  try {
    const userList = await UserModel.getAll()

    // const { total, results } = await MUsers.query()
    //   .select(
    //     "users.id",
    //     "users.name",
    //     "users.username",
    //     "users.email",
    //     "users.avatar",
    //     "users.role",
    //     "users.is_active as isActive",
    //     "users.is_verified as isVerified",
    //   )
    //   .page(page - 1, limit)
    //   .modify((queryBuilder) => {
    //     if (searchKeywords !== null && searchKeywords !== "") {
    //       queryBuilder.whereRaw("LOWER(users.name) LIKE ?", [`%${searchKeywords}%`]);
    //       queryBuilder.orWhereRaw("LOWER(users.username) LIKE ?", [`%${searchKeywords}%`]);
    //       queryBuilder.orWhereRaw("LOWER(users.email) LIKE ?", [`%${searchKeywords}%`]);
    //       queryBuilder.orWhereRaw("LOWER(users.phone) LIKE ?", [`%${searchKeywords}%`]);
    //     }
    //   });

    // let totalData = total;
    res.status(200).json(
      successResponse("SUCCESS", {
        results: {
        //   pagination: paginationResponse(page, limit, totalData),
          data: userList
        }
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};

export const checkUser = async (req: Request, res: Response) => {
  const { email }= req.body;

  console.log(email)

  try{
    const user = await UserModel.getByEmail(email);

    if(user){
      res.status(200).json(
        successResponse("SUCCESS", { results: user })
      );
    }else{
      res.status(404).json(
        errorResponse("DATA NOT FOUND", { results: null })
      );
    }
  }catch(error: unknown){
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
}

// export const detailData = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   try {
//     const user = await MUsers.query()
//       .select(
//         "users.id",
//         "users.name",
//         "users.username",
//         "users.phone",
//         "users.email",
//         "users.gender",
//         "users.avatar",
//         "users.role",
//         "users.is_active as isActive",
//         "users.is_verified as isVerified",
//         "users.created_at as createdAt",
//         "users.updated_at as updatedAt",
//       )
//       .findById(userId);

//     if (user) {
//       res.status(200).json(
//         successResponse("SUCCESS", { results: user })
//       );
//     } else {
//       res.status(404).json(
//         errorResponse("DATA NOT FOUND", { results: null })
//       );
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json(
//         errorResponse(error?.message, { results: null })
//       );
//     } else {
//       res.status(500).json(
//         errorResponse("Internal server error", { results: null })
//       );
//     }
//   }
// };

export const createData = async (req: Request, res: Response) => {
  const {
    name,
    phone,
    email,
    role,
  } = req.body;

  
  try {
    interface FormData {
      name: string;
      email: string;
      is_verified: boolean;
      is_active: boolean;
      // username?: string;
      subscription_status?:  1 | 2 | 3 | undefined;
      phone?: string;
      role?: 1 | 2 | 3 | undefined;
    }
    
    const formData: FormData = {
      name,
      email,
      is_verified: false,
      is_active: true,
      subscription_status: 1,
      phone,
      role
    };

    if (name) formData["name"] = name;
    if (phone) formData["phone"] = phone;
    if (role) formData["role"] = role || 2;

    const isUserExist = await UserModel.getByEmail(email);
    
    if (isUserExist) {
      res.status(409).json(
        errorResponse("Email already exists", { results: null })
      );
    } else {
      const user = await UserModel.insert(formData);
      // const { password, is_active, ...rest } = user;
      // const updatedUser = { ...rest, isActive: is_active };
      
      res.status(201).json(
        successResponse("Success", {
          errors: null,
          results: user
        })
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse("error", {
          errors: null,
          results: null
        })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", {
          errors: null,
          results: null
        })
      );
    }
  }
};

// export const updateData = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await MUsers.query().findById(userId).patch({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const myProfile = async (req: Request, res: Response) => {
//   const userId = req.currentUser?.id;
//   if (userId) {
//     try {
//       const user = await MUsers.query()
//         .select(
//           "users.id",
//           "users.name",
//           "users.username",
//           "users.email",
//           "users.avatar",
//           "users.is_active as isActive",
//           "users.created_at as createdAt",
//           "users.updated_at as updatedAt",
//         )
//         .withGraphFetched("rental as books")
//         .modifyGraph("books",
//           (builder) => {
//             builder
//               .select(
//                 "master_books.id",
//                 "master_books.title",
//                 "master_books.writer",
//                 "master_books.publisher",
//                 "master_books.publication_year as publicationYear",
//                 "master_books.genre",
//                 "master_books.cover"
//               )
//               .leftJoin("books", "books.id", "rental.book_id")
//               .leftJoin("master_books", "master_books.id", "books.master_book_id")
//               .where({
//                 "rental.type": "RENT"
//               });
//           }
//         )
//         .findById(userId);
  
//       if (user) {
//         res.status(200).json(
//           successResponse("SUCCESS", { results: user })
//         );
//       } else {
//         res.status(404).json(
//           errorResponse("DATA NOT FOUND", { results: null })
//         );
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json(
//           errorResponse(error?.message, { results: null })
//         );
//       } else {
//         res.status(500).json(
//           errorResponse("Internal server error", { results: null })
//         );
//       }
//     }
//   } else {
//     res.status(404).json(
//       errorResponse("user not found", { results: null })
//     );
//   }
// };
