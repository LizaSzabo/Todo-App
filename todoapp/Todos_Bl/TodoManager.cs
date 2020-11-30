using Microsoft.AspNetCore.Mvc;
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

        public  Task<Todo> GetTodo(int id)
        {
            return  todos.GetTodo(id);
        }

        public async Task<bool> AddTodo([FromForm] Todo todo)
        {
            todos.AddTodo(todo);
            return true;


        }

        public void DeleteTodo(Todo todo)
        {
            todos.DeleteTodo(todo);
        }

        public async Task<Int32> SaveChanges()
        {
            return await todos.SaveChanges();
        }

        public void UpdateTodo([FromForm] Todo todo)
        {
            todos.Update(todo);
        }

        public bool  ExistTodo(int id)
        {
            return todos.Exists(id);
        }
    }
}
