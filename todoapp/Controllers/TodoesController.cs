// <copyright file="TodoesController.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
namespace Todoapp.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Todoapp.DAL;
    using Todoapp.Models;
    using Todoapp.Todos_Bl;

    /// <summary>
    /// A controllert megvalósító osztály.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TodoesController : ControllerBase
    {
        private readonly TodoManager tm;
        private readonly TodoDbContext context;

        /// <summary>
        /// Initializes a new instance of the <see cref="TodoesController"/> class.
        /// </summary>
        /// <param name="context">Az adatbázis elérését teszi lehetővé.</param>
        public TodoesController(TodoDbContext context)
        {
            this.context = context;
            this.tm = new TodoManager(context);
        }

        /// <summary>
        /// visszaadja a weboldalnak a todo elemek listáját. GET kérésre válaszoló metódus.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodosSet()
        {
            return await this.tm.GetSet();
        }

        /// <summary>
        /// visszaadja a weboldalnak a paraméterben megadott id-jú elemet. GET kérésre válaszoló metódus.
        /// </summary>
        /// <param name="id">Az id a todo elem azonosítására szolgál.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await this.tm.GetTodo(id);

            if (todo == null)
            {
                return this.NotFound();
            }

            return todo;
        }

        /// <summary>
        /// PUT kérést kiszolgáló metódus.
        /// Kezeli a felhasználó által a weboldalon végzett todo módosításokat,
        /// továbbadja a módosítási feladatot az üzleti rétegnek, további validációk elvégzése céljából.
        /// </summary>
        /// <param name="id">A todo azonosítására szolgál.</param>
        /// <param name="todo">A módosított elem, új tulajdonságokkal.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, [FromForm] Todo todo)
        {
            if (id != todo.ID)
            {
                return this.BadRequest();
            }

            this.tm.UpdateTodo(todo);

            try
            {
                await this.tm.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.TodoExists(id))
                {
                    return this.NotFound();
                }
                else
                {
                    throw;
                }
            }

            return this.NoContent();
        }

        /// <summary>
        /// POST kérést kiszolgáló metódus.
        /// Kezeli a felhasználó által a weboldalon végzett megadott új adat elmentését.
        /// Továbbítja a hozzáadási feladatot az üzleti rétegnek, további validációk elvégzése céljából.
        /// </summary>
        /// <param name="todo">Az újonnan megadott todo elem.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo([FromForm] Todo todo)
        {
             this.tm.AddTodo(todo);
             await this.tm.SaveChanges();
             return this.CreatedAtAction("GetTodo", new { id = todo.ID }, todo);
        }

        /// <summary>
        /// DELETE kérést kiszolgáló metódus.
        /// </summary>
        /// <param name="id">A todo azonosítására szolgál.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todo>> DeleteTodo(int id)
        {
            var todo = await this.tm.GetTodo(id);

            if (todo == null)
            {
                return this.NotFound();
            }

            this.tm.DeleteTodo((Todo)todo);
            await this.tm.SaveChanges();

            return todo;
        }

        private bool TodoExists(int id)
        {
            return this.tm.ExistTodo(id);
        }
    }
}
