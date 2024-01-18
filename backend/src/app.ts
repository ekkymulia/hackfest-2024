import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { db } from "./utils/firebase";
// import UserModel from "./models/user";
import routesV1 from "../src/routes";
import appCheckVerification from "./middlewares/appCheckVerification";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", appCheckVerification, routesV1);

// tes
// app.get('/', (req, res) => {
//     try {
//         const newUser = new UserModel('john_doe', 'john@example.com', 25);
//         db.users.add(newUser.toPlainObject());
//         res.send('new user created!');
//     }catch (error) {
//         console.log(error)
//     }
// });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\x1b[94mServer started on\x1b[0m \x1b[92mhttp://localhost:${port}\x1b[0m`);
});
