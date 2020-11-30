using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp.Models;

namespace todoapp.DAL
{
    public class Todos : ITodos
    {
        private readonly TodoDbContext _context;



        public Todos(TodoDbContext context)
        {
            _context = context;
        }

        public void AddTodo([FromForm] Todo todo)
        {
            _context.TodosSet.Add(todo);
        }

        public void DeleteTodo([FromForm] Todo todo)
        {
            _context.TodosSet.Remove(todo);
        }

        public bool Exists(int todo_id)
        {
            return _context.TodosSet.Any(e => e.ID == todo_id);
        }

        public async Task<Todo> GetTodo(int id)
        {
            return await _context.TodosSet.FindAsync(id);
        }

        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name)
        {
            return await _context.TodosSet.ToArrayAsync();
        }

        public async Task<int> SaveChanges()
        {
            return await _context.SaveChangesAsync();
        }

        public void Update([FromForm] Todo todo)
        {
            _context.Entry(todo).State = EntityState.Modified;
        }
    }
}
