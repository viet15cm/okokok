namespace DemoWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class createdatabaseQLCQ : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        MaKhachHang = c.String(nullable: false, maxLength: 128),
                        TenKhachHang = c.String(),
                        Email = c.String(),
                        SoDienThoai = c.String(),
                        CongTy = c.String(),
                    })
                .PrimaryKey(t => t.MaKhachHang);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
