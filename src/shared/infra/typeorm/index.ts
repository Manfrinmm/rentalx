import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const host = process.env.RUNNING_MODE === "docker" ? "database" : "localhost";

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_tests"
          : defaultOptions.database,
    })
  );
};
