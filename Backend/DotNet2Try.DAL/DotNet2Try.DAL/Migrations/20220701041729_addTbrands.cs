﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet2Try.DAL.Migrations
{
    public partial class addTbrands : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TBrands",
                columns: table => new
                {
                    Id = table.Column<bool>(type: "bit", nullable: false),
                    TBrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updated_At = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TBrands", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TBrands");
        }
    }
}
