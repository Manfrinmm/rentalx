import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const route = Router();

route.use("/users", usersRoutes);
route.use("/categories", categoriesRoutes);
route.use("/specifications", specificationsRoutes);

route.use(authenticateRoutes);

route.use("/cars", carsRoutes);
route.use("/rentals", rentalsRoutes);

export { route };
