using Restaurante6.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Restaurante6.Controllers
{
    public class RestauranteAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(RestauranteDB.TblRestaurantes.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblRestaurante value)
        {
            RestauranteDB.TblRestaurantes.Add(value);
            return ToJson(RestauranteDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblRestaurante value)
        {
            RestauranteDB.Entry(value).State = EntityState.Modified;
            return ToJson(RestauranteDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            RestauranteDB.TblRestaurantes.Remove(RestauranteDB.TblRestaurantes.FirstOrDefault(x => x.Id == id));
            return ToJson(RestauranteDB.SaveChanges());
        }
    }
}
