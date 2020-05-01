namespace DatingApp.Models.PaginationHelper
{
    public class UserPrams
    {
        public const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize = 5; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public long UserId { get; set; }
        public string Gender { get; set; }
    }
}