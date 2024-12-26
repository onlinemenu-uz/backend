import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    /**
     * Add a basic where clause to the query and return the first result.
     */
    async firstWhere(column: string, value: string | number, operator = '='): Promise<User | undefined> {
        return await this.createQueryBuilder()
            .where(`Team.${column} ${operator} :value`, { value: value })
            .getOne();
    }
}