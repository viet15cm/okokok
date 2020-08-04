using DemoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DemoWebAPI.DBContextLayer
{
    public class CoQuanDBContext : DbContext
    {
        public CoQuanDBContext() : base("name=QLCQ")
        {
        }
        public DbSet<Customer> Customers { get; set; }
    }
}