using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DemoWebAPI.DBContextLayer;
using DemoWebAPI.Models;

namespace DemoWebAPI.Controllers
{
    public class CustomersController : ApiController
    {
        private CoQuanDBContext db = new CoQuanDBContext();

        // GET: api/Customers
        public async Task<IHttpActionResult> GetCustomers()
        {
            var customers = await db.Customers.ToArrayAsync();
            if(!ModelState.IsValid)
            {
                var c = NotFound();
                return NotFound();
            }
            var x = Ok(customers);
            return Ok(customers);
        }

        // GET: api/Customers/5
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> GetCustomer(string id)
        {
            Customer customer = await db.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            var c = Ok(customer);
            return c;
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCustomer(string id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.MaKhachHang)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var ok = StatusCode(HttpStatusCode.NoContent);

            return ok;
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> PostCustomer(Customer customer)
        {
           
            if (!ModelState.IsValid)
            {
                var c = BadRequest(ModelState);
                return c;
            }

            db.Customers.Add(customer);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.MaKhachHang))
                {
                   
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            var x = CreatedAtRoute("DefaultApi", new { id = customer.MaKhachHang }, customer);
            return x;
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> DeleteCustomer(string id)
        {
            Customer customer = await db.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            await db.SaveChangesAsync();
            var c = Ok("Da Xoa thanh cong");

            return c;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(string id)
        {
            return db.Customers.Count(e => e.MaKhachHang == id) > 0;
        }
    }
}