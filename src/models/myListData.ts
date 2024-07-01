import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class MyListData extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Index({ unique: true })
  @Column('varchar')
  public userId!: string;

  @Column('varchar', { array: true, nullable: true, default: () => 'ARRAY[]::varchar[]' })
  public movieList: string[];

  @Column('varchar', { array: true, nullable: true, default: () => 'ARRAY[]::varchar[]' })
  public tvShowList: string[];

  @UpdateDateColumn()
  public updatedAt?: Date;
}
