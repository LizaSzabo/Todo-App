﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp.DAL;
using todoapp.Models;

namespace todoapp.Todos_Bl
{
    public class TodoManager
    {
       
        private readonly TodoDbContext _context;
        private readonly Todos todos;


        public TodoManager(TodoDbContext context)
        {
            _context = context;
            this.todos = new Todos(_context);
        }


        public async Task<ActionResult<IEnumerable<Todo>>> GetSet(string nameToSearchFor = null) =>
          await todos.GetTodos(nameToSearchFor);
        

    }
}
