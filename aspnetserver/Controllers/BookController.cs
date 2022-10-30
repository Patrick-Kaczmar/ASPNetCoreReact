using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnetserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public BookController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> Get()
        {
            var books = await _dataContext.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetOne(int id)
        {
            //var book = await _dataContext.Books.FindAsync(id);
            //if (book == null) return NotFound($"Could not find a book with the id of {id}");
            //return Ok(book);
            if (await _dataContext.Books.FirstOrDefaultAsync(b => b.id == id) is Book book) return Ok(book);
            return NotFound($"Could not find a book with the id of {id}");
        }

        [HttpPost]
        public async Task<ActionResult<List<Book>>> Create(Book request)
        {
            await _dataContext.Books.AddAsync(request);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Books.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Book>>> Update(Book request)
        {
            var book = await _dataContext.Books.FindAsync(request.id);
            if (book == null) return NotFound($"Could not find a book with the id of {request.id}");
            book.title = request.title;
            book.summary = request.summary;
            book.price = request.price;
            book.type = request.type;

            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Books.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> Delete(int id)
        {
            if (await _dataContext.Books.FirstOrDefaultAsync(b => b.id == id) is Book book)
            {
                _dataContext.Books.Remove(book);
                await _dataContext.SaveChangesAsync();
                return Ok(book);
            }
            return NotFound($"Could not find a book with the id of {id}");
        }
    }
}
