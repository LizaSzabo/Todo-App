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
        private readonly ITodos todos;
        private readonly TodoDbContext _context;


        public TodoManager(TodoDbContext context)
        {
            _context = context;
            todos = new Todos(context);
        }


        public async Task<ActionResult<IEnumerable<Todo>>> GetSet(string nameToSearchFor = null) =>
          await todos.GetTodos(nameToSearchFor);

        public  Task<Todo> GetTodo(int id)
        {
            return  todos.GetTodo(id);
        }

        public async Task<bool> AddTodo([FromForm] Todo todo)
        {
            if (todo.Title == null || todo.Status == null || todo.Deadline == null || todo.Priority < 1){
                return await Task.FromResult(false);
            }
            else {
                todos.AddTodo(todo);
                return await Task.FromResult(true);
            }
        }

        public async Task<bool> DeleteTodo(Todo todo)
        {
            if (todos.Exists(todo.ID))
            {
                todos.DeleteTodo(todo);
                return await Task.FromResult(true);
            }
            else return await Task.FromResult(false);
        }

        public async Task<Int32> SaveChanges()
        {
            return await todos.SaveChanges();
        }

        public void UpdateTodo([FromForm] Todo todo)
        {
            todos.Update(todo);
        }

        public bool  ExistTodo(Int32 id)
        {
            return todos.Exists(id);
        }
    }
}
