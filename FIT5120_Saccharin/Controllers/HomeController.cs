using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FIT5120_Enigma_Buri.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult SugarAnalysis()
        {
            return View();
        }
        public ActionResult Bmi()
        {
            return View();
        }
        public ActionResult Whatissugar()
        {
            return View();
        }
        public ActionResult Exercise()
        {
            return View();
        }
        public ActionResult Alternative()
        {
            return View();
        }
        public ActionResult Stress()
        {
            return View();
        }
        public ActionResult Stressmanagement()
        {
            return View();
        }

        public ActionResult Sugartype()
        {
            return View();
        }
    }

}