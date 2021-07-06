using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        //Method | Interface to enable us to configure the Product Entity
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(255); 
            builder.Property(p => p.Specifications).IsRequired().HasMaxLength(255); 
            builder.Property(p => p.Price).HasColumnType("decimal(18, 2)");
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.HasOne(b => b.ProductBrand).WithMany()
                .HasForeignKey(p => p.ProductBrandId);
            builder.HasOne(b => b.ProductColor).WithMany()
                .HasForeignKey(p => p.ProductColorId);
            builder.HasOne(b => b.ProductCategory).WithMany()
                .HasForeignKey(p => p.ProductCategoryId);
            builder.HasOne(t => t.ProductType).WithMany()
                .HasForeignKey(p => p.ProductTypeId);   
        }
    }
}