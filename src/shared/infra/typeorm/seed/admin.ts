import { hash } from "bcryptjs";
import { v4 } from "uuid";

import ConnectionApp from "../index";

async function create() {
  const connectionApp = await ConnectionApp();

  const { connection } = connectionApp.manager;

  const id = v4();
  const password = await hash("admin", 8);

  await connection.query(`
    insert into users (id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'xxx', 'now()')
    `);

  await connection.close();
}

create().then(() => {
  console.log("User admin created!");
});
