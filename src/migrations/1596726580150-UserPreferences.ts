import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPreferences1596726580150 implements MigrationInterface {
    name = 'UserPreferences1596726580150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_preferences" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "attribute_id" integer, "measuring_unit_id" integer, "user_id" integer, CONSTRAINT "PK_e8cfb5b31af61cd363a6b6d7c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measuring_units" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "attribute_id" integer, CONSTRAINT "PK_8f7e6b23da86972ecceaf7d61d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attributes" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_5f8dc24b36f8bc093760839b23b" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_074a9f7bc78c615a935430ed11c" FOREIGN KEY ("measuring_unit_id") REFERENCES "measuring_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measuring_units" ADD CONSTRAINT "FK_1e4d0a0a52dfbbc8d5cdf8f4bc1" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measuring_units" DROP CONSTRAINT "FK_1e4d0a0a52dfbbc8d5cdf8f4bc1"`);
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_458057fa75b66e68a275647da2e"`);
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_074a9f7bc78c615a935430ed11c"`);
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_5f8dc24b36f8bc093760839b23b"`);
        await queryRunner.query(`DROP TABLE "attributes"`);
        await queryRunner.query(`DROP TABLE "measuring_units"`);
        await queryRunner.query(`DROP TABLE "user_preferences"`);
    }

}
