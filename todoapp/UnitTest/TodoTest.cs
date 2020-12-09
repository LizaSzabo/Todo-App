// <copyright file="TodoTest.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.UnitTest
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moq;
    using Todoapp.DAL;
    using Todoapp.Models;
    using Todoapp.Todos_Bl;

    /// <summary>
    /// az üzleti rétegbeli metódusok tesztelésére szolgál.
    /// </summary>
    [TestClass]
    public class TodoTest
    {
        /// <summary>
        /// az üzleti rétegbeli AddTodo metódus helyes működését ellenőrzi.
        /// </summary>
        [TestMethod]
        public void TestAddTodoWithNullStatus()
        {
            var options = new DbContextOptionsBuilder<TodoDbContext>().UseInMemoryDatabase(databaseName: "MockTaskList").Options;
            using (var context = new TodoDbContext(options))
            {
                var todosMock = new Mock<ITodos>();
                var tm = new TodoManager(context);
                var todo = new Todo();
                todo.Title = "Task1";
                todo.Priority = 1;

               // todo.Status = "done";
                todo.Deadline = new DateTime(2000, 10, 10);
                Assert.IsFalse(tm.AddTodo(todo));
            }
        }
    }
}
