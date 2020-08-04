using DemoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebAPI.Controllers
{
    public class DefaultController : ApiController
    {
        // GET: api/Default
        [Route("viet")]
        [HttpGet]
        public string Get()
        {
            return "viet dep trai";
        }

        // GET: api/Default/5
        
        [HttpGet]
        public string Get(int val , int age)
        {
            return val.ToString() + age.ToString();
        }

        // POST: api/Default
        [Route("post-student/{name}")]
        public Student PostStudent([FromUri]string name, [FromBody]Student student)
        {
            return student;
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }
    }
}
