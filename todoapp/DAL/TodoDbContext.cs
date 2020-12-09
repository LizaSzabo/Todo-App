// <copyright file="TodoDbContext.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.DAL
{
    using Microsoft.EntityFrameworkCore;
    using Todoapp.Models;

    /// <summary>
    /// a DBContext osztály leszármazottja, az adatelérési rétegnek biztosítja az adatbázis elérését.
    /// </summary>
    public class TodoDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TodoDbContext"/> class.
        /// </summary>
        public TodoDbContext()
            : base()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TodoDbContext"/> class.
        /// </summary>
        /// <param name="options">Az adatbázis kontextus további paraméterei.</param>
        public TodoDbContext(DbContextOptions options)
            : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the set of Todo elements.
        /// </summary>
        public DbSet<Todo> TodosSet { get; set; }
    }
}
