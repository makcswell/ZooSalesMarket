using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;
    using ZooSalesMarket.Controllers;
    using ZooSalesMarket.Data;

using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;

namespace ZooSalesMarket
    {
        public class Startup(IConfiguration config)
        {
            public void ConfigureServices(IServiceCollection services)
            { 

                services.AddScoped<OrdersController>();
            var connectionString = config.GetConnectionString("MyConnection");
            Console.WriteLine($"Connection String: {connectionString}"); 
            services.AddDbContext<AppDbContext>(d => d.UseNpgsql(config.GetConnectionString("MyConnection")),
                    ServiceLifetime.Scoped, ServiceLifetime.Scoped);



                services.AddMemoryCache();

                services.AddCors();
                services.AddMvc();



                services.AddControllers();
                services.AddSwaggerGen(c =>
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.Http,
                        In = ParameterLocation.Header,
                        Name = "Authorization",
                        Scheme = "bearer",
                        BearerFormat = "jwt-bearer",
                        Description =
                            "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                            },
                            Array.Empty<string>()
                        }
                    });
                });
                services.AddRouting(urls => urls.LowercaseUrls = true);

            }

            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                app.UseRouting();
                app.UseAuthentication();
                app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "C:\\Users\\User\\source\\repos\\ZooSalesMarket\\clientzone";
               

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "swagger"; 
            });


            
            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                  
                });
            }
        }
    }