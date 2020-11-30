using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp.DAL;
using todoapp.Models;
using todoapp.Todos_Bl;

namespace todoapp.UnitTest
{
    [TestClass]
    public class TodoTest
    {
        
        [TestMethod]
        public async Task TestAddTodo()
        {
            using (var context = new TodoDbContext())
            {
                var TodosMock = new Mock<ITodos>();
                var tm = new TodoManager(TodosMock.Object);
                var todo = new Todo();
                todo.Title = "Task1";
                todo.Priority = 1;
                todo.Status = "done";
                todo.Deadline = new DateTime(2000, 10, 10);
                Assert.IsTrue(await tm.AddTodo(todo));
            }
        }
    }
}
