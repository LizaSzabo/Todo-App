using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
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
        public async Task TestAddTodoWithNullStatus()
        {
            var options = new DbContextOptionsBuilder<TodoDbContext>().UseInMemoryDatabase(databaseName: "MockTaskList").Options;
            using (var context = new TodoDbContext(options))
            {
                var TodosMock = new Mock<ITodos>();
                var tm = new TodoManager(context);
                var todo = new Todo();
                todo.Title = "Task1";
                todo.Priority = 1;
                //todo.Status = "done";
                todo.Deadline = new DateTime(2000, 10, 10);
                Assert.IsFalse(await tm.AddTodo(todo));
            }
        
        }


    }
}
