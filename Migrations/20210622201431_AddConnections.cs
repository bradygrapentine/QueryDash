using Microsoft.EntityFrameworkCore.Migrations;

namespace QueryDash.Migrations
{
    public partial class AddConnections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DashPanel",
                columns: table => new
                {
                    DashesId = table.Column<int>(type: "integer", nullable: false),
                    PanelsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DashPanel", x => new { x.DashesId, x.PanelsId });
                    table.ForeignKey(
                        name: "FK_DashPanel_Dashes_DashesId",
                        column: x => x.DashesId,
                        principalTable: "Dashes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DashPanel_Panels_PanelsId",
                        column: x => x.PanelsId,
                        principalTable: "Panels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedLinks_DashId",
                table: "SavedLinks",
                column: "DashId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedLinks_UserId",
                table: "SavedLinks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelAssignments_DashId",
                table: "PanelAssignments",
                column: "DashId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelAssignments_PanelId",
                table: "PanelAssignments",
                column: "PanelId");

            migrationBuilder.CreateIndex(
                name: "IX_Dashes_UserId",
                table: "Dashes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DashPanel_PanelsId",
                table: "DashPanel",
                column: "PanelsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dashes_Users_UserId",
                table: "Dashes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PanelAssignments_Dashes_DashId",
                table: "PanelAssignments",
                column: "DashId",
                principalTable: "Dashes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PanelAssignments_Panels_PanelId",
                table: "PanelAssignments",
                column: "PanelId",
                principalTable: "Panels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedLinks_Dashes_DashId",
                table: "SavedLinks",
                column: "DashId",
                principalTable: "Dashes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedLinks_Users_UserId",
                table: "SavedLinks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dashes_Users_UserId",
                table: "Dashes");

            migrationBuilder.DropForeignKey(
                name: "FK_PanelAssignments_Dashes_DashId",
                table: "PanelAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_PanelAssignments_Panels_PanelId",
                table: "PanelAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedLinks_Dashes_DashId",
                table: "SavedLinks");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedLinks_Users_UserId",
                table: "SavedLinks");

            migrationBuilder.DropTable(
                name: "DashPanel");

            migrationBuilder.DropIndex(
                name: "IX_SavedLinks_DashId",
                table: "SavedLinks");

            migrationBuilder.DropIndex(
                name: "IX_SavedLinks_UserId",
                table: "SavedLinks");

            migrationBuilder.DropIndex(
                name: "IX_PanelAssignments_DashId",
                table: "PanelAssignments");

            migrationBuilder.DropIndex(
                name: "IX_PanelAssignments_PanelId",
                table: "PanelAssignments");

            migrationBuilder.DropIndex(
                name: "IX_Dashes_UserId",
                table: "Dashes");
        }
    }
}
