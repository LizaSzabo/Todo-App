using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp.Models;
using Microsoft.EntityFrameworkCore;


namespace todoapp.DAL
{
    public class TodoDbContext: DbContext
    {
        public DbSet<Todo> TodosSet { get; set; }

        public TodoDbContext() : base()
        {

        }

        public TodoDbContext(DbContextOptions options) : base(options)
        {

        }
    }

}
