using Microsoft.EntityFrameworkCore;
using notebook_api.Data;
using notebook_api.Services;

namespace notebook_api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly string _policyName;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            _policyName  = "_myAllowSpecificOrigins";
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllers();

            // Entity framework core configuration. You can use this instruction to configure database related functionality and services.
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            });

            // Automapper configuration
            services.AddAutoMapper(typeof(Startup));

            services.AddScoped<INoteService, NoteService>();

            services.AddCors(options =>
            {
                string frontendURL = _configuration.GetValue<string>("frontend_url");

                options.AddPolicy(name:_policyName, builder =>

                {
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors(_policyName);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
