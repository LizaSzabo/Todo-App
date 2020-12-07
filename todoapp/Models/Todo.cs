﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace todoapp.Models
{
    [Table("Todo")]
    public class Todo
    {
        public int ID { get; set; }
        public string Title { get; set; }

    
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public string Status { get; set; }
        public int Priority { get; set; }

        public static implicit operator Todo(ActionResult<IEnumerable<Todo>> v)
        {
            throw new NotImplementedException();
        }

        public static explicit operator Todo(ActionResult<Todo> v)
        {
            throw new NotImplementedException();
        }
    }
}
