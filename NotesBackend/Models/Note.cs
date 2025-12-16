using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NotesBackend.Models;

public partial class Note
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Column("description")]
    public string? Description { get; set; }

    [Column("createdAt")]
    public DateOnly CreatedAt { get; set; }

    [Column("expiryDate")]
    public DateOnly? ExpiryDate { get; set; }

    [Column("deleted")]
    public bool Deleted { get; set; }

    [Column("tag")]
    [StringLength(10)]
    public string? Tag { get; set; }

    [Column("userId")]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Notes")]
    public virtual User User { get; set; } = null!;
}
