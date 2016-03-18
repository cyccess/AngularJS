using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Enyim.Caching;
using Enyim.Caching.Memcached;

namespace AngularJs.Controllers
{
    public class AngularJsController : Controller
    {
        // GET: AngularJs
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult View1()
        {
            return PartialView();
        }


        public ActionResult Route()
        {
            return View();
        }

        public ActionResult MyApp()
        {
            return View();
        }



        public ActionResult EChart()
        {
            return View();
        }
    }
}