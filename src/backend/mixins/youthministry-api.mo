import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import YouthLib "../lib/youthministry";
import Types "../types/youthministry";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  youthState : YouthLib.State,
) {
  public shared ({ caller }) func addYouthItem(input : Types.YouthItemInput) : async Types.YouthItem {
    Debug.todo();
  };

  public shared ({ caller }) func updateYouthItem(id : CommonTypes.Id, input : Types.YouthItemInput) : async ?Types.YouthItem {
    Debug.todo();
  };

  public shared ({ caller }) func deleteYouthItem(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getYouthItem(id : CommonTypes.Id) : async ?Types.YouthItem {
    Debug.todo();
  };

  public query func listYouthItems() : async [Types.YouthItem] {
    Debug.todo();
  };
};
