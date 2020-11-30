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
    }
}
