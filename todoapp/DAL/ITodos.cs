// <copyright file="ITodos.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.DAL
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Todoapp.Models;

    /// <summary>
    /// interface, amely összefoglalja az adatbázist kezelő függvényeket.
    /// </summary>
    public interface ITodos
    {
        /// <summary>
        /// lekérdezi az adatbázisban tárolt összes todo elem listáját.
        /// </summary>
        /// <param name="name">todo megadható a címe szerint.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name = null);

        /// <summary>
        /// egy teendőt kérdez le, a paraméterként megadott id-ja alapján azonosítva.
        /// </summary>
        /// <param name="id">A todo azonosítására szolgál.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        Task<Todo> GetTodo(int id);

        /// <summary>
        /// megvalósítja a paraméterben kapott todo hozzáadását az  adatbázishoz.
        /// </summary>
        /// <param name="todo">A hozzáadni kívánt todo elem.</param>
        void AddTodo([FromForm] Todo todo);

        /// <summary>
        /// megvalósítja a paraméterben kapott todo törlését az adatbázisból.
        /// </summary>
        /// <param name="todo">A törölni kívánt todo elem.</param>
        void DeleteTodo(Todo todo);

        /// <summary>
        /// elmenti a megvalósított változásokat.
        /// </summary>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        Task<int> SaveChanges();

        /// <summary>
        /// megváltoztat egy todo elemet, amely már létezet az adatbázisban.
        /// </summary>
        /// <param name="todo">A módosítani kívánt todo elem.</param>
        void Update([FromForm] Todo todo);

        /// <summary>
        /// megvizsgálja, ha a paraméterben megadott id-jú todo létezik-e az adatbázisban.
        /// </summary>
        /// <param name="todo_id">A todo azonosítására szolgál.</param>
        /// <returns> Egy bool változó, amely tartalmazza az igazságértékét,annak ha létezik az elem az adatbázisban.</returns>
        bool Exists(int todo_id);
    }
}
