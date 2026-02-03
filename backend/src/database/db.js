import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("./src/database/db.json");
const db = new Low(adapter, { products: [] }); // <-- default data AQUI

await db.read();
db.data ||= { products: [] }; // garante que existe

export default db;
