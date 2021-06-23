using Microsoft.EntityFrameworkCore.Migrations;

namespace QueryDash.Migrations
{
    public partial class ConnectSavedLinksandDashes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_SavedLinks_DashId",
                table: "SavedLinks",
                column: "DashId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedLinks_Dashes_DashId",
                table: "SavedLinks",
                column: "DashId",
                principalTable: "Dashes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedLinks_Dashes_DashId",
                table: "SavedLinks");

            migrationBuilder.DropIndex(
                name: "IX_SavedLinks_DashId",
                table: "SavedLinks");
        }
    }
}
