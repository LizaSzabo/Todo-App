using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoapp.DAL;
using todoapp.Models;
using todoapp.Todos_Bl;

namespace todoapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoesController : ControllerBase
    {
        private readonly TodoManager _tm;
        private readonly TodoDbContext _context;

        public TodoesController(TodoDbContext context)
        {
            _context = context;
            _tm =  new TodoManager(context);
        }

      
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodosSet() => await _tm.GetSet();


        
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _tm.GetTodo(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, [FromForm] Todo todo)
        {
            if (id != todo.ID)
            {
                return BadRequest();
            }

            _tm.UpdateTodo(todo);
         

            try
            {
                await  _tm.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

       
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo([FromForm] Todo todo)
        {
            await _tm.AddTodo(todo);
            await _tm.SaveChanges();
            return CreatedAtAction("GetTodo", new { id = todo.ID }, todo);
        }

       
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todo>> DeleteTodo(int id)
        {
            var todo = await _tm.GetTodo(id);

            if (todo == null)
            {
                return NotFound();
            }
            
            await _tm.DeleteTodo((Todo)todo);
            await _tm.SaveChanges();
           

            return todo;
        }

        private bool TodoExists(int id)
        {
            return _tm.ExistTodo(id);
        }
    }
}
