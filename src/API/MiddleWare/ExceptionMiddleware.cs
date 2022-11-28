﻿using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.MiddleWare
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;

        // gelen requesti yakalamak için requestdelegate
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.env = env;
            this.logger = logger;
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                context.Response.ContentType= "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = env.IsDevelopment()
                    ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString())
                    : new ApiException((int)HttpStatusCode.InternalServerError);

                var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response,option);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
