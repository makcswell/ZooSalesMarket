using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZooSalesMarket.Data;

var builder = WebApplication.CreateBuilder(args);


ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// Конфигурируем конвейер HTTP-запросов
Configure(app, app.Environment);

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // Добавляем контекст базы данных
    services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

    // Добавляем контроллеры с представлениями
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

        // Добавляем fallback для index.html
        //endpoints.MapFallbackToFile("App.js");
    });
}
