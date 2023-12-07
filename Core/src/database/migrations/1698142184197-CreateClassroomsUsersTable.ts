import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateClassroomsUsersTable1698142184197 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "classrooms_users",
        columns: [
          {
            name: "classroom_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
      
    await queryRunner.createForeignKey(
      "classrooms_users",
      new TableForeignKey({
        name: "FKClassroomUser",
        referencedTableName: "classrooms",
        referencedColumnNames: ["id"],
        columnNames: ["classroom_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "classrooms_users",
      new TableForeignKey({
        name: "FKUserClassroom",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "classrooms_users",
      "FKUserClassroom"
    );

    await queryRunner.dropForeignKey(
      "classrooms_users",
      "FKClassroomUser"
    );

    await queryRunner.dropTable("classrooms_users");
  }

}
