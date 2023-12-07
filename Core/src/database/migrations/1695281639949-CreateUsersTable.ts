import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1695281639949 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "fullname",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "gender",
            type: "varchar",
          },
          {
            name: "role",
            type: "int",
          },
          {
            name: "registration",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ]
      })
    );
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
  
}
  