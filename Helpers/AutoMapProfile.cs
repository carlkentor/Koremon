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
            CreateMap<DriveInfo, LogicalDriveInfo>().ForMember(x => x.FormattedAvailableFreeSpace, opt => opt.ResolveUsing(c => c.AvailableFreeSpace.ByteSize()))
                                                    .ForMember(x => x.FormattedTotalFreeSpace, opt => opt.ResolveUsing(c => c.TotalFreeSpace.ByteSize()))
                                                    .ForMember(x => x.FormattedTotalSize, opt => opt.ResolveUsing(c => c.TotalSize.ByteSize()))
                                                    .ForMember(x => x.FormattedUsedSpace, opt => opt.ResolveUsing(c => (c.TotalSize - c.AvailableFreeSpace).ByteSize()))
                                                    .ForMember(x => x.Name, opt => opt.ResolveUsing(c => c.Name.Replace("\"", "")))
                                                    .ForMember(x => x.FormattedDriveType, opt => opt.ResolveUsing(c => c.DriveType.ToString()))
                                                    .Ignore(x => x.RootDirectory);
        }
    }
}
