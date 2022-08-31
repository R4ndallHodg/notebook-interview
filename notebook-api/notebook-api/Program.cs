using notebook_api;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

Startup startup = new(builder.Configuration);
startup.ConfigureServices(builder.Services);

WebApplication app = builder.Build();

var logger = app.Services.GetService(typeof(ILogger<Startup>)) as ILogger<Startup>;

startup.Configure(app, app.Environment);

app.Run();
