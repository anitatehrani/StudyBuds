import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "student_group",
  schema: "studybuds",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Group extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  public override id!: number;
  @Column({
    type: DataTypes.STRING(40),
    allowNull: false,
  })
  public name!: string;
  @Column({
    type: DataTypes.STRING(100),
  })
  public description?: string;
  @Column({
    type: DataTypes.SMALLINT,
    allowNull: false,
    field: "members_limit",
  })
  public membersLimit!: number;
  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "is_public",
  })
  public isPublic!: boolean;
  @Column({
    type: DataTypes.STRING(60),
    allowNull: false,
  })
  public course!: string;
  @Column({
    type: DataTypes.STRING(100),
    field: "telegram_link",
  })
  public telegramLink?: number;
  @Column({
    type: DataTypes.INTEGER,
    field: "telegram_id",
  })
  public telegramId?: number;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "admin_id",
  })
  public adminId!: number;
}
sequelize.addModels([Group]);

export default Group;
