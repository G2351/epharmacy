require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/database");
const createAdmin = require("./src/database/createAdmin");

const PORT = process.env.PORT || 3052;
const HOST = '0.0.0.0';

sequelize
  .authenticate()
  .then(async () => {
    console.log("PostgreSQL connected");

    await sequelize.sync({ alter: true });
    console.log("Tables synced!");

    // tạo tk admin
    await createAdmin(sequelize);

    const server = app.listen(PORT, HOST, () => { // Thêm HOST vào đây
      console.log(`Server is running at http://${HOST}:${PORT}`);
      console.log(`Mạng nội bộ: http://192.168.1.8:${PORT}`);
    });
    process.on("SIGINT", () => {
      server.close(() => console.log(`Exit Server Express`));
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });