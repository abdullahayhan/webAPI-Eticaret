using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Infrastructure.Migrations
{
    public partial class tryToSeedData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adresses_AspNetUsers_AppUserID",
                table: "Adresses");

            migrationBuilder.DropIndex(
                name: "IX_Adresses_AppUserID",
                table: "Adresses");

            migrationBuilder.RenameColumn(
                name: "AppUserID",
                table: "Adresses",
                newName: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Adresses_AppUserId",
                table: "Adresses",
                column: "AppUserId",
                unique: true,
                filter: "[AppUserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Adresses_AspNetUsers_AppUserId",
                table: "Adresses",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adresses_AspNetUsers_AppUserId",
                table: "Adresses");

            migrationBuilder.DropIndex(
                name: "IX_Adresses_AppUserId",
                table: "Adresses");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Adresses",
                newName: "AppUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Adresses_AppUserID",
                table: "Adresses",
                column: "AppUserID",
                unique: true,
                filter: "[AppUserID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Adresses_AspNetUsers_AppUserID",
                table: "Adresses",
                column: "AppUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
