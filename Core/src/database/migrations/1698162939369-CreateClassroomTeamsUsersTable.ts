import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateClassroomTeamsUsersTable1698162939369 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teams_users",
        columns: [
          {
            name: "team_id",
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
      "teams_users",
      new TableForeignKey({
        name: "FKClassroomTeamUser",
        referencedTableName: "teams",
        referencedColumnNames: ["id"],
        columnNames: ["team_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "teams_users",
      new TableForeignKey({
        name: "FKUserClassroomTeam",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey(
    //   "teams_users",
    //   "FKUserClassroomTeam"
    // );

    // await queryRunner.dropForeignKey(
    //   "teams_users",
    //   "FKClassroomTeamUser"
    // );

    await queryRunner.dropTable("teams_users");
  }
}
