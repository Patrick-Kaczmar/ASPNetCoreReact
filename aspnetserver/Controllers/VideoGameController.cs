using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnetserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoGameController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public VideoGameController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<VideoGame>>> Get()
        {
            return Ok(await _dataContext.VideoGames.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGame>> Get(int id)
        {
            var game = await _dataContext.VideoGames.FindAsync(id);
            if (game == null) return BadRequest("Game not found");
            return Ok(game);
        }

        [HttpPost]
        public async Task<ActionResult<List<VideoGame>>> Post(VideoGame game)
        {
            await _dataContext.VideoGames.AddAsync(game);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.VideoGames.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<VideoGame>> Update(VideoGame request)
        {
            if (await _dataContext.VideoGames.FirstOrDefaultAsync(g => g.Id == request.Id) is VideoGame game){
                
                game.Title = request.Title;
                game.Summary = request.Summary;
                game.Price = request.Price;

                await _dataContext.SaveChangesAsync();
            }
            else
            {
                return BadRequest($"There is currently no game with the id of {request.Id}.");
            }
            return Ok(request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<VideoGame>> Delete(int id)
        {
            var gameToDelete = await _dataContext.VideoGames.FindAsync(id);
            if (gameToDelete == null) return BadRequest($"Could not find game with the id of {id} to delete.");
            _dataContext.VideoGames.Remove(gameToDelete);
            await _dataContext.SaveChangesAsync();

            return Ok(gameToDelete);
        }
    }
}
