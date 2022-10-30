using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnetserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankUserController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public BankUserController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<BankUser>>> Get()
        {
            return Ok(await _dataContext.BankUsers.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BankUser>> GetOne(int id)
        {
            if (await _dataContext.BankUsers.FirstOrDefaultAsync(u => u.Id == id) is BankUser user)
            {
                return Ok(user);
            }
            return NotFound($"Could not find user with the id of {id}.");
        }
        [HttpPost]
        public async Task<ActionResult<List<BankUser>>> Create(BankUser request)
        {
            await _dataContext.BankUsers.AddAsync(request);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.BankUsers.ToListAsync());
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BankUser>> Update(int id, BankUser user)
        {
            if (await _dataContext.BankUsers.FirstOrDefaultAsync(u => u.Id == id) is BankUser result)
            {
                result.FName = user.FName;
                result.LName = user.LName;
                result.Balance = user.Balance;
                result.Username = user.Username;
                result.Password = user.Password;
                await _dataContext.SaveChangesAsync();

                return Ok(result);
            }
            return NotFound($"Could not find user to update with the id of {id}.");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<BankUser>>> Delete(int id)
        {
            if (await _dataContext.BankUsers.FirstOrDefaultAsync(u => u.Id == id) is BankUser result)
            {
                _dataContext.BankUsers.Remove(result);
                await _dataContext.SaveChangesAsync();
                return Ok(await _dataContext.BankUsers.ToListAsync());
            }
            return NotFound($"Could not find user with the id of {id}");
        }
    }
}
