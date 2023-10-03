using DotNet2Try.BL.Interfaces.Repository;
using DotNet2Try.BL.Interfaces.Services;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.DAL;
using DotNet2Try.DAL.Repositories;
using DotNet2Try.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;

namespace DotNet2Try.Configurations
{
    public static class ModuleConfig
    {
        public static void AddAppServices(this IServiceCollection _services)
        {
            _services.AddScoped<IUnitOfWork, UnitOfWork>();
            _services.AddScoped<IUserService, UserService>();
        }

        public static void AddPersistence(this IServiceCollection _services, IConfiguration _configuration)
        {
            _services.AddDbContext<AppDbContext>(o => o.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
        }

        public static CookieOptions GetCookieOptions()
        {
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                Expires = DateTimeOffset.Now.AddMinutes(10),
                SameSite = SameSiteMode.None
            };
            return cookieOptions;
        }

        public static void AddAppIdentity(this IServiceCollection _services)
        {
            _services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
            _services.AddAuthentication().AddCookie(o =>
            {
                o.Cookie.HttpOnly = false;
                o.Cookie.Expiration = TimeSpan.FromMinutes(7);
                o.Cookie.SameSite = SameSiteMode.None;
            });
            //_services.AddSession(o =>
            //{
            //    o.IdleTimeout = TimeSpan.FromMinutes(5);
            //    o.Cookie.HttpOnly = true;
            //    o.Cookie.IsEssential = true;
            //});
        }

        public static void AddAppAuthorization(this IServiceCollection _services)
        {
            _services.AddAuthorization(config =>
                {
                    config.AddPolicy("Admin", policyBuilder => policyBuilder.RequireClaim(ClaimTypes.Role, "Admin"));
                });
        }

        public static void AddJwtAuthentication(this IServiceCollection _services)
        {
            var key = TokenConfig.Jwt_pk;

            _services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            _services.AddSwaggerAuth();
        }

        public static void AddSwaggerAuth(this IServiceCollection _services)
        {
            _services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                   "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
                   "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
                   "Example: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });
            });
        }

    }
}