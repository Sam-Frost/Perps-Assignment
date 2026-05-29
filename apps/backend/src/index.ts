import { engineInit } from "./engine/engine";
import { loopback } from "./loopback";
import { app } from "./server";

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});

engineInit();
loopback();
