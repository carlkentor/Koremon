using AutoMapper;
using Kormon.Extensions;
using Kormon.Models;
using System.IO;
namespace Kormon.Helpers
{
    public class AutoMapProfile : Profile
    {
        public AutoMapProfile()
        {
            CreateMap<DriveInfo, LogicalDriveInfo>().Ignore(x => x.RootDirectory);
        }
    }
}
