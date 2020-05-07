namespace DatingApp.Models.PaginationHelper
{
    public class MessagePrams
    {
        public const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 6;
        public int PageSize
        {
            get { return pageSize = 6; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public long UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}