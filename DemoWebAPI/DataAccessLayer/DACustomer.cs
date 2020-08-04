using DemoWebAPI.DBContextLayer;
using DemoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace DemoWebAPI.DataAccessLayer
{
    public class DACustomer
    {
        public static async Task<ICollection<Customer>> GetCustomers()
        {

            var context = new CoQuanDBContext();
            var items = await context.Customers.ToListAsync() ;

            context.Dispose();

            return items;
        }
    }
}