import { CustomBaseEntity } from "src/common/entities";
import { Column, Entity, OneToMany } from "typeorm"
import { UserBranch } from "./user-branch";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {

    @Column({ type: 'varchar', nullable: true })
    first_name: string;

    @Column({ type: 'varchar', nullable: true })
    sur_name: string;

    @Column({ type: 'varchar', nullable: true })
    middle_name: string;

    @Column({ type: 'varchar', unique: true })
    phone: string;

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'date', nullable: true })
    phone_verified_at: string;

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    email: string;

    @OneToMany(type => UserBranch, userBranch => userBranch.user)
    branches: UserBranch[];

    // @Expose()
    get avatar_url(): string | null {
        return this.avatar ? `${process.env.APP_URL}/${this.avatar}` : null;
    }

}
