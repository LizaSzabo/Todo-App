// <copyright file="Todo.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// Az adatbázis egy rekordjának leírása.
    /// </summary>
    [Table("Todo")]
    public class Todo
    {
        /// <summary>
        /// Gets or sets the ID property of the Todo object.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Gets or sets the Title property of the Todo object.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the Description property of the Todo object.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the Deadline property of the Todo object.
        /// </summary>
        public DateTime Deadline { get; set; }

        /// <summary>
        /// Gets or sets the Status property of the Todo object.
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Gets or sets the Priority property of the Todo object.
        /// </summary>
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
