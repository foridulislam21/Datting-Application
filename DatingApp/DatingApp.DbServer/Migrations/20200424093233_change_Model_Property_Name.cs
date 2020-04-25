using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.DbServer.Migrations
{
    public partial class change_Model_Property_Name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lookingfor",
                table: "Users",
                newName: "LookingFor");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LookingFor",
                table: "Users",
                newName: "Lookingfor");
        }
    }
}
