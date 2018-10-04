
using System.Collections.Generic;

namespace SimpleShoppingList.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Item> Items { get; set; }

        public ShoppingList()
        {
            Id = 0;
            Name = string.Empty;
            Items=new List<Item>();
        }
    }
}