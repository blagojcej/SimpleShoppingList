using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SimpleShoppingList.Models;

namespace SimpleShoppingList.Controllers
{
    public class ShoppingListController : ApiController
    {
        public static List<ShoppingList> shoppingLists = new List<ShoppingList>()
        {
            new ShoppingList()
            {
                Id = 0, Name = "Grocceries", Items =
                {
                    new Item() {Id = 0, Name = "Milk", ShoppingListId = 0},
                    new Item() {Id = 1, Name = "Cornflakes", ShoppingListId = 0},
                    new Item() {Id = 2, Name = "Strawberries", ShoppingListId = 0},
                }
            },
            new ShoppingList() {Id = 1, Name = "Hardware Store"},
        };

        // GET api/<controller>
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            ShoppingList result = shoppingLists.FirstOrDefault(s => s.Id == id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST api/<controller>
        public IEnumerable Post([FromBody]ShoppingList newList)
        {
            newList.Id = shoppingLists.Count;
            shoppingLists.Add(newList);

            return shoppingLists;
        }

        // PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}