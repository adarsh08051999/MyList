import {MigrationInterface, QueryRunner} from "typeorm";

export class MyListDb1719788769981 implements MigrationInterface {
    name = 'MyListDb1719788769981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "my_list_data" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "movie_list" character varying array DEFAULT ARRAY[]::varchar[], "tv_show_list" character varying array DEFAULT ARRAY[]::varchar[], "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc8eae52154f8cfaf5395f477a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4b9412272d8b39a77b9759aaca" ON "my_list_data" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4b9412272d8b39a77b9759aaca"`);
        await queryRunner.query(`DROP TABLE "my_list_data"`);
    }

}
