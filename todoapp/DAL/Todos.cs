// <copyright file="Todos.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.DAL
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Todoapp.Models;

    /// <summary>
    /// megvalósítja az Itodos.cs interface osztályait.
    /// </summary>
    public class Todos : ITodos
    {
        private readonly TodoDbContext context;

        /// <summary>
        /// Initializes a new instance of the <see cref="Todos"/> class.
        /// </summary>
        /// <param name="context">Az adatbázis elérését teszi lehetővé.</param>
        public Todos(TodoDbContext context) => this.context = context;

        /// <inheritdoc/>
        public void AddTodo([FromForm] Todo todo)
        {
            this.context.TodosSet.Add(todo);
        }

        /// <inheritdoc/>
        public void DeleteTodo([FromForm] Todo todo)
        {
            this.context.TodosSet.Remove(todo);
        }

        /// <inheritdoc/>
        public bool Exists(int todo_id)
        {
            return this.context.TodosSet.Any(e => e.ID == todo_id);
        }

        /// <inheritdoc/>
        public async Task<Todo> GetTodo(int id)
        {
            return await this.context.TodosSet.FindAsync(id);
        }

        /// <inheritdoc/>
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name)
        {
            return await this.context.TodosSet.ToArrayAsync();
        }

        /// <inheritdoc/>
        public async Task<int> SaveChanges()
        {
            return await this.context.SaveChangesAsync();
        }

        /// <inheritdoc/>
        public void Update([FromForm] Todo todo)
        {
            this.context.Entry(todo).State = EntityState.Modified;
        }
    }
}
