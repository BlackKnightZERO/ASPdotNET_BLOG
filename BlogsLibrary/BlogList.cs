using BlogCommon;
using BlogDBModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogsLibrary
{
    public class BlogList
    {

        public int Add(BlogsDBModel _dbModel)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dCmd = new SqlCommand("SP_SET_TBL_BLOG", conn);
            dCmd.CommandType = CommandType.StoredProcedure;
            try
            {
                //dCmd.Parameters.AddWithValue("@id", _dbModel.id);
                dCmd.Parameters.AddWithValue("@title", _dbModel.title);
                dCmd.Parameters.AddWithValue("@description", _dbModel.description);
                dCmd.Parameters.AddWithValue("@AddedBy", "Admin");
                //dCmd.Parameters.AddWithValue("@DateAdded", _dbModel.DateAdded);
                //dCmd.Parameters.AddWithValue("@UpdatedBy", _dbModel.Country);
                //dCmd.Parameters.AddWithValue("@DateUpdated", _dbModel.City);

                //if (_dbModel.AdminID > 0)
                //    dCmd.Parameters.AddWithValue("@QryOption", 2);
                //else
                //    dCmd.Parameters.AddWithValue("@QryOption", 1);
                dCmd.Parameters.AddWithValue("@QryOption", 1);
                return dCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                //UtilityOptions.ErrorLog(ex.ToString(), MethodBase.GetCurrentMethod().Name);
                throw ex;
            }
            finally
            {
                dCmd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }

        public List<BlogsDBModel> GetAllBlogs()
        {
            List<BlogsDBModel> _modelList = new List<BlogsDBModel>();
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("SP_SET_TBL_BLOG", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@QryOption", 3);

            DataTable dt = new DataTable();
            try
            {
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    _modelList = (from DataRow row in dt.Rows
                                  select new BlogsDBModel
                                  {
                                      id = Convert.ToInt32(row["id"].ToString()),
                                      title = row["title"].ToString(),
                                      description = row["description"].ToString(),
                                      //AddedBy = row["AddedBy"].ToString(),
                                      //DateAdded = row["DateAdded"].ToString(),

                                  }).ToList();
                }
                return _modelList;
            }
            catch (Exception ex)
            {
                //UtilityOptions.ErrorLog(ex.ToString(), MethodBase.GetCurrentMethod().Name);
                throw ex;
            }
            finally
            {
                dt.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public List<BlogsDBModel> LoadSelectedBlog(BlogsDBModel _dbModel)
        {
            List<BlogsDBModel> _modelList = new List<BlogsDBModel>();
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("SP_SET_TBL_BLOG", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("id", _dbModel.id);
            dAd.Parameters.AddWithValue("@QryOption", 4);
            DataTable dt = new DataTable();
            try
            {
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    _modelList = (from DataRow row in dt.Rows
                                  select new BlogsDBModel
                                  {
                                      id = Convert.ToInt32(row["id"].ToString()),
                                      title = row["title"].ToString(),
                                      description = row["description"].ToString(),
                                      //AddedBy = row["AddedBy"].ToString(),
                                      //DateAdded = row["DateAdded"].ToString(),
                                  }).ToList();
                }
                return _modelList;
            }
            catch (Exception ex)
            {
                //UtilityOptions.ErrorLog(ex.ToString(), MethodBase.GetCurrentMethod().Name);
                throw ex;
            }
            finally
            {
                dt.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
    }
}
