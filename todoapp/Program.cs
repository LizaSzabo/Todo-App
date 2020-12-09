// <copyright file="Program.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace Todoapp
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;

    /// <summary>
    /// Az alkalmaz�s kiindul� pontja.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Az alkalmaz�st elind�t� met�dus.
        /// </summary>
        /// <param name="args">be�ll�t�sok stringje.</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        /// <summary>
        /// Hostot l�trehoz� f�ggv�ny.
        /// </summary>
        /// <param name="args">be�ll�t�sok stringje.</param>
        /// <returns>IHostBuilder object.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
