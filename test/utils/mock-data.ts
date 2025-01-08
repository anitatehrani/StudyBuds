import { Model } from "sequelize";
import sequelize from "./database";
import {
  initModels,
} from "./models/init-models";

export function initData(){
    return initModels(sequelize);
}

async function clearData() {
  const models = initModels(sequelize);
  for (const model of Object.values(models)) {
    // @ts-expect-error lol
    await model.truncate({ cascade: true });
  }
}

async function addData(
  data: Model[],
) {
  for(const model of data){
      await model.save();
  }
}

export async function initDB(data:Model[]) {
  await clearData();
  await addData(data);
}

