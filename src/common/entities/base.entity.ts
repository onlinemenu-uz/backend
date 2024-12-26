import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class CustomBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @Column({
        type: 'boolean',
        default: true,
    })
    is_active: boolean;

    @Exclude({ toPlainOnly: true })
    @CreateDateColumn()
    created_at: Date;

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn()
    updated_at: Date;

    @Exclude({ toPlainOnly: true })
    @DeleteDateColumn()
    deleted_at: Date;
}