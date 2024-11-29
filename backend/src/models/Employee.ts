import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Table, Column, Model } from 'sequelize-typescript';

enum Role{Admin,Operator};

@Table
class Employee extends Model{
    @Column({type:DataTypes.ENUM('Admin', 'Operator'),primaryKey:true})
    declare type:Role;
}

sequelize.addModels([Employee])

Employee.init({},{sequelize})

export default Employee;
