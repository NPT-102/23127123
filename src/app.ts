import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("CI/CD TypeScript on Windows 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
