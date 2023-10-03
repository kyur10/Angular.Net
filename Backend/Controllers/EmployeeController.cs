using DotNet2Try.BL.Model.Dto;
using DotNet2Try.BL.Model.Entities;
using DotNet2Try.BL.Interfaces.Repository;
using Microsoft.AspNetCore.Mvc;
using DotNet2Try.DAL;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext context;

    public EmployeeController(AppDbContext context)
    {
        this.context = context;
    }


    [HttpGet(nameof(Employees))]
    public IActionResult Employees(string? code)
    {
        if (code == null)
            return Ok(context.Employees.ToList());
        else
            return Ok(context.Employees.FirstOrDefault(o => o.Code == code));
    }

    [HttpGet(nameof(EmployeeMap))]
    public IActionResult EmployeeMap()
    {
        var empList = context.Employees.ToList();
        var empMap = empList.ToDictionary(a => a.Code);
        return Ok(empMap);
    }

    [HttpPost(nameof(Employees))]
    public IActionResult Employees(Employee obj)
    {
        context.Employees.Add(obj);
        context.SaveChanges();
        return Ok();
    }

    [HttpDelete(nameof(Employee))]
    public IActionResult Employee(string code)
    {
        Employee? emp = context.Employees.FirstOrDefault(o => o.Code == code);
        if (emp == null) return BadRequest();
        context.Employees.Remove(emp);
        context.SaveChanges();
        return Ok();
    }
}