using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    Log.Information("Building and Starting Web Application for Gharkaam Vendor RESTful Services ...");

    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddSerilog((services, logConfigurer) =>
        logConfigurer
            .ReadFrom.Configuration(builder.Configuration)
            .ReadFrom.Services(services)
    );

    // Add services to the container.

    builder.Services.AddControllers();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception appStrtExcep)
{
    Log.Fatal("Failed Application Startup error: " + appStrtExcep);
}
finally
{
    Log.CloseAndFlush();
}