// <copyright file="TodoManager.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.Todos_Bl
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Todoapp.DAL;
    using Todoapp.Models;

    /// <summary>
    /// biztosítja a megjelenítési rétegből érkező adatok validált változatának továbbítását az adatelérési réteghez.
    /// </summary>
    public class TodoManager
    {
        private readonly ITodos todos;
        private readonly TodoDbContext context;

        /// <summary>
        /// Initializes a new instance of the <see cref="TodoManager"/> class.
        /// </summary>
        /// <param name="context">Az adatbázis elérését teszi lehetővé.</param>
        public TodoManager(TodoDbContext context)
        {
            this.context = context;
            this.todos = new Todos(context);
        }

        /// <summary>
        /// visszaadja az adatelérés rétegben megvalósított GetTodos metódus eredményét.
        /// </summary>
        /// <param name="nameToSearchFor">Egy todo megadható a címe szerint is.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        public async Task<ActionResult<IEnumerable<Todo>>> GetSet(string nameToSearchFor = null) =>
          await this.todos.GetTodos(nameToSearchFor);

        /// <summary>
        /// lekérdezi az adatelérési rétegtől a paraméterben kapott id-jú teendőt.
        /// </summary>
        /// <param name="id">A todo azonosítására szolgál.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        public Task<Todo> GetTodo(int id)
        {
            return this.todos.GetTodo(id);
        }

        /// <summary>
        /// továbbadja az adatelérési rétegnek a paraméterben kapott teendőt,
        /// ha megfelel az ellenőrzési feltételeknek. A metódus megvizsgálja,
        /// hogy a todo-nak be vannak-e állítva a kötelező tulajdonságai.
        /// Ha legalább egy kötelező tulajdonságának nincs értéke,
        /// a todo nem kerül tövábbadásra az adatelérési réteghez és a metódus
        /// false visszatérési értékkel tér vissza a megjelenítési rétegbe.
        /// </summary>
        /// <param name="todo">A hozzáadni kívánt todo.</param>
        /// <returns>Egy bool változót a hozzáadási művelet sikerességéről.</returns>
        public bool AddTodo([FromForm] Todo todo)
        {
            if (todo.Title == null || todo.Status == null || todo.Deadline == null || todo.Priority < 1)
            {
                return false;
            }
            else
            {
                this.todos.AddTodo(todo);
                return true;
            }
        }

        /// <summary>
        /// a paraméterben kapot teendőről megviszgálja ha létezik-e az id-ja alapján.
        /// Csak akkor továbbítja a törlési kérést az adatelérési rétegnek, ha létezik a todo.
        /// </summary>
        /// <param name="todo">A törölni kívánt todo.</param>
        /// <returns>Egy bool változót a törlési művelet sikerességéről.</returns>
        public bool DeleteTodo(Todo todo)
        {
            if (this.todos.Exists(todo.ID))
            {
                this.todos.DeleteTodo(todo);
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// meghívja az adatelérési rétegben a művelet mentését megvalósító függvényt.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        public async Task<int> SaveChanges()
        {
            return await this.todos.SaveChanges();
        }

        /// <summary>
        /// a paraméterben kapott teendőt továbbadja módosításra az adatelérési rétegnek,
        /// ha létezik már a teendő és a kötelező paramétereinek új értékei be vannak állítva.
        /// </summary>
        /// <param name="todo">A módosítani kívánt todo.</param>
        public void UpdateTodo([FromForm] Todo todo)
        {
            if ((todo.Title != null) && (todo.Status != null) && (todo.Deadline != null) && (todo.Priority > 0) && this.todos.Exists(todo.ID))
            {
                this.todos.Update(todo);
            }
        }

        /// <summary>
        /// lekérdezi az adatelérési rétegtől,
        /// ha létezik a paraméterben megadott id-jú todo és ennek igazságértékét visszaadja a megjelenítési rétegnek.
        /// </summary>
        /// <param name="id">A todo azonosítására szolgál.</param>
        /// <returns>Egy bool változót az elem létezési igazságértékéről.</returns>
        public bool ExistTodo(int id)
        {
            return this.todos.Exists(id);
        }
    }
}
