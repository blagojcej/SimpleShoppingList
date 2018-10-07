using SimpleShoppingList.Models;

namespace SimpleShoppingList.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SimpleShoppingList.Models.SimpleShoppingListContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SimpleShoppingList.Models.SimpleShoppingListContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.ShoppingLists.AddOrUpdate(
                new ShoppingList()
                {
                    Name = "Groceries",
                    Items =
                    {
                        new Item()
                        {
                            Name = "Milk"
                        },
                        new Item()
                        {
                            Name = "Cornflakes"
                        },
                        new Item()
                        {
                            Name = "Strawberries"
                        }
                    }
                },
                new ShoppingList()
                {
                    Name = "Hardware"
                }
            );
        }
    }
}
