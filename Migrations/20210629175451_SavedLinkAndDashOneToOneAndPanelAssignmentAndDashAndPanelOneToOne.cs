using Microsoft.EntityFrameworkCore.Migrations;

namespace QueryDash.Migrations
{
    public partial class SavedLinkAndDashOneToOneAndPanelAssignmentAndDashAndPanelOneToOne : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PanelAssignments_DashId",
                table: "PanelAssignments",
                column: "DashId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelAssignments_PanelId",
                table: "PanelAssignments",
                column: "PanelId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanelAssignments_Dashes_DashId",
                table: "PanelAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_PanelAssignments_Panels_PanelId",
                table: "PanelAssignments");

            migrationBuilder.DropIndex(
                name: "IX_PanelAssignments_DashId",
                table: "PanelAssignments");

            migrationBuilder.DropIndex(
                name: "IX_PanelAssignments_PanelId",
                table: "PanelAssignments");
        }
    }
}
