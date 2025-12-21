using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NotesBackend.Models;
using Scalar.AspNetCore;
using System.Security.Claims;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


builder.Services.AddAuthentication("Bearer").AddJwtBearer("Bearer", options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "MyNotes",
        ValidAudience = "MyNotesWeb",
        RoleClaimType = ClaimTypes.Role,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("rIAzo6rJIfHJEM5gHmIki1xgi9LQB37L"))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapScalarApiReference();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
