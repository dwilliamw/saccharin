using FIT5120_Enigma_Buri.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FIT5120_Enigma_Buri.Controllers
{
    public class BmiController : Controller
    {
        // GET: Bmi
        public ActionResult GetFemaleData()
        {
            return View();
        }

        public JsonResult GetAllFemale()
        {
            List<FemaleBmi> allFemale = new List<FemaleBmi>();

            // Here "BmiDBEntities1" is dbContext, which is created at the time of model create
            using (BmiDBEntities1 dc1 = new BmiDBEntities1())
            {
                allFemale = dc1.FemaleBmis.ToList();
            }

            return new JsonResult { Data=allFemale, JsonRequestBehavior = JsonRequestBehavior.AllowGet};

        }

        

        public ActionResult GetMaleData()
        {
            return View();
        }

        public JsonResult GetAllMale()
        {
            List<MaleBmi> allMale = new List<MaleBmi>();

            // Here "BmiDBEntities1" is dbContext, which is created at the time of model create
            using (BmiDBEntities1 dc2 = new BmiDBEntities1())
            {
                allMale = dc2.MaleBmis.ToList();
            }

            return new JsonResult { Data = allMale, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}