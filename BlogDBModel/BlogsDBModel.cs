using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogDBModel
{
    public class BlogsDBModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string AddedBy { get; set; }
        public string DateAdded { get; set; }
        public string UpdatedBy { get; set; }
        public string DateUpdated { get; set; }
    }
}
