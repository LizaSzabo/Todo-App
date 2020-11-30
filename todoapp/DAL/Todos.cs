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

  
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name)
        {
            return await _context.TodosSet.ToArrayAsync();
            

        }
    }
}
