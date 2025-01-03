import { initDB, TestData } from "./mock-data";

const DATA:TestData = {
  student: [{studentId: 1}],
};

async function main() {
  await initDB(DATA);
}

main().catch(console.error);
