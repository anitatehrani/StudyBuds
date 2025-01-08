import { Model } from "sequelize";
import sequelize from "../../src/config/database";
import {
  FbTokenAttributes,
  GroupMembersAttributes,
  initModels,
  JoinRequestAttributes,
  NotificationAttributes,
  StudentAttributes,
  StudentGroupAttributes,
} from "../../src/models/init-models";

async function clearData(models: { [key: string]: typeof Model }) {
  for (const model of Object.values(models)) {
    await model.truncate({ cascade: true });
  }
}

async function addData(
  data: TestData,
  models: { [key: string]: typeof Model },
) {
  for (const [key, value] of Object.entries(data)) {
    for (const elem of value) {
      const instance = new models[key](elem);
      await instance.save();
    }
  }
}

export type TestData = {
  student?: StudentAttributes[];
  fbtoken?: FbTokenAttributes[];
  groupmembers?: GroupMembersAttributes[];
  joinrequest?: JoinRequestAttributes[];
  notification?: NotificationAttributes[];
  studentgroup?: StudentGroupAttributes[];
};

export async function initDB(data: TestData) {
  const models = initModels(sequelize);
  const lowercaseModels = getModelMapping(models);
  await clearData(lowercaseModels);
  await addData(data, lowercaseModels);
}

function getModelMapping(models: { [key: string]: typeof Model }) {
  return Object.fromEntries(
    Object.entries(models).map((x) => [x[0].toLowerCase(), x[1]]),
  );
}
