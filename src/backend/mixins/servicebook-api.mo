import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import ServiceBookLib "../lib/servicebook";
import Types "../types/servicebook";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  serviceBookState : ServiceBookLib.State,
) {
  public shared ({ caller }) func addServiceBookItem(input : Types.ServiceBookItemInput) : async Types.ServiceBookItem {
    Debug.todo();
  };

  public shared ({ caller }) func updateServiceBookItem(id : CommonTypes.Id, input : Types.ServiceBookItemInput) : async ?Types.ServiceBookItem {
    Debug.todo();
  };

  public shared ({ caller }) func deleteServiceBookItem(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func listServiceBookItems() : async [Types.ServiceBookItem] {
    Debug.todo();
  };
};
