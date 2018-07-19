using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Kormon.Models;
using Microsoft.Extensions.Logging;
using System;

namespace Kormon.Controllers
{
    [Route("api/[controller]")]
    public class MonitorController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        public MonitorController(IMapper mapper, ILogger<MonitorController> logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<LogicalDriveInfo> LoadDrives()
        {
            try
            {
                return DriveInfo.GetDrives().Select(x => _mapper.Map<LogicalDriveInfo>(x));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex.StackTrace);
                throw ex;
            }
        }
    }
}