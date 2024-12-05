import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Column, Model, Table } from "sequelize-typescript";



class Professor extends Model {
    @Column({
        type: DataTypes.INTEGER,
        primaryKey: true,
    })
    public override id!: number;
}
sequelize.addModels([Professor]);

export default Professor;