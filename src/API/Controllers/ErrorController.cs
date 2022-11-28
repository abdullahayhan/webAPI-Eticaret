using API.Errors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ErrorController : BaseApiController
    {
        [Route("error/{code}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult Index(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
