using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Kormon.Controllers
{
    [Route("api/[controller]")]
    public class MonitorController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<DriveInfo> LoadDrives()
        {
            return DriveInfo.GetDrives().ToList().Select(x => new Models.DriveInfo
            {

                VolumeLabel = x.VolumeLabel,
                DriveFormat = x.DriveFormat,
                Name = x.Name,
                DriveType = x.DriveType,
                AvailableFreeSpace = x.AvailableFreeSpace,
                IsReady = x.IsReady,
                TotalFreeSpace = x.TotalFreeSpace,
                TotalSize = x.TotalSize,
                //RootDirectory = x.RootDirectory //React is unable to resolve this object, map the type RotDirectory to new object React friendly object instead
            });
        }
    }
}
