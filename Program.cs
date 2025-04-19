using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZooSalesMarket.Data;

var builder = WebApplication.CreateBuilder(args);


ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// ������������� �������� HTTP-��������
Configure(app, app.Environment);

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // ��������� �������� ���� ������
    services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

    // ��������� ����������� � ���������������
    services.AddControllersWithViews();
}

void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseStaticFiles();
    app.UseRouting();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        // ��������� fallback ��� index.html
        //endpoints.MapFallbackToFile("App.js");
    });
}
