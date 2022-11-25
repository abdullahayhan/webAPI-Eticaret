using API.Core.DbModels;
using API.Core.Interfaces;
using API.Core.Specifications;
using API.Infrastructure.Data;
using API.Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Infrastructure.Implements
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext context;
        public GenericRepository(StoreContext context)
        {
            this.context = context;
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await context.Set<T>().ToListAsync();
        }
        public async Task<T> GetEntityWithSpec(ISpeficitaion<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpeficitaion<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }
       
        private IQueryable<T> ApplySpecification(ISpeficitaion<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(context.Set<T>().AsQueryable(),spec);
        }
    }
}
