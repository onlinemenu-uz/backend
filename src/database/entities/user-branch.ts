import { CustomBaseEntity } from "src/common/entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./user";

@Entity()
export class UserBranch extends CustomBaseEntity {

    @Column({ type: 'bigint', nullable: false })
    public user_id: number;

    @Column({ type: 'varchar', length: '50', nullable: false })
    public username: string;

    @Column({ type: 'varchar', length: '255', nullable: false })
    public name: string;

    @Column({ type: 'text', nullable: true })
    public description: string;

    @Column({ type: 'varchar', length: '15', nullable: true })
    public phone_number: string;

    @Column({ type: 'varchar', length: '255', nullable: true })
    public logo: string;

    @Column({ type: 'varchar', length: '255', nullable: true })
    public banner: string;

    @Column({ type: 'json', nullable: true })
    public days_open: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    public minimum_order: number;

    @Column({ type: 'boolean', default: false })
    public is_main: boolean;

    @Column({ type: 'varchar', length: '255', nullable: true })
    public address: string;

    @ManyToOne(type => User, user => user.branches)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
