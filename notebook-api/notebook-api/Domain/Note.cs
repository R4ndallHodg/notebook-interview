using System.ComponentModel.DataAnnotations;

namespace notebook_api.Domain
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        [MinLength(10)]
        public string Body { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
