// CartItem.cs
public class CartItem
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}


// Order.cs
public class Order
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public List<CartItem> CartItems { get; set; }
    public decimal TotalPrice { get; set; }
}
