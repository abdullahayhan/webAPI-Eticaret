﻿using API.Core.DbModels;
using API.Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Interfaces
{
    public interface IGenericRepository<T> where T: BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetEntityWithSpec(ISpeficitaion<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpeficitaion<T> spec);

        Task<int> CountAsync(ISpeficitaion<T> spec);

    }
}
