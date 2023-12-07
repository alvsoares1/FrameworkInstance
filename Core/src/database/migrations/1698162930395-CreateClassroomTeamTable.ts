import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateClassroomTeamTable1698162930395 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teams",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "creator_id",
            type: "uuid",
          },
          {
            name: "classroom_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKCreatorClassroomTeam",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["creator_id"],
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
          },
          {
            name: "FKClassroomClassroomTeam",
            referencedTableName: "classrooms",
            referencedColumnNames: ["id"],
            columnNames: ["classroom_id"],
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("teams");
  }

}
