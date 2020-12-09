// <copyright file="Program.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;

    /// <summary>
    /// Az alkalmazás kiinduló pontja.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Az alkalmazást elindító metódus.
        /// </summary>
        /// <param name="args">beállítások stringje.</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        /// <summary>
        /// Hostot létrehozó függvény.
        /// </summary>
        /// <param name="args">beállítások stringje.</param>
        /// <returns>IHostBuilder object.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
