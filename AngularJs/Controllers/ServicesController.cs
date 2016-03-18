using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularJs.Models;

namespace AngularJs.Controllers
{
    public class ServicesController : ApiController
    {
        // GET api/<controller>
        public dynamic Get()
        {
            var r = new Random();
            return new { y = r.Next(2000), y1 = r.Next(100) };
        }

        // GET api/<controller>
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<controller>/5
        public User Get(int id)
        {
            var user = new User
            {
                Id = 1,
                Name = "Json",
                Age = 25,
                Message = "AngularJs"
            };
            return user;
        }

        [Route("api/Services/GetLanguage")]
        public string[] GetLanguage()
        {
            return new[] { "AngularJs", "JQuery", "Zepto" };
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}