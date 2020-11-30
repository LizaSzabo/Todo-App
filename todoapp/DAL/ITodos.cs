using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp.Models;

namespace todoapp.DAL
{
    public interface ITodos
    {
        Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name = null);
        Task<Todo> GetTodo(int id);
        void AddTodo([FromForm] Todo todo);
        void DeleteTodo(Todo todo);
        Task<Int32> SaveChanges();
        void Update([FromForm] Todo todo);
        bool Exists(int todo_id);
    }
}
