using BlogDBModel;
using BlogsLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ASPdotNET_CRUD.Controllers
{
    public class BlogController : Controller
    {
        // GET: Blog
        public ActionResult Index()
        {
            return View();
        }

        BlogList objList;
        [HttpPost]
        public JsonResult Add(BlogsDBModel _dbModel)
        {
            int _result = 0;
            objList = new BlogList();
            _result = objList.Add(_dbModel);
            if (_result > 0)
                return Json(new { success = true });
            else
                return Json(new { success = false });
        }
        [HttpGet]
        public JsonResult GetAll()
        {
            objList = new BlogList();
            List<BlogsDBModel> _dbModelList = new List<BlogsDBModel>();

            _dbModelList = objList.GetAllBlogs();
            return this.Json(_dbModelList, JsonRequestBehavior.AllowGet);
            //return Json(1);

        }
        [HttpPost]
        public JsonResult LoadSelectedBlog(BlogsDBModel _dbModel)
        {
            objList = new BlogList();
            List<BlogsDBModel> _dbModelList = new List<BlogsDBModel>();
            _dbModelList = objList.LoadSelectedBlog(_dbModel);
            return this.Json(_dbModelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteBlog(BlogsDBModel _dbModel)
        {
            int _result = 0;
            objList = new BlogList();
            _result = objList.DeleteBlog(_dbModel);
            if (_result > 0)
                return Json(new { success = true });
            else
                return Json(new { success = false });
        }

        [HttpPost]
        public JsonResult Update(BlogsDBModel _dbModel)
        {
            int _result = 0;
            objList = new BlogList();
            _result = objList.Update(_dbModel);
            if (_result > 0)
                return Json(new { success = true });
            else
                return Json(new { success = false });
        }

        [HttpGet]

        public ActionResult Detail()
        {
            return View();
        }

    }
}