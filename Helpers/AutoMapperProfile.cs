using AutoMapper;
using Kormon.Models;
using System.IO;
namespace Kormon.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DriveInfo, LogicalDriveInfo>().ForMember(drive => drive.RootDirectory, opt => opt.Ignore());
        }
    }
}
