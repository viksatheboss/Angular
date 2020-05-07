using MvcTaskManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MvcTaskManager.ViewModels
{
    public class ProjectViewModel
    {
       
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        
        public string DateOfStart { get; set; }
        public int? TeamSize { get; set; }
        public bool Active { get; set; }
        public string Status { get; set; }
        public int ClientLocationId { get; set; }

        
        public virtual ClientLocation ClientLocation { get; set; }
    }
}
