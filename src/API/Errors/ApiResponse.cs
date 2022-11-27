using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode,string message=null)
        {
            this.StatusCode = statusCode;
            this.Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            string errorMesage = string.Empty;
            switch (statusCode)
            {
                case 400:
                    errorMesage = "Bad Request!";
                    break;
                case 401:
                    errorMesage = "Authorized Error!";
                    break;
                case 404:
                    errorMesage = "Resource Not Found!";
                    break;
                case 500:
                    errorMesage = "Server Error";
                    break;
            }
            return errorMesage;
        }
    }
}
