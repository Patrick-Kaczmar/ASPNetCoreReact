using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<VideoGame> VideoGames { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BankUser> BankUsers { get; set; }
    }
}
