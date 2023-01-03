using System.Runtime.Serialization;

namespace API.Core.DbModels.Order
{
    public enum OrderStatus
    {
        [EnumMember(Value="Pending")]
        Pending,

        [EnumMember(Value = "Payment Recevied")]
        PaymentRecevied,

        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
}
