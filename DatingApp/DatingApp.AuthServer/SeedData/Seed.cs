using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using DatingApp.DbServer;
using DatingApp.Models;
using Newtonsoft.Json;

namespace DatingApp.AuthServer.SeedData
{
    public class Seed
    {
        public static void SeedUsers(DatingAppData context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("SeedData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] PasswordHash, PasswordSalt;
                    CreatePasswordHash("password", out PasswordHash, out PasswordSalt);
                    user.PasswordHash = PasswordHash;
                    user.PasswordSalt = PasswordSalt;
                    user.UserName = user.UserName.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmc = new HMACSHA512())
            {
                passwordSalt = hmc.Key;
                passwordHash = hmc.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}