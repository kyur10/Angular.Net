﻿namespace DotNet2Try.BL.Model.Entities
{
    public class Product
    {
        public int BrandId { get; set; }
        public Brand Brand { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string ProductName { get; set; }
    }
}
