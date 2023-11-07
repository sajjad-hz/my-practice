import {Model, Sequelize   } from 'sequelize'

export * from 'sequelize'

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        port: process.env.DATABASE_PORT
    }
)

export class BaseModel extends Model {
    static find(id) {
        return this.findByPk(id)
    }

    remove(id) {
       return this.destroy(id)
    }
}