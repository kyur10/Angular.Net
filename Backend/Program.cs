using DotNet2Try.Configurations;
using DotNet2Try.DAL;
using DotNet2Try.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using DotNet2Try.BL.Interfaces.Repository;

var builder = WebApplication.CreateBuilder(args);
IConfiguration Configuration = builder.Configuration;
IServiceCollection Services = builder.Services;
Services.AddCors(x => x.AddPolicy("polyc", x => x
    // .AllowAnyOrigin()
    // .WithOrigins("http://localhost:4200")
    .SetIsOriginAllowed(_ => true)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()));
Services.AddControllers();
Services.AddEndpointsApiExplorer();
Services.AddSwaggerGen();
Services.AddAutoMapper(typeof(MappingConfig));

Services.AddAppServices();
Services.AddPersistence(Configuration);
Services.AddAppIdentity();
Services.AddAppAuthorization();
Services.AddJwtAuthentication();



#region App Pipeline
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("polyc");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
#endregion
