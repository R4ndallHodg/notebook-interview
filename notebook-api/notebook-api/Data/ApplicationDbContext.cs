using Microsoft.EntityFrameworkCore;
using notebook_api.Domain;

namespace notebook_api.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }
    }
}
