import env from "./env";
import app from "app";

const port = env.PORT;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started successfully on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
