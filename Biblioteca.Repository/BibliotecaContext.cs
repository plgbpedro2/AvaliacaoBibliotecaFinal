using Biblioteca.Domain;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Repository
{
    public class BibliotecaContext : DbContext
    {
         
         public BibliotecaContext(DbContextOptions<BibliotecaContext> options): base (options) {}

        // cria o DbSet para classe Livro
        public DbSet<Livro> Livros { get; set; }


    }
}