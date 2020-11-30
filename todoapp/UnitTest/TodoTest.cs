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
        private readonly TodoDbContext _context;
        [TestMethod]
        public async Task TestAddTodo()
        {
            var TodosMock = new Mock<ITodos>();
            var tm = new TodoManager(_context);
            var todo = new Todo();
            Assert.IsTrue(await tm.AddTodo(todo));
        }
    }
}
