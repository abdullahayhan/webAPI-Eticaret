﻿namespace API.Core.DbModels.Identity
{
    public class Adress : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string AppUserID { get; set; }
        public AppUser AppUser { get; set; }
    }
}