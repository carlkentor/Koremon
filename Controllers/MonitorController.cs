using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Kormon.Models;
namespace Kormon.Controllers
{
    [Route("api/[controller]")]
    public class MonitorController : Controller
    {
        private readonly IMapper _mapper;
        public MonitorController(IMapper mapper)
        {
            _mapper = mapper;
        }
        [HttpGet("[action]")]
        public IEnumerable<LogicalDriveInfo> LoadDrives()
        {
            return DriveInfo.GetDrives().Select(x => _mapper.Map<LogicalDriveInfo>(x));
        }
    }
}