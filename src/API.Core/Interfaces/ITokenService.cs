using API.Core.DbModels.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
